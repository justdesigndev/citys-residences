'use client'

import { cn } from '@/lib/utils'
import { useLenis } from 'lenis/react'
import { RotateCcw } from 'lucide-react'

import { gsap } from '@/components/gsap'

interface ScrollToTopProps {
  className?: string
}

export function ScrollToTop({ className }: ScrollToTopProps) {
  const lenis = useLenis()

  const handleScrollToTop = () => {
    gsap.to('body', {
      opacity: 0,
      onComplete: () => {
        lenis?.scrollTo(0, { immediate: true })
        gsap.to('body', {
          opacity: 1,
          delay: 0.2,
        })
      },
    })
  }

  return (
    <button
      onClick={handleScrollToTop}
      className={cn(
        'flex items-center gap-2',
        'cursor-pointer font-primary font-light text-white opacity-100 transition-opacity hover:opacity-80',
        className
      )}
      type='button'
    >
      <RotateCcw className='h-20 w-20' strokeWidth={1} />
      <span className='text-3xl'>Yeniden Keşfet</span>
    </button>
  )
}
