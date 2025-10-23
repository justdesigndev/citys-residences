'use client'

import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { WistiaPlayerProps } from '@wistia/wistia-player-react'
import { Image } from '@/components/image'

// Lazy load the WistiaPlayerWrapper component with timeout
const WistiaPlayerWrapper = lazy(() =>
  Promise.race([
    import('@/components/wistia-player/index').then(module => ({
      default: module.WistiaPlayerWrapper,
    })),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Wistia player load timeout')), 10000)
    ),
  ])
)

interface LazyWistiaPlayerProps extends WistiaPlayerProps {
  className?: string
  customPoster?: string
  posterPriority?: boolean
  loadingFallback?: React.ReactNode
  intersectionThreshold?: number
  intersectionRootMargin?: string
}

// Loading fallback component
function DefaultLoadingFallback({
  className,
  customPoster,
}: {
  className?: string
  customPoster?: string
}) {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden bg-black',
        className
      )}
      aria-label='Loading video player'
    >
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent'></div>
      </div>
      {customPoster && (
        <Image
          src={customPoster}
          alt='Video poster'
          fill
          className='absolute inset-0 h-full w-full overflow-hidden object-cover object-center'
          sizes='90vw'
          mobileSize='90vw'
          priority={false}
        />
      )}
    </div>
  )
}

export function LazyWistiaPlayer(props: LazyWistiaPlayerProps) {
  const {
    className,
    customPoster,
    posterPriority = false,
    loadingFallback,
    intersectionThreshold = 0,
    intersectionRootMargin = '400px',
    ...wistiaProps
  } = props

  const [isClient, setIsClient] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)
  const [shouldLoadPlayer, setShouldLoadPlayer] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Set up IntersectionObserver
  useEffect(() => {
    if (!isClient || !containerRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries
        const isIntersecting = entry.isIntersecting

        setIsInViewport(isIntersecting)

        // Load the player when it enters the viewport
        if (isIntersecting && !shouldLoadPlayer) {
          setShouldLoadPlayer(true)
        }
      },
      {
        threshold: intersectionThreshold,
        rootMargin: intersectionRootMargin,
      }
    )

    observer.observe(containerRef.current)
    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [
    isClient,
    intersectionThreshold,
    intersectionRootMargin,
    shouldLoadPlayer,
  ])

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [])

  const fallback = loadingFallback || (
    <DefaultLoadingFallback className={className} customPoster={customPoster} />
  )

  if (!isClient) {
    return (
      <div
        ref={containerRef}
        className={cn('relative h-full w-full', className)}
      >
        {fallback}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={cn('relative h-full w-full', className)}>
      {shouldLoadPlayer ? (
        <Suspense fallback={fallback}>
          <WistiaPlayerWrapper
            className='h-full w-full'
            customPoster={customPoster}
            posterPriority={posterPriority}
            autoplay={isInViewport && wistiaProps.autoplay}
            {...wistiaProps}
          />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}
