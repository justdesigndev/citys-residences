'use client'

import s from './styles.module.css'

import { Image } from '@/components/image'
import { cn } from '@/lib/utils'
import { breakpoints } from '@/styles/config.mjs'
import { useWindowSize } from 'hamo'
import { useEffect, useRef, useState } from 'react'

interface Props {
  playbackId: string
  aspectRatio?: number // e.g. 16/9, 4/3, 1/1
}

export function OptimizedVideo({ playbackId, aspectRatio }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const { width: windowWidth } = useWindowSize(100)
  const isMobile =
    typeof windowWidth === 'number' &&
    windowWidth < breakpoints.breakpointMobile

  const thumbnail = `https://image.mux.com/${playbackId}/thumbnail.webp?width=${isMobile ? 560 : 1440}&time=0`
  const videoSrc = `https://stream.mux.com/${playbackId}/highest.mp4`

  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    // Store src in data attribute
    video.dataset.src = videoSrc

    observer.current = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!video) continue

          if (entry.isIntersecting) {
            // 👉 LOAD + PLAY
            const source = video.querySelector('source')
            if (source && !source.src) {
              source.src = video.dataset.src || ''
              video.load()
            }
            video.play().catch(() => {})
          } else {
            // 👉 UNLOAD to free memory
            video.pause()
            const source = video.querySelector('source')
            if (source && source.src) {
              source.removeAttribute('src')
              video.load()
              setReady(false) // Reset ready state when unloaded
            }
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

  return (
    <div className='relative h-full w-full bg-gray-200'>
      <Image
        src={thumbnail}
        alt='Video Thumbnail'
        fill
        mobileSize='100vw'
        desktopSize='100vw'
        className={cn('z-10 object-cover')}
        style={{
          filter: 'grayscale(10%)',
        }}
        // loading='lazy'
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
          'relative z-20 transition-opacity duration-500',
          {
            'opacity-0': !ready,
            'opacity-100': ready,
          }
        )}
        style={
          {
            '--aspect-ratio': aspectRatio,
          } as React.CSSProperties
        }
      >
        {/* src will be set by IntersectionObserver when intersecting */}
        <source type='video/mp4' />
      </video>
    </div>
  )
}
