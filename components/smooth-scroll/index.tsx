'use client'

import 'lenis/dist/lenis.css'

import { useIsStand } from '@/components/variant-provider'
import { LenisRef, ReactLenis } from 'lenis/react'
import { useRef } from 'react'
import { useTempus } from 'tempus/react'

export function SmoothScroll({ root }: { root: boolean }) {
  const isStand = useIsStand()

  if (isStand) {
    return <StandSmoothScroll root={root} />
  }

  return <DefaultSmoothScroll root={root} />
}

function DefaultSmoothScroll({ root }: { root: boolean }) {
  const lenisRef = useRef<LenisRef>(null)

  // useFrame((time: number) => {
  //   if (!lenisRef.current) return
  //   lenisRef.current.lenis?.raf(time)
  // }, 0)

  // useEffect(() => {
  //   function update(time: number) {
  //     lenisRef.current?.lenis?.raf(time * 1000)
  //   }
  //   gsap.ticker.add(update)

  //   gsap.ticker.lagSmoothing(0)

  //   return () => gsap.ticker.remove(update)
  // }, [])

  useTempus((time: number) => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.raf(time)
    }
  })

  return (
    <ReactLenis
      ref={lenisRef}
      root={root}
      options={{
        // duration: 1.2,
        // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        autoRaf: false,
        anchors: true,
      }}
    />
  )
}

function StandSmoothScroll({ root }: { root: boolean }) {
  return (
    <ReactLenis
      root={root}
      options={{
        autoRaf: false,
        anchors: { immediate: true },
        duration: 0,
        lerp: 1,
        overscroll: false,
        smoothWheel: false,
        syncTouch: false,
      }}
    />
  )
}
