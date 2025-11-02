'use client'

import { useUiStore } from '@/lib/store/ui'
import { useSectionStore } from '@/lib/store/sections'
import { useLenis } from 'lenis/react'

export function useNavigation() {
  const { setIsMenuOpen } = useUiStore()
  const { setCurrentSection } = useSectionStore()
  const lenis = useLenis()

  const handleNavClick = (itemId: string) => {
    // Close menu if it's open
    setIsMenuOpen(false)

    // Update the active section in store
    setCurrentSection(itemId)

    // Scroll to the target section with Lenis smooth scroll
    const targetElement = document.getElementById(itemId)
    if (targetElement && lenis) {
      lenis.scrollTo(targetElement, {
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }
  }

  return { handleNavClick }
}
