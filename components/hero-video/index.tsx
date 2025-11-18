'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Image } from '@/components/image'
import { cn } from '@/lib/utils'

type HeroVideoProps = {
  desktopVideoId?: string
  mobileVideoId?: string
  desktopPoster: string
  mobilePoster: string
}

const HeroVideo: React.FC<HeroVideoProps> = ({
  desktopPoster,
  mobilePoster,
  desktopVideoId,
  mobileVideoId,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  // Check if video is already playing when component mounts
  useEffect(() => {
    const video = videoRef.current
    if (video && !video.paused) {
      setHasPlayed(true)
    }
  }, [])

  const handlePlay = () => {
    setHasPlayed(true)
  }

  const commonVideoProps = {
    preload: 'auto',
    autoPlay: true,
    playsInline: true,
    loop: true,
    muted: true,
    onPlay: handlePlay,
  }

  return (
    <div className='relative h-screen w-full'>
      <video
        ref={videoRef}
        {...commonVideoProps}
        className='relative h-screen w-full object-cover object-bottom'
      >
        {mobileVideoId && (
          <source
            src={`https://stream.mux.com/${mobileVideoId}/highest.mp4`}
            media='(max-width: 799px)'
            type='video/mp4'
          />
        )}
        {desktopVideoId && (
          <source
            src={`https://stream.mux.com/${desktopVideoId}/highest.mp4`}
            media='(min-width: 800px)'
            type='video/mp4'
          />
        )}
      </video>
      <Image
        className={cn(
          'absolute inset-0 z-20 h-full w-full object-cover object-bottom transition-opacity duration-300 ease-in-out xl:hidden',
          hasPlayed && 'pointer-events-none opacity-0'
        )}
        src={mobilePoster}
        alt='Hero Video Poster'
        fill
        desktopSize='100vw'
        mobileSize='100vw'
        priority
        quality={100}
      />
      <Image
        className={cn(
          'absolute inset-0 z-20 hidden h-full w-full object-cover object-bottom transition-opacity duration-300 ease-in-out xl:block',
          hasPlayed && 'pointer-events-none opacity-0'
        )}
        src={desktopPoster}
        alt='Hero Video Poster'
        fill
        desktopSize='100vw'
        mobileSize='100vw'
        priority
        quality={100}
      />
    </div>
  )
}

export { HeroVideo }
