'use client'

import React, { useEffect, useRef, useState } from 'react'

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
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      playsInline
      muted={muted}
      loop={loop}
      preload={shouldLoad ? 'auto' : 'none'}
      controls={false}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0,
        transition: 'opacity 0.6s ease',
      }}
      onPlay={e => {
        ;(e.target as HTMLVideoElement).style.opacity = '1'
      }}
    >
      {shouldLoad &&
        sources.map((s, i) => <source key={i} src={s.src} type={s.type} />)}
    </video>
  )
}

export { HeroVideo }
