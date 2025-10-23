'use client'

import { ScrollTrigger, SplitText, gsap, useGSAP } from '@/components/gsap'
import { useFontsLoaded } from '@/hooks/useFontsLoaded'
import { useRef } from 'react'

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
  const animationRef = useRef<GSAPTween>()
  const ref = useRef<HTMLDivElement>(null)
  const fontsLoaded = useFontsLoaded()

  useGSAP(() => {
    if (!ref.current || !fontsLoaded) return

    const splitType = type === 'words,lines' ? 'lines' : type

    const split = new SplitText(ref.current, {
      type,
      linesClass: 'line',
      ...rest,
    })

    const elements = {
      lines: split.lines,
      words: split.words,
      chars: split.chars,
    }

    const targetElements = elements[splitType as keyof typeof elements]

    if (!targetElements || targetElements.length === 0) return

    const anim = gsap.from(targetElements, {
      duration,
      yPercent: 105,
      opacity: 0,
      stagger,
      ease,
      paused: true,
    })

    animationRef.current = anim

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'center bottom-=20%',
      onEnter: () => {
        anim.play()
      },
    })

    return () => {
      trigger.kill()
      anim.kill()
      split.revert()
    }
  }, [type, stagger, duration, ease, html, children, rest, fontsLoaded])

  if (html) {
    return (
      <span
        className='split'
        ref={ref}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <span className='split' ref={ref}>
      {children}
    </span>
  )
}
