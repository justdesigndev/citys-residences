'use client'

import { gsap } from '@/components/gsap'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import { CaretRightIcon } from '@phosphor-icons/react'
import { useRef } from 'react'

import { useEsc } from '@/hooks/useEsc'
import { useUiStore } from '@/lib/store/ui'
import { MenuNavList } from './menu-nav-list'

export function Menu() {
  const { isMenuOpen, setIsMenuOpen } = useUiStore()
  const overlayRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const animationTL = useRef<gsap.core.Timeline>()

  // useClickAway(menuRef, e => {
  //   if (!open) return
  //   if ((e.target as HTMLElement).closest('[data-ignore-click-away]')) {
  //     return
  //   }
  //   onClose()
  // })

  useEsc(() => setIsMenuOpen(!isMenuOpen), isMenuOpen)

  useGSAP(
    () => {
      animationTL.current = gsap.timeline({
        paused: true,
      })

      animationTL.current
        ?.fromTo(
          overlayRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          's'
        )
        .fromTo(
          menuRef.current,
          { x: '100%' },
          {
            x: 0,
            duration: 0.6,
            ease: 'expo.inOut',
          },
          's'
        )
    },
    {
      revertOnUpdate: true,
    }
  )

  useGSAP(
    () => {
      if (isMenuOpen) {
        animationTL.current?.play()
      } else {
        animationTL.current?.reverse()
      }
    },
    {
      dependencies: [isMenuOpen],
    }
  )

  return (
    <>
      {/* Overlay */}
      <button
        className={cn(
          'fixed left-0 top-0 z-[var(--z-modal-overlay)] block h-full w-full opacity-0',
          {
            'pointer-events-none': !isMenuOpen,
            'pointer-events-auto': isMenuOpen,
          }
        )}
        ref={overlayRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        type='button'
      ></button>
      {/* Menu */}
      <div
        className={cn(
          'fixed bottom-0 right-0 top-0',
          'h-full w-full translate-x-[100%] lg:w-[80vw] xl:w-[60vw]',
          'blur-bg-white-2',
          'p-8 sm:px-12 sm:py-16 lg:py-20 lg:pl-16 lg:pr-16 xl:py-16 xl:pl-24 xl:pr-20 2xl:py-16',
          'flex flex-col',
          'z-[var(--z-modal)]'
        )}
        onClick={e => e.stopPropagation()}
        ref={menuRef}
      >
        {/* close button */}
        <button
          className={cn(
            'absolute right-0 top-28 lg:left-0 lg:right-auto lg:top-20 lg:-translate-x-full',
            'size-12 p-4 lg:size-20 xl:size-16 2xl:size-20',
            'z-[var(--z-modal-close-button)] bg-bricky-brick text-white',
            'opacity-0 transition-opacity duration-700 ease-in-out',
            'flex items-center justify-center',
            {
              'pointer-events-auto opacity-100': isMenuOpen,
              'pointer-events-none opacity-0': !isMenuOpen,
            }
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type='button'
          disabled={!isMenuOpen}
        >
          <CaretRightIcon className='size-full' weight='regular' />
          <span className='sr-only'>Close</span>
        </button>
        <MenuNavList />
      </div>
    </>
  )
}
