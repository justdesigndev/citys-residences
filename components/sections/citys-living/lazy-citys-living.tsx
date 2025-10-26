'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import { CitysLivingData } from '@/lib/api/queries'
import { useLenis } from 'lenis/react'

const LazyCitysLivingContent = lazy(() =>
  import('./lazy-citys-living-content').then(module => ({
    default: module.LazyCitysLivingContent,
  }))
)

interface LazyCitysLivingProps {
  data: CitysLivingData[]
}

export function LazyCitysLiving({ data }: LazyCitysLivingProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const lenis = useLenis()

  const ref = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '500px',
  })

  if (ref.isIntersecting && !hasLoaded) {
    setIsVisible(true)
    setHasLoaded(true)
  }

  useEffect(() => {
    if (isVisible && !hasLoaded) {
      lenis?.stop()
    }

    if (hasLoaded) {
      lenis?.start()
    }
  }, [isVisible, hasLoaded, lenis])

  return (
    <div ref={ref.ref}>
      {isVisible ? (
        <Suspense
          fallback={
            <div className='flex h-screen items-center justify-center'>
              <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900'></div>
            </div>
          }
        >
          <LazyCitysLivingContent data={data} />
        </Suspense>
      ) : (
        <div className='animate-pulse bg-gray-50 py-20'>
          <div className='container mx-auto px-4'>
            <div className='space-y-8'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className='h-64 rounded-lg bg-gray-200'></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
