'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Image } from '../image'
import { cn } from '@/lib/utils'

type HeroVideoProps = {
  desktopSources: { src: string; type: string }[]
  mobileSources: { src: string; type: string }[]
  desktopPoster: string
  mobilePoster: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  preloadDistance?: number
}

const HeroVideo: React.FC<HeroVideoProps> = ({
  desktopSources,
  mobileSources,
  desktopPoster,
  mobilePoster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  preloadDistance = 400,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth <= 768)
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setShouldLoad(true)
          }

          if (entry.isIntersecting) {
            if (autoPlay) {
              video.play().catch(() => null)
            }
          } else {
            video.pause()
          }
        })
      },
      {
        rootMargin: `${preloadDistance}px 0px ${preloadDistance}px 0px`,
        threshold: 0.1,
      }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [autoPlay, preloadDistance])

  const poster = isMobile ? mobilePoster : desktopPoster
  const sources = isMobile ? mobileSources : desktopSources

  return (
    <>
      <video
        ref={videoRef}
        className={cn(className, 'z-10 h-full w-full object-cover')}
        poster={poster}
        playsInline
        muted={muted}
        loop={loop}
        preload={shouldLoad ? 'auto' : 'none'}
        controls={false}
        onPlay={() => setIsPlaying(true)}
      >
        {shouldLoad &&
          sources.map((s, i) => <source key={i} src={s.src} type={s.type} />)}
      </video>
      <Image
        src={desktopPoster}
        alt='Hero Video Poster'
        fill
        desktopSize='100vw'
        mobileSize='100vw'
        className={cn(
          'hidden lg:block',
          'absolute inset-0 z-20 h-full w-full object-cover grayscale-[80%]',
          'transition-opacity duration-300 ease-in-out',
          {
            'pointer-events-none opacity-100': !isPlaying,
            'pointer-events-auto opacity-0': isPlaying,
          }
        )}
        priority
      />
      <Image
        src={mobilePoster}
        alt='Hero Video Poster'
        fill
        desktopSize='100vw'
        mobileSize='100vw'
        className={cn(
          'block lg:hidden',
          'absolute inset-0 z-20 h-full w-full object-cover grayscale-[80%]',
          'transition-opacity duration-300 ease-in-out',
          {
            'pointer-events-none opacity-100': !isPlaying,
            'pointer-events-auto opacity-0': isPlaying,
          }
        )}
        priority
      />
    </>
  )
}

export { HeroVideo }
