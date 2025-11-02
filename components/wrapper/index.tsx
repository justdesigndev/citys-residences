'use client'

import { cn } from '@/lib/utils'
import type { themeNames } from '@/styles/config.mjs'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { SmoothScroll } from '@/components/smooth-scroll'
import { Header } from '../header'
import { Footer } from '../footer'

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: (typeof themeNames)[number]
  lenis?: boolean
  webgl?: boolean | object
}

export function Wrapper({
  children,
  theme = 'light',
  lenis = true,
  className,
  ...props
}: WrapperProps) {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [pathname, theme])

  return (
    <>
      <Header />
      <div className='transition-wrapper'>
        <main
          className={cn(className, 'main', 'z-[var(--z-content)]')}
          {...props}
        >
          {children}
          {/* <Script id="theme-script">{`document.documentElement.setAttribute('data-theme', '${theme}');`}</Script> */}
        </main>
        <Footer />
      </div>

      {lenis && <SmoothScroll root />}
    </>
  )
}
