'use client'

import type { themeNames } from '@/styles/config.mjs'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ModalContactForm } from '@/components/modal-contact-form'
import { SmoothScroll } from '@/components/smooth-scroll'
import { StickySidebar } from '@/components/sticky-sidebar'
import { WebChat } from '@/components/web-chat'

interface CountryData {
  isoCode: string
  name: string
}

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: (typeof themeNames)[number]
  lenis?: boolean
  webgl?: boolean | object
  stickySidebar?: boolean
  headerWithNavigation?: boolean
  contactForm?: boolean
  footer?: boolean
  countries?: CountryData[]
}

export function Wrapper({
  children,
  theme = 'light',
  lenis = true,
  className,
  stickySidebar = true,
  headerWithNavigation = true,
  footer = true,
  contactForm = true,
  countries = [],
  ...props
}: WrapperProps) {
  const pathname = usePathname()
  const locale = useLocale()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [pathname, theme])

  return (
    <>
      <Header withNavigation={headerWithNavigation} />
      <div className='z-[var(--z-content)]'>
        <div className='transition-wrapper pointer-events-none fixed left-1/2 top-1/2 z-50 h-[300vh] w-screen -translate-x-1/2 -translate-y-1/2 bg-white opacity-0'></div>
        <main className={className} {...props}>
          {children}
          {/* <Script id="theme-script">{`document.documentElement.setAttribute('data-theme', '${theme}');`}</Script> */}
        </main>
        {footer && <Footer />}
      </div>
      {contactForm && <ModalContactForm countries={countries} />}
      {stickySidebar && <StickySidebar />}
      {lenis && <SmoothScroll root />}
      {/* Hidden element for webchat to detect language */}
      <span id='selectedLanguage' className='hidden'>
        {locale}
      </span>
      <WebChat key={locale} locale={locale} />
    </>
  )
}
