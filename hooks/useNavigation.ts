'use client'

import { useUiStore } from '@/lib/store/ui'
import { useSectionStore } from '@/lib/store/sections'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { scrollDelay } from '@/lib/constants'

export function useNavigation() {
  const { setIsMenuOpen } = useUiStore()
  const { setCurrentSection } = useSectionStore()
  const lenis = useLenis()

  const handleNavClick = (itemId: string) => {
    const element = document.querySelector('.transition-wrapper')

    if (!element) {
      console.error('Transition wrapper element not found')
      return
    }

    gsap.to(element, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        // Close menu if it's open
        setIsMenuOpen(false)

        // Update the active section in store
        setCurrentSection(itemId)

        // Scroll to the target section with Lenis smooth scroll
        const targetElement = document.getElementById(itemId)
        if (targetElement && lenis) {
          lenis.scrollTo(targetElement, { immediate: true })
          gsap.to(element, {
            opacity: 1,
            duration: 0.4,
            delay: scrollDelay,
          })
        }
      },
    })
  }

  return { handleNavClick }
}
