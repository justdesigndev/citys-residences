'use client'

import { ScrollTrigger, SplitText, gsap, useGSAP } from '@/components/gsap'
import { breakpoints } from '@/styles/config.mjs'
import { useWindowSize } from 'hamo'
import { useEffect, useRef, useState } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrollTrigger)
}

export interface GsapSplitTextProps extends SplitText.Vars {
  children?: React.ReactNode
  html?: string
}

export function GsapSplitText(props: GsapSplitTextProps) {
  const {
    children,
    html,
    stagger = 0.1,
    duration = 0.6,
    ease = 'expo.out',
    type = 'lines',
    ...rest
  } = props
  const { width } = useWindowSize()
  const isMobile = !width || width < breakpoints.breakpointMobile
  const baseStyle = { opacity: isMobile ? 1 : 0 }
  const animationRef = useRef<GSAPTween>()
  const ref = useRef<HTMLDivElement>(null)

  // Splitting is deferred until the element approaches the viewport. Splitting
  // every instance at mount (dozens across the CMS card sections) runs as one
  // giant synchronous layout-thrashing task at fonts-ready, which stalls
  // Safari's main thread for tens of seconds — freezing Lenis/GSAP/
  // ScrollTrigger and starving the hero video.
  const [nearViewport, setNearViewport] = useState(false)

  useEffect(() => {
    if (isMobile || nearViewport) return
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setNearViewport(true)
          io.disconnect()
        }
      },
      // A full viewport of lookahead: the split is always done before the
      // element can scroll into view, so the reveal animation triggers at
      // exactly the same scroll position as it did with eager splitting.
      { rootMargin: '100% 0px 100% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [isMobile, nearViewport])

  // Object/node props get a fresh identity every render; using them directly
  // as effect dependencies with revertOnUpdate would revert + re-split all
  // instances on every parent re-render.
  const restKey = JSON.stringify(rest)

  useGSAP(
    () => {
      if (isMobile) return
      if (!nearViewport) return
      if (!ref.current) return

      // Set initial opacity
      gsap.set(ref.current, { opacity: 1 })

      const splitType = type === 'words,lines' ? 'lines' : type
      let splitInstance: SplitText | null = null

      SplitText.create(ref.current, {
        type,
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        autoSplit: true,
        mask: splitType as 'lines' | 'words' | 'chars',
        ...rest,
        onSplit: self => {
          splitInstance = self

          const elements = {
            lines: self.lines,
            words: self.words,
            chars: self.chars,
          }

          const targetElements = elements[splitType as keyof typeof elements]

          if (!targetElements || targetElements.length === 0) return

          const anim = gsap.from(targetElements, {
            duration,
            yPercent: 100,
            opacity: 0,
            stagger,
            ease,
            paused: true,
          })

          animationRef.current = anim

          const trigger = ScrollTrigger.create({
            trigger: ref.current,
            onEnter: () => {
              anim.play()
            },
          })

          // If the trigger position was already scrolled past when the split
          // happens (lazy split), reveal immediately.
          if (trigger.progress > 0 || trigger.isActive) {
            anim.play()
          }

          return () => {
            trigger.kill()
          }
        },
      })

      return () => {
        if (animationRef.current) {
          animationRef.current.kill()
        }
        if (splitInstance) {
          splitInstance.revert()
        }
      }
    },
    {
      dependencies: [
        type,
        stagger,
        duration,
        ease,
        html,
        restKey,
        isMobile,
        nearViewport,
      ],
      revertOnUpdate: true,
    }
  )

  if (html) {
    return (
      <span
        className='split'
        ref={ref}
        style={baseStyle}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <span className='split' ref={ref} style={baseStyle}>
      {children}
    </span>
  )
}
