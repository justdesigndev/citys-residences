'use client'

import { Link } from '@/components/utility/link'
import { type Pathnames } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export function LegalTableOfContents() {
  const pathname = usePathname()

  const legalRoutes: { title: string; href: Pathnames }[] = [
    {
      title: 'KVKK İlişkin Aydınlatma Metni',
      href: '/pdpl/pdpl-related-information' as Pathnames,
    },
    {
      title: 'Ticari Elektronik İleti Aydınlatma Metni',
      href: '/pdpl/commercial-electronic-message' as Pathnames,
    },
    {
      title: 'Açık Rıza Metni',
      href: '/pdpl/explicit-consent' as Pathnames,
    },
    {
      title: 'Çerez Politikası',
      href: '/pdpl/cookie-policy' as Pathnames,
    },
  ]

  return (
    <div className='sticky top-20 flex flex-col space-y-2'>
      {legalRoutes.map(route => {
        const isActive = pathname.includes(route.href)
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'cursor-pointer px-2 py-1 font-primary text-lg transition-colors duration-200',
              isActive && 'font-medium text-primary'
            )}
          >
            {route.title}
          </Link>
        )
      })}
    </div>
  )
}
