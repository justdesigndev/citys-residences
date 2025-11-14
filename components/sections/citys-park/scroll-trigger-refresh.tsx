'use client'

import { useEffect } from 'react'
import { ScrollTrigger } from '@/components/gsap'

interface ScrollTriggerRefreshProps {
  itemsCount: number
}

export function ScrollTriggerRefresh({
  itemsCount,
}: ScrollTriggerRefreshProps) {
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => cancelAnimationFrame(frame)
  }, [itemsCount])

  return null
}
