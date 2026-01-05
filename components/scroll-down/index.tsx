'use client'

import { cn } from '@/lib/utils'
import { Image } from '@/components/image'
import { useUiStore } from '@/lib/store/ui'

interface ScrollDownProps {
  className?: string
}

export const ScrollDown = ({ className }: ScrollDownProps) => {
  const { isStickySidebarVisible } = useUiStore()

  return (
    <div
      className={cn(
        'z-[var(--z-scroll-down)] mix-blend-difference',
        'fixed bottom-[8%] left-1/2 size-12 -translate-x-1/2 lg:bottom-[8%] xl:size-16 2xl:size-16',
        isStickySidebarVisible
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0',
        className
      )}
    >
      <div className='relative size-full animate-bounce-translate'>
        <Image
          src='/svg/scroll-down.svg'
          alt='Scroll Down'
          fill
          className='object-contain'
          priority
        />
      </div>
      <span className='sr-only'>Scroll Down</span>
    </div>
  )
}
