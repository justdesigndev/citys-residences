import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    // App section routes used for navigation (same slug across locales)
    '/project': '/project',
    '/residences': '/residences',
    '/citys-park': '/citys-park',
    '/citys-members-club': '/citys-members-club',
    '/citys-living': '/citys-living',
    '/citys-istanbul-avm': '/citys-istanbul-avm',
    '/citys-times': '/citys-times',
    '/contact': {
      tr: '/iletisim',
      en: '/contact',
    },
    '/pdpl': {
      tr: '/kvkk',
      en: '/pdpl',
    },
    '/pdpl/explicit-consent': {
      tr: '/kvkk/acik-riza-metni',
      en: '/pdpl/explicit-consent',
    },
    '/pdpl/cookie-policy': {
      tr: '/kvkk/cerez-politikasi',
      en: '/pdpl/cookie-policy',
    },
    '/pdpl/commercial-electronic-message': {
      tr: '/kvkk/ticari-elektronik-ileti-aydinlatma-metni',
      en: '/pdpl/commercial-electronic-message',
    },
    '/pdpl/pdpl-related-information': {
      tr: '/kvkk/kvkk-iliskin-aydinlatma-metni',
      en: '/pdpl/pdpl-related-information',
    },
  },
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]
