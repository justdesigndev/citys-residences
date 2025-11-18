import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

const SUPPORTED_LOCALES = ['tr', 'en'] as const
const LOCALE_COOKIE = 'LOCALE'

export default function middleware(req: NextRequest) {
  const { nextUrl, geo } = req

  // Current requested path
  const path = nextUrl.pathname
  const localeInPath = path.split('/')[1]

  // 1) User preference from cookie (if exists)
  const userPref = req.cookies.get(LOCALE_COOKIE)?.value
  const userHasPreference = SUPPORTED_LOCALES.includes(
    userPref as (typeof SUPPORTED_LOCALES)[number]
  )

  // If URL already contains a locale
  const hasLocaleInPath = SUPPORTED_LOCALES.includes(
    localeInPath as (typeof SUPPORTED_LOCALES)[number]
  )

  // 2) When user visits `/tr/...` or `/en/...`,
  //    store that locale in a cookie for future visits.
  if (hasLocaleInPath) {
    const res = intlMiddleware(req)

    // Save locale in cookie if changed
    if (!userHasPreference || userPref !== localeInPath) {
      res.cookies.set(LOCALE_COOKIE, localeInPath, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      })
    }

    return res
  }

  // 3) No locale in URL → check stored user preference
  if (userHasPreference) {
    return NextResponse.redirect(
      new URL(`/${userPref}${path}${nextUrl.search}`, req.url)
    )
  }

  // 4) No preference → detect via geo
  const country = geo?.country?.toUpperCase()
  const detectedLocale = country === 'TR' ? 'tr' : 'en'

  return NextResponse.redirect(
    new URL(`/${detectedLocale}${path}${nextUrl.search}`, req.url)
  )
}

export const config = {
  matcher: ['/', '/(tr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
}
