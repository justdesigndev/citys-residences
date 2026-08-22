'use client'

import s from './styles.module.css'

import { cn } from '@/lib/utils'
import { useCrossfadeLoop } from '@/hooks/useCrossfadeLoop'
import { useStartupSettled } from '@/hooks/useStartupSettled'
import { breakpoints } from '@/styles/config.mjs'
import { PlayCircleIcon } from '@phosphor-icons/react'
import { useIntersectionObserver, useWindowSize } from 'hamo'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Image } from '@/components/image'

const FullScreenVideoDialog = dynamic(
  () =>
    import('@/components/dialogs/full-screen-video-dialog').then(
      module => module.FullScreenVideoDialog
    ),
  { ssr: false }
)

interface AutoplayVideoProps {
  playbackId?: string
  mobilePlaybackId?: string
  aspectRatio?: number
  enableFullscreen?: boolean
  horizontalPosition?: number
  verticalPosition?: number
}

export function AutoplayVideo({
  playbackId,
  mobilePlaybackId,
  aspectRatio,
  enableFullscreen = false,
  horizontalPosition = 50,
  verticalPosition = 50,
}: AutoplayVideoProps) {
  const { width: windowWidth } = useWindowSize(100)
  const isMobile =
    typeof windowWidth === 'number' &&
    windowWidth < breakpoints.breakpointMobile
  const activePlaybackId = isMobile
    ? mobilePlaybackId || playbackId
    : playbackId
  const poster = `https://image.mux.com/${activePlaybackId}/thumbnail.webp?width=${isMobile ? 560 : 1920}&time=0`

  const crossfade = useCrossfadeLoop()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const hasLoadedRef = useRef(false)
  const wasPlayingBeforeDialogRef = useRef(false)
  const [ready, setReady] = useState(false)
  const [shouldLoadDialog, setShouldLoadDialog] = useState(false)
  // Thumbnails stay lazy through startup, then switch to eager so they all
  // warm in the background — fast scrolling must find them already loaded.
  const thumbnailsWarm = useStartupSettled()

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
    const el = crossfade.primaryRef.current
    if (!el || (!playbackId && !mobilePlaybackId)) return

    // Lazy load video sources when intersecting (the standby element is
    // loaded later by the crossfade machinery, shortly before it is needed)
    if (entry?.isIntersecting) {
      if (!hasLoadedRef.current) {
        hasLoadedRef.current = true
        // The browser will automatically select the appropriate source based on media queries
        el.load()
      }

      if (enableFullscreen && !shouldLoadDialog) {
        setShouldLoadDialog(true)
      }
    }

    // auto play / pause behavior
    if (entry && !entry.isIntersecting) {
      crossfade.pauseAll()
    } else if (entry?.isIntersecting && crossfade.getActive()?.paused) {
      crossfade.playActive()
    }
  }, [entry, playbackId, mobilePlaybackId, enableFullscreen, shouldLoadDialog, crossfade])

  const videoContent = (
    <>
      <Image
        src={poster}
        alt='Video Thumbnail'
        fill
        mobileSize='100vw'
        desktopSize='100vw'
        className={cn(s.thumbnail, 'z-10 object-cover')}
        style={
          {
            '--aspect-ratio': aspectRatio,
            '--horizontal-position': `${horizontalPosition ?? 50}%`,
            '--vertical-position': `${verticalPosition ?? 50}%`,
          } as React.CSSProperties
        }
        loading={thumbnailsWarm ? 'eager' : 'lazy'}
      />
      {/* Two stacked elements dissolve into each other across the loop
          point (useCrossfadeLoop); the wrapper keeps the original
          thumbnail fade-in behavior */}
      <div
        className={cn(
          'absolute inset-0 z-20 transition-opacity duration-500',
          ready ? 'opacity-100' : 'opacity-0',
          enableFullscreen && 'cursor-pointer'
        )}
      >
        {[crossfade.primaryRef, crossfade.secondaryRef].map((ref, i) => (
          <video
            key={i}
            ref={ref}
            poster={undefined}
            onLoadedData={i === 0 ? () => setReady(true) : undefined}
            className={cn(
              s.video,
              'absolute inset-0 h-full w-full object-cover object-center'
            )}
            style={
              {
                '--aspect-ratio': aspectRatio,
                '--horizontal-position': `${horizontalPosition ?? 50}%`,
                '--vertical-position': `${verticalPosition ?? 50}%`,
                transition: 'opacity 400ms linear',
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
        ))}
      </div>
    </>
  )

  const handleDialogOpenChange = useCallback(
    (isOpen: boolean) => {
      const el = crossfade.getActive()
      if (!el) return

      if (isOpen) {
        // Dialog is opening - pause the main video and remember if it was playing
        wasPlayingBeforeDialogRef.current = !el.paused
        crossfade.pauseAll()
      } else {
        // Dialog is closing - resume if it was playing and still intersecting
        if (wasPlayingBeforeDialogRef.current && entry?.isIntersecting) {
          crossfade.playActive()
        }
      }
    },
    [entry, crossfade]
  )

  const container = (
    <div
      className={cn(
        'group',
        'relative h-full w-full',
        enableFullscreen && 'cursor-pointer'
      )}
      ref={setContainerRef}
    >
      {videoContent}
      {enableFullscreen && activePlaybackId && shouldLoadDialog && (
        <div className='absolute inset-0 z-30'>
          <FullScreenVideoDialog
            dialogTrigger={null}
            mediaId={playbackId ?? ''}
            aspectRatio={aspectRatio}
            onOpenChange={handleDialogOpenChange}
            loading='page'
          />
        </div>
      )}
      {enableFullscreen && (
        <span
          className={cn(
            'pointer-events-none absolute inset-0 z-50 bg-black/50 transition-all duration-300 ease-in-out group-hover:bg-black/30'
          )}
        >
          <PlayCircleIcon
            className='pointer-events-none absolute left-1/2 top-1/2 z-50 size-16 -translate-x-1/2 -translate-y-1/2 text-white transition-transform duration-300 ease-in-out group-hover:scale-125 xl:size-24'
            weight='fill'
          />
        </span>
      )}
    </div>
  )

  return container
}
