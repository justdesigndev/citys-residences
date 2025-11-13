'use client'

import { breakpoints } from '@/styles/config.mjs'
import MuxPlayer from '@mux/mux-player-react'
import type { MuxPlayerRefAttributes } from '@mux/mux-player-react'
import { useIntersectionObserver, useWindowSize } from 'hamo'
import React, { useCallback, useEffect, useRef } from 'react'

type HeroVideoProps = {
  desktopVideoId: string
  mobileVideoId: string
  desktopPoster: string
  mobilePoster: string
}

const HeroVideo: React.FC<HeroVideoProps> = ({
  desktopVideoId,
  mobileVideoId,
  desktopPoster,
  mobilePoster,
}) => {
  const { width: windowWidth } = useWindowSize(100)
  const isMobile = windowWidth && windowWidth < breakpoints.breakpointMobile
  const playerRef = useRef<MuxPlayerRefAttributes | null>(null)
  const [setIntersectionRef, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '200px 0px 200px 0px',
    threshold: 0,
  })

  const setPlayerRef = useCallback(
    (node: MuxPlayerRefAttributes | null) => {
      playerRef.current = node
      setIntersectionRef(node ?? undefined)
    },
    [setIntersectionRef]
  )

  useEffect(() => {
    const player = playerRef.current
    if (!player) {
      return
    }

    if (entry?.isIntersecting) {
      // Only call play() if video is paused or not playing
      // This prevents resetting the video if it's already playing
      if (player.paused) {
        player.play().catch(() => undefined)
      }
      return
    }

    player.pause()
  }, [entry])

  return (
    <>
      {isMobile && (
        <MuxPlayer
          ref={setPlayerRef}
          className='relative block h-screen w-full lg:hidden'
          playbackId={mobileVideoId}
          preload='auto'
          autoPlay
          playsInline
          loop
          muted
          streamType='on-demand'
          minResolution='480p'
          startTime={0}
          placeholder={mobilePoster}
          style={
            {
              aspectRatio: 1920 / 1080,
              '--media-object-fit': 'cover',
              '--media-object-position': 'center bottom',
              '--controls': 'none',
            } as React.CSSProperties
          }
        />
      )}
      {!isMobile && (
        <MuxPlayer
          ref={setPlayerRef}
          className='relative hidden h-screen w-full lg:block'
          playbackId={desktopVideoId}
          preload='auto'
          autoPlay
          playsInline
          loop
          muted
          streamType='on-demand'
          minResolution='720p'
          startTime={0}
          placeholder={desktopPoster}
          style={
            {
              aspectRatio: 560 / 966,
              '--media-object-fit': 'cover',
              '--media-object-position': 'center bottom',
              '--controls': 'none',
            } as React.CSSProperties
          }
        />
      )}
      {/* <Image
        src={desktopPoster}
        alt='Hero Video Poster'
        fill
        desktopSize='100vw'
        mobileSize='100vw'
        className={cn(
          'hidden lg:block',
          'absolute inset-0 z-20 h-full w-full object-cover',
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
          'absolute inset-0 z-20 h-full w-full object-cover',
          'transition-opacity duration-300 ease-in-out',
          {
            'pointer-events-none opacity-100': !isPlaying,
            'pointer-events-auto opacity-0': isPlaying,
          }
        )}
        priority
      /> */}
    </>
  )
}

export { HeroVideo }
