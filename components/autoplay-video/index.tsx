'use client'

import s from './styles.module.css'

import { cn } from '@/lib/utils'
import { breakpoints } from '@/styles/config.mjs'
import { useIntersectionObserver, useWindowSize } from 'hamo'
import { useCallback, useEffect, useRef } from 'react'

interface AutoplayVideoProps {
  playbackId?: string
  mobilePlaybackId?: string
  aspectRatio?: number
}

export function AutoplayVideo({
  playbackId,
  mobilePlaybackId,
  aspectRatio,
}: AutoplayVideoProps) {
  const { width: windowWidth } = useWindowSize(100)
  const isMobile =
    typeof windowWidth === 'number' &&
    windowWidth < breakpoints.breakpointMobile
  const activePlaybackId = isMobile
    ? mobilePlaybackId || playbackId
    : playbackId
  const poster = `https://image.mux.com/${activePlaybackId}/thumbnail.webp?width=${isMobile ? 560 : 1920}&time=0`

  const playerRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const hasLoadedRef = useRef(false)

  const [setIntersectionRef, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '1500px 0px 1500px 0px',
    threshold: 0,
  })

  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      setIntersectionRef(node ?? undefined)
    },
    [setIntersectionRef]
  )

  useEffect(() => {
    const el = playerRef.current
    if (!el || (!playbackId && !mobilePlaybackId)) return

    // Lazy load video sources when intersecting
    if (entry?.isIntersecting && !hasLoadedRef.current) {
      hasLoadedRef.current = true
      // The browser will automatically select the appropriate source based on media queries
      el.load()
    }

    // auto play / pause behavior
    if (entry && !entry.isIntersecting) {
      el.pause()
    } else if (entry?.isIntersecting && el.paused) {
      el.play().catch(() => {})
    }
  }, [entry, playbackId, mobilePlaybackId])

  return (
    <div className='relative h-full w-full' ref={setContainerRef}>
      <video
        ref={playerRef}
        poster={poster}
        className={cn(
          s.video,
          'absolute inset-0 h-full w-full object-cover object-center'
        )}
        style={
          {
            '--aspect-ratio': aspectRatio,
          } as React.CSSProperties
        }
        muted
        loop
        playsInline
        preload='none'
        disablePictureInPicture
        controlsList='nodownload noplaybackrate'
      >
        {(mobilePlaybackId || playbackId) && (
          <source
            src={`https://stream.mux.com/${mobilePlaybackId || playbackId}/highest.mp4`}
            media='(max-width: 799px)'
            type='video/mp4'
          />
        )}
        {playbackId && (
          <source
            src={`https://stream.mux.com/${playbackId}/highest.mp4`}
            media='(min-width: 800px)'
            type='video/mp4'
          />
        )}
      </video>
    </div>
  )
}
