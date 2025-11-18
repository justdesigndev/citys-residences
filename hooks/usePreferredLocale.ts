'use client'

import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import { routing } from '@/i18n/routing'

const SUPPORTED_LOCALES = ['tr', 'en'] as const
const LOCALE_COOKIE = 'LOCALE'

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

/**
 * Client hook to get the preferred locale from cookies
 * Falls back to the current locale if no cookie is found
 *
 * @returns The preferred locale from cookie, or current locale as fallback
 */
export function usePreferredLocale(): SupportedLocale {
  const currentLocale = useLocale()
  const [preferredLocale, setPreferredLocale] = useState<SupportedLocale>(
    currentLocale as SupportedLocale
  )

  useEffect(() => {
    // Get cookie value
    const getCookie = (name: string): string | null => {
      if (typeof document === 'undefined') return null

      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)

      if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null
      }

      return null
    }

    const cookieLocale = getCookie(LOCALE_COOKIE)

    if (
      cookieLocale &&
      SUPPORTED_LOCALES.includes(cookieLocale as SupportedLocale)
    ) {
      setPreferredLocale(cookieLocale as SupportedLocale)
    } else {
      // Fallback to current locale or default
      setPreferredLocale(
        (currentLocale as SupportedLocale) ||
          (routing.defaultLocale as SupportedLocale)
      )
    }
  }, [currentLocale])

  return preferredLocale
}

/**
 * Get the locale cookie name (for reference)
 */
export function getLocaleCookieName(): string {
  return LOCALE_COOKIE
}
