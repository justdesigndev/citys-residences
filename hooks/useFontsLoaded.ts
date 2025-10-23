'use client'

import { useEffect, useState } from 'react'

export function useFontsLoaded() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if fonts are already loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true)
      })
    } else {
      // Fallback for browsers that don't support document.fonts
      setFontsLoaded(true)
    }
  }, [])

  return fontsLoaded
}
