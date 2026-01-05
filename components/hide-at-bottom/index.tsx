'use client'

import { useUiStore } from '@/lib/store/ui'
import { useIntersectionObserver } from 'hamo'
import { useEffect } from 'react'

export function HideAtBottom() {
  const { setIsStickySidebarVisible } = useUiStore()
  const [elementRef, entry] = useIntersectionObserver()

  useEffect(() => {
    if (!entry) return

    if (entry.isIntersecting) {
      setIsStickySidebarVisible(false)
    } else {
      setIsStickySidebarVisible(true)
    }
  }, [entry, setIsStickySidebarVisible])

  return (
    <div
      className='pointer-events-none absolute bottom-0 left-0 z-50 h-screen w-screen bg-transparent opacity-0'
      ref={elementRef}
    ></div>
  )
}
