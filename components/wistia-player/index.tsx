'use client'

import { cn } from '@/lib/utils'
import { WistiaPlayer, WistiaPlayerProps } from '@wistia/wistia-player-react'
import { useEffect, useRef, useState, useMemo } from 'react'

import { Image } from '@/components/image'

// Constants for timing
const POSTER_FADE_DURATION = 500

interface WistiaPlayerWrapperProps extends WistiaPlayerProps {
  className?: string
  placeholderImage?: string
  placeholderClassName?: string
  rootMargin?: string
  threshold?: number
  aspectRatio?: string | number
  containerHeight?: string | number
  lazy?: boolean
  customPoster?: string
}

export function WistiaPlayerWrapper(props: WistiaPlayerWrapperProps) {
  const {
    className,
    placeholderImage,
    placeholderClassName,
    rootMargin = '500px',
    threshold = 0.1,
    aspectRatio,
    containerHeight,
    lazy = true,
    customPoster,
    ...wistiaProps
  } = props

  const [isInView, setIsInView] = useState(!lazy)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPoster, setShowPoster] = useState(!!customPoster)
  const containerRef = useRef<HTMLDivElement>(null)
  // WistiaPlayer uses its own internal ref type
  const playerRef = useRef<React.ComponentRef<typeof WistiaPlayer>>(null)
  const posterTimeoutRef = useRef<NodeJS.Timeout>()

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    const currentContainer = containerRef.current
    if (currentContainer) {
      observer.observe(currentContainer)
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer)
      }
      observer.disconnect()
    }
  }, [rootMargin, threshold, lazy])

  // Handle video play event
  const handlePlay = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Wistia video started playing')
    }
    setIsPlaying(true)

    // Hide poster after fade animation completes
    posterTimeoutRef.current = setTimeout(() => {
      setShowPoster(false)
    }, POSTER_FADE_DURATION)
  }

  // Cleanup poster timeout on unmount
  useEffect(() => {
    return () => {
      if (posterTimeoutRef.current) {
        clearTimeout(posterTimeoutRef.current)
      }
    }
  }, [])

  // Calculate container styles to prevent layout shift
  const containerStyles = useMemo<React.CSSProperties>(() => {
    if (aspectRatio) {
      return {
        aspectRatio:
          typeof aspectRatio === 'number'
            ? aspectRatio.toString()
            : aspectRatio,
      }
    }

    if (containerHeight) {
      return {
        height:
          typeof containerHeight === 'number'
            ? `${containerHeight}px`
            : containerHeight,
      }
    }

    // Default to 16:9 aspect ratio if no dimensions specified
    return { aspectRatio: '16/9' }
  }, [aspectRatio, containerHeight])

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden', className)}
      style={containerStyles}
      role='region'
      aria-label='Video player'
    >
      {/* Lazy loading placeholder */}
      {lazy && !isInView && (
        <div
          className={cn(
            'absolute inset-0 flex h-full w-full items-center justify-center bg-gray-200',
            placeholderClassName
          )}
          aria-hidden='true'
        >
          {placeholderImage ? (
            <Image
              src={placeholderImage}
              alt='Video placeholder'
              fill
              className='object-cover'
              sizes='100vw'
              loading='lazy'
            />
          ) : (
            <div className='flex flex-col items-center justify-center text-gray-500'>
              <svg
                className='mb-4 h-16 w-16'
                fill='currentColor'
                viewBox='0 0 20 20'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
                  clipRule='evenodd'
                />
              </svg>
              <p className='text-sm'>Video will load when in view</p>
            </div>
          )}
        </div>
      )}

      {/* Wistia Player */}
      {isInView && (
        <div className='absolute left-1/2 top-1/2 h-auto w-full -translate-x-1/2 -translate-y-1/2'>
          <WistiaPlayer ref={playerRef} onPlay={handlePlay} {...wistiaProps} />
        </div>
      )}

      {/* Poster image that fades out when video starts playing */}
      {customPoster && isInView && showPoster && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-500 ease-out',
            isPlaying && 'opacity-0'
          )}
          aria-hidden='true'
        >
          <Image
            src={customPoster}
            alt='Video poster'
            fill
            className='object-cover'
            sizes='100vw'
            priority={!lazy}
          />
        </div>
      )}
    </div>
  )
}
