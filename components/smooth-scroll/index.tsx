'use client'

import 'lenis/dist/lenis.css'

import { useIsStand } from '@/components/variant-provider'
import { ReactLenis } from 'lenis/react'

export function SmoothScroll({ root }: { root: boolean }) {
  const isStand = useIsStand()

  if (isStand) {
    return <StandSmoothScroll root={root} />
  }

  return <DefaultSmoothScroll root={root} />
}

function DefaultSmoothScroll({ root }: { root: boolean }) {
  return (
    <ReactLenis
      root={root}
      options={{
        autoRaf: true,
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
