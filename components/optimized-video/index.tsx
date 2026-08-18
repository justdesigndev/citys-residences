'use client'

import s from './styles.module.css'

import { Image } from '@/components/image'
import { cn } from '@/lib/utils'
import { useStartupSettled } from '@/hooks/useStartupSettled'
import { breakpoints } from '@/styles/config.mjs'
import { useWindowSize } from 'hamo'
import { useEffect, useRef, useState } from 'react'

interface Props {
  playbackId: string
  aspectRatio?: number // e.g. 16/9, 4/3, 1/1
  horizontalPosition?: number
}

export function OptimizedVideo({
  playbackId,
  aspectRatio,
  horizontalPosition,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const { width: windowWidth } = useWindowSize(100)
  const isMobile =
    typeof windowWidth === 'number' &&
    windowWidth < breakpoints.breakpointMobile

  const thumbnail = `https://image.mux.com/${playbackId}/thumbnail.webp?width=${isMobile ? 560 : 1440}&time=0`
  const videoSrc = `https://stream.mux.com/${playbackId}/highest.mp4`

  const [ready, setReady] = useState(false)
  // Thumbnails stay lazy through startup, then switch to eager so they all
  // warm in the background — fast scrolling must find them already loaded.
  const thumbnailsWarm = useStartupSettled()
  // Whether the <source> element is mounted. A <video> with a src-less
  // <source> child keeps WebKit's media resource selection pending; with ~45
  // of these mounting at once (CMS card sections), Safari's main thread
  // stalls for ~30s, freezing Lenis/GSAP and delaying the hero video. So the
  // element stays completely source-less until it approaches the viewport.
  const [active, setActive] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    observer.current = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // 👉 LOAD + PLAY (source mounts via `active`, effect below plays)
            setActive(true)
          } else {
            // 👉 UNLOAD to free memory (source unmounts via `active`)
            video.pause()
            setActive(false)
          }
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px', // load slightly before visible
      }
    )

    observer.current.observe(video)

    return () => {
      observer.current?.disconnect()
    }
  }, [videoSrc])

  useEffect(() => {
    const video = ref.current
    if (!video) return

    if (active) {
      // Source element just mounted: pick it up and start playback
      video.load()
      video.play().catch(() => {})
    } else if (video.currentSrc) {
      // Source element just unmounted: re-run selection to detach and free
      video.load()
      setReady(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return (
    <div className='relative h-full w-full bg-gray-200'>
      <Image
        src={thumbnail}
        alt='Video Thumbnail'
        fill
        mobileSize='100vw'
        desktopSize='100vw'
        className={cn(s.thumbnail, 'z-10')}
        style={
          {
            '--aspect-ratio': aspectRatio,
            '--horizontal-position': `${horizontalPosition ?? 50}%`,
          } as React.CSSProperties
        }
        loading={thumbnailsWarm ? 'eager' : 'lazy'}
      />
      <video
        ref={ref}
        poster={undefined}
        muted
        loop
        playsInline
        preload='none'
        onLoadedData={() => {
          setReady(true)
        }}
        className={cn(
          s.video,
          'relative z-20',
          'transition-opacity duration-500',
          {
            'opacity-0': !ready,
            'opacity-100': ready,
          }
        )}
        style={
          {
            '--aspect-ratio': aspectRatio,
            '--horizontal-position': `${horizontalPosition ?? 50}%`,
          } as React.CSSProperties
        }
      >
        {/* source is mounted only when the video approaches the viewport */}
        {active && <source src={videoSrc} type='video/mp4' />}
      </video>
    </div>
  )
}
