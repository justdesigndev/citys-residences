'use client'

import './styles.css'

import React, { useCallback, useRef, useState } from 'react'
// import MuxPlayer from '@mux/mux-player-react'
import { Image } from '@/components/image'
import { useGSAP } from '@gsap/react'
import type { MuxPlayerRefAttributes } from '@mux/mux-player-react'
import MuxPlayer from '@mux/mux-player-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'motion/react'

// Register GSAP plugins (required even when using useGSAP)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

interface MuxPlayerWrapperProps extends React.ComponentProps<typeof MuxPlayer> {
  viewportThreshold?: number
  scrollDelay?: number // Time in milliseconds video must be in viewport before playing
  customPlaceholder?: string
}

const MuxPlayerWrapperComponent = ({
  playbackId,
  onCanPlay,
  onPlay,
  onEnded,
  onError,
  streamType = 'on-demand',
  viewportThreshold = 0,
  scrollDelay = 2000,
  customPlaceholder,
  ...muxPlayerProps
}: MuxPlayerWrapperProps) => {
  const playerRef = useRef<MuxPlayerRefAttributes | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePlayerRef = useCallback(
    (instance: MuxPlayerRefAttributes | null) => {
      playerRef.current = instance
    },
    []
  )

  // Scroll optimization state
  const isInViewportRef = useRef(false)
  const isPlayerReadyRef = useRef(false)
  const hasPendingPlayRef = useRef(false)
  const hasPlayedOnceRef = useRef(false)
  const viewportTimerRef = useRef<NodeJS.Timeout | null>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  // Memoize viewport callbacks to prevent ScrollTrigger recreations
  const handleViewportEnter = useCallback(() => {
    isInViewportRef.current = true
  }, [])

  const handleViewportLeave = useCallback(() => {
    isInViewportRef.current = false
  }, [])

  const clearViewportTimer = useCallback(() => {
    if (viewportTimerRef.current) {
      clearTimeout(viewportTimerRef.current)
      viewportTimerRef.current = null
    }
  }, [])

  const attemptPlay = useCallback(() => {
    const player = playerRef.current

    if (!player) {
      return
    }

    if (!isPlayerReadyRef.current || !isInViewportRef.current) {
      hasPendingPlayRef.current = true
      return
    }

    hasPendingPlayRef.current = false
    player.play().catch(() => {
      setTimeout(() => {
        player.play().catch(() => {
          // Silent fail after retry
        })
      }, 100)
    })
  }, [])

  const scheduleViewportPlay = useCallback(() => {
    clearViewportTimer()

    if (!isInViewportRef.current) {
      return
    }

    if (hasPlayedOnceRef.current) {
      hasPendingPlayRef.current = true
      attemptPlay()
      return
    }

    viewportTimerRef.current = setTimeout(() => {
      // Render player after scrollDelay and fade out placeholder
      setShowPlayer(true)
      hasPendingPlayRef.current = true
      attemptPlay()
    }, scrollDelay)
  }, [attemptPlay, clearViewportTimer, scrollDelay])

  const pausePlayback = useCallback(() => {
    const player = playerRef.current
    if (!player) {
      return
    }
    if (player.paused === false) {
      player.pause()
    }
  }, [])

  const handleEnterWithPlayback = useCallback(() => {
    handleViewportEnter()
    scheduleViewportPlay()
  }, [handleViewportEnter, scheduleViewportPlay])

  const handleLeaveWithPlayback = useCallback(() => {
    handleViewportLeave()
    clearViewportTimer()
    hasPendingPlayRef.current = false
    pausePlayback()
  }, [clearViewportTimer, handleViewportLeave, pausePlayback])

  // GSAP ScrollTrigger for viewport detection using useGSAP hook
  useGSAP(
    () => {
      // Create ScrollTrigger instance
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: `top ${100 - viewportThreshold * 100}%`,
        end: `bottom ${viewportThreshold * 100}%`,
        onEnter: handleEnterWithPlayback,
        onLeave: handleLeaveWithPlayback,
        onEnterBack: handleEnterWithPlayback,
        onLeaveBack: handleLeaveWithPlayback,
        markers: false,
      })

      // Check immediately if element is in viewport (check specific instance, not global refresh)
      if (scrollTriggerRef.current.isActive) {
        handleEnterWithPlayback()
      }

      return () => {
        clearViewportTimer()
        scrollTriggerRef.current?.kill()
        scrollTriggerRef.current = null
        isInViewportRef.current = false
        hasPendingPlayRef.current = false
      }
    },
    {
      scope: containerRef,
      dependencies: [
        viewportThreshold,
        handleEnterWithPlayback,
        handleLeaveWithPlayback,
        clearViewportTimer,
      ],
    }
  )

  // Handle when player is ready - memoized to prevent recreating on every render
  const handleCanPlay = useCallback(
    (e: CustomEvent) => {
      isPlayerReadyRef.current = true
      if (hasPendingPlayRef.current && isInViewportRef.current) {
        attemptPlay()
      }
      if (onCanPlay) {
        onCanPlay(e)
      }
    },
    [attemptPlay, onCanPlay]
  )

  // Handle when video metadata is loaded (iOS-friendly alternative)
  const handleLoadedMetadata = useCallback(() => {
    // On iOS, metadata loaded is often more reliable than canplay
    isPlayerReadyRef.current = true
    if (hasPendingPlayRef.current && isInViewportRef.current) {
      attemptPlay()
    }
  }, [attemptPlay])

  // Handle when video data is loaded
  const handleLoadedData = useCallback(() => {
    isPlayerReadyRef.current = true
    if (hasPendingPlayRef.current && isInViewportRef.current) {
      attemptPlay()
    }
  }, [attemptPlay])

  // State to control when to render the player (after scrollDelay)
  const [showPlayer, setShowPlayer] = useState(!customPlaceholder)

  // Handle when video starts playing
  const handlePlay = useCallback(
    (e: CustomEvent) => {
      hasPlayedOnceRef.current = true
      clearViewportTimer()
      if (onPlay) {
        onPlay(e)
      }
    },
    [clearViewportTimer, onPlay]
  )

  // Handle when video is paused - memoized to prevent recreating
  const handlePause = useCallback(() => {
    // Silent
  }, [])

  return (
    <>
      <div ref={containerRef} className='relative h-full w-full'>
        {/* Placeholder - shown initially, fades out when player renders */}
        {customPlaceholder && (
          <AnimatePresence>
            {!showPlayer && (
              <motion.div
                key='placeholder'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className='absolute inset-0 z-10'
              >
                <Image
                  src={customPlaceholder as string}
                  alt='Video placeholder'
                  fill
                  className='object-cover object-center'
                  loading='lazy'
                  style={{
                    filter: 'grayscale(100%)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Player - only rendered after scrollDelay */}
        {showPlayer && (
          <motion.div
            key='player'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='absolute inset-0'
          >
            <MuxPlayer
              ref={handlePlayerRef}
              playbackId={playbackId}
              // No native autoplay - we control playback via viewport detection
              muted
              loop
              playsInline // Required for iOS autoplay
              streamType={streamType}
              // Event handlers
              onCanPlay={handleCanPlay}
              onLoadedMetadata={handleLoadedMetadata}
              onLoadedData={handleLoadedData}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={onEnded}
              onError={onError}
              minResolution='540p'
              {...muxPlayerProps}
            />
          </motion.div>
        )}
      </div>
    </>
  )
}

MuxPlayerWrapperComponent.displayName = 'MuxPlayerWrapper'

export { MuxPlayerWrapperComponent as MuxPlayerWrapper }
