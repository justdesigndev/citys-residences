'use client'

import { useState } from 'react'
import { Link } from '@/components/utility/link'
import { useNavigation } from '@/hooks/useNavigation'
import { Locale } from '@/i18n/routing'
import { getNavigationItems, navigationConfig } from '@/lib/constants'
import { useUiStore } from '@/lib/store/ui'
import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'

export function MenuNavList() {
  const { setIsMenuOpen } = useUiStore()
  const { handleNavClick } = useNavigation()
  const t = useTranslations('common')
  const locale = useLocale()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleClick = (e: React.MouseEvent, itemId: string) => {
    handleNavClick(e, itemId)
    setIsMenuOpen(false)
  }

  return (
    <nav className='flex h-full w-full items-end justify-center lg:justify-start'>
      <div
        className={cn(
          'flex w-full flex-col items-stretch gap-2 lg:gap-12 xl:gap-6 2xl:gap-8 3xl:gap-10'
        )}
      >
        <ul className='flex flex-col gap-2 lg:gap-6 xl:gap-3 2xl:gap-4'>
          {getNavigationItems(t, locale as Locale)
            .filter(item => item.mainRoute)
            .map(item => {
              const isHovered = hoveredItem === item.id
              const opacityClass =
                hoveredItem && !isHovered ? 'opacity-50' : 'opacity-100'

              return (
                <li
                  className='text-3xl sm:text-2xl lg:text-5xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl'
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.id === navigationConfig['/']?.id ? (
                    <Link
                      href='/'
                      className={cn(
                        'block font-primary font-[300] text-white transition-all duration-300',
                        opacityClass
                      )}
                      onClick={e => handleClick(e, item.id)}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <Link
                      href={`#${item.id}`}
                      className={cn(
                        'block font-primary font-[300] text-white transition-all duration-300',
                        opacityClass
                      )}
                      onClick={e => handleClick(e, item.id)}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              )
            })}
        </ul>
        <ul className='flex flex-col gap-4 lg:gap-6 xl:gap-3 2xl:gap-4'>
          {getNavigationItems(t, locale as Locale)
            .filter(item => !item.mainRoute)
            .map(item => {
              const isHovered = hoveredItem === item.id
              const opacityClass =
                hoveredItem && !isHovered ? 'opacity-50' : 'opacity-100'

              return (
                <li
                  className='text-base sm:text-2xl lg:text-2xl xl:text-lg 2xl:text-xl 3xl:text-2xl'
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={`#${item.id}`}
                    className={cn(
                      'block font-primary font-[300] text-white transition-all duration-300',
                      opacityClass
                    )}
                    onClick={e => handleClick(e, item.id)}
                  >
                    {item.title}
                  </Link>
                </li>
              )
            })}
        </ul>
      </div>
    </nav>
  )
}
