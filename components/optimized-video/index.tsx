'use client'

import s from './styles.module.css'

import { Image } from '@/components/image'
import { cn } from '@/lib/utils'
import { useCrossfadeLoop } from '@/hooks/useCrossfadeLoop'
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
  const crossfade = useCrossfadeLoop()
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
  // Whether the <source> elements are mounted. A <video> with a src-less
  // <source> child keeps WebKit's media resource selection pending; with ~45
  // of these mounting at once (CMS card sections), Safari's main thread
  // stalls for ~30s, freezing Lenis/GSAP and delaying the hero video. So the
  // elements stay completely source-less until they approach the viewport.
  const [active, setActive] = useState(false)

  useEffect(() => {
    const video = crossfade.primaryRef.current
    if (!video) return

    observer.current = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // 👉 LOAD + PLAY (sources mount via `active`, effect below plays)
            setActive(true)
          } else {
            // 👉 UNLOAD to free memory (sources unmount via `active`)
            crossfade.pauseAll()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSrc])

  useEffect(() => {
    const video = crossfade.primaryRef.current
    if (!video) return

    if (active) {
      // Source elements just mounted: pick them up and start playback (the
      // standby element is loaded by the crossfade machinery when needed)
      video.load()
      crossfade.playActive()
    } else if (video.currentSrc) {
      // Source elements just unmounted: re-run selection to detach and free
      crossfade.loadAll()
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
      {/* Two stacked elements dissolve into each other across the loop
          point (useCrossfadeLoop); the wrapper keeps the original
          thumbnail fade-in behavior */}
      <div
        className={cn(
          'relative z-20 h-full w-full',
          'transition-opacity duration-500',
          {
            'opacity-0': !ready,
            'opacity-100': ready,
          }
        )}
      >
        {[crossfade.primaryRef, crossfade.secondaryRef].map((ref, i) => (
          <video
            key={i}
            ref={ref}
            poster={undefined}
            muted
            loop
            playsInline
            preload='none'
            onLoadedData={i === 0 ? () => setReady(true) : undefined}
            className={cn(s.video, i === 0 ? 'relative' : 'absolute inset-0')}
            style={
              {
                '--aspect-ratio': aspectRatio,
                '--horizontal-position': `${horizontalPosition ?? 50}%`,
                transition: 'opacity 400ms linear',
              } as React.CSSProperties
            }
          >
            {/* sources are mounted only when the video approaches the viewport */}
            {active && <source src={videoSrc} type='video/mp4' />}
          </video>
        ))}
      </div>
    </div>
  )
}
