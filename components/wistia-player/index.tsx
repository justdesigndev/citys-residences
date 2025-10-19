'use client'

import { cn } from '@/lib/utils'
import { WistiaPlayer, WistiaPlayerProps } from '@wistia/wistia-player-react'
import { useRef, useState, useEffect } from 'react'

import { Image } from '@/components/image'

interface WistiaPlayerWrapperProps extends WistiaPlayerProps {
  className?: string
  aspectRatio?: string | number
  containerHeight?: string | number
  customPoster?: string
  posterPriority?: boolean
}

export function WistiaPlayerWrapper(props: WistiaPlayerWrapperProps) {
  const {
    className,
    aspectRatio,
    containerHeight,
    customPoster,
    posterPriority = false,
    ...wistiaProps
  } = props

  const [isPlaying, setIsPlaying] = useState(false)
  const [videoAspect, setVideoAspect] = useState<number | null>(null)
  const playerRef = useRef<React.ComponentRef<typeof WistiaPlayer>>(null)

  // Handle video play event
  const handlePlay = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Wistia video with id',
        wistiaProps.mediaId,
        'started playing',
        playerRef.current?.aspect
      )
    }
    setIsPlaying(true)

    // Get video aspect ratio
    if (playerRef.current?.aspect) {
      setVideoAspect(playerRef.current.aspect)
    }
  }

  // Try to get aspect ratio on mount
  useEffect(() => {
    const checkAspect = setInterval(() => {
      if (playerRef.current?.aspect) {
        setVideoAspect(playerRef.current.aspect)
        clearInterval(checkAspect)
      }
    }, 100)

    return () => clearInterval(checkAspect)
  }, [])

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden bg-black',
        className
      )}
      aria-label='Video player'
      style={{
        width: videoAspect ? '100%' : '100%',
        height: videoAspect ? '100%' : '100%',
        minWidth: videoAspect ? `${videoAspect * 100}vh` : '177.78vh',
        minHeight: videoAspect ? `${(1 / videoAspect) * 100}vw` : '56.25vw',
      }}
    >
      <WistiaPlayer ref={playerRef} onPlay={handlePlay} {...wistiaProps} />
      {customPoster && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 h-full w-full overflow-hidden transition-opacity duration-300 ease-out',
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
            priority={posterPriority}
          />
        </div>
      )}
    </div>
  )
}
