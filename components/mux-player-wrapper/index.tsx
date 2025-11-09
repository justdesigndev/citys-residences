'use client'

import './styles.css'

import React, { useRef, useEffect, useState } from 'react'
// import MuxPlayer from '@mux/mux-player-react'
import MuxPlayer from '@mux/mux-player-react/lazy'
import type { MuxPlayerRefAttributes } from '@mux/mux-player-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface MuxPlayerWrapperProps extends React.ComponentProps<typeof MuxPlayer> {
  playOnViewport?: boolean
  viewportThreshold?: number
  scrollDelay?: number // Delay in milliseconds before loading video after scroll stops
  enableScrollOptimization?: boolean // Enable scroll-aware lazy loading
}

export const MuxPlayerWrapper = React.forwardRef<
  MuxPlayerRefAttributes,
  MuxPlayerWrapperProps
>(
  (
    {
      playbackId,
      metadata,
      poster,
      placeholder,
      className,
      maxResolution,
      minResolution,
      onCanPlay,
      onPlay,
      onEnded,
      onError,
      preload = 'auto',
      startTime = 0,
      streamType = 'on-demand',
      playOnViewport = false,
      viewportThreshold = 0,
      scrollDelay = 1500, // Default 1.5 seconds
      enableScrollOptimization = false,
      ...muxPlayerProps
    },
    ref
  ) => {
    const internalRef = useRef<MuxPlayerRefAttributes>(null)
    const playerRef =
      (ref as React.RefObject<MuxPlayerRefAttributes>) || internalRef
    const containerRef = useRef<HTMLDivElement>(null)

    // Scroll optimization state
    const [isScrolling, setIsScrolling] = useState(false)
    const [isInViewport, setIsInViewport] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [shouldAttemptPlay, setShouldAttemptPlay] = useState(false)
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const loadDelayTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

    // GSAP ScrollTrigger for viewport detection
    useEffect(() => {
      if (!containerRef.current) return
      if (!playOnViewport && !enableScrollOptimization) return

      const element = containerRef.current

      // Create ScrollTrigger instance
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: element,
        start: `top ${100 - viewportThreshold * 100}%`,
        end: `bottom ${viewportThreshold * 100}%`,
        onEnter: () => {
          console.log('👁️ ScrollTrigger: Entering viewport')
          setIsInViewport(true)
        },
        onLeave: () => {
          console.log('👁️ ScrollTrigger: Leaving viewport (bottom)')
          setIsInViewport(false)
        },
        onEnterBack: () => {
          console.log('👁️ ScrollTrigger: Entering viewport (scrolling back)')
          setIsInViewport(true)
        },
        onLeaveBack: () => {
          console.log('👁️ ScrollTrigger: Leaving viewport (top)')
          setIsInViewport(false)
        },
        onRefresh: self => {
          // Check if element is already in viewport on mount/refresh
          if (self.isActive) {
            console.log('👁️ ScrollTrigger: Already in viewport on mount')
            setIsInViewport(true)
          }
        },
        markers: process.env.NODE_ENV === 'development',
      })

      // Check immediately if element is in viewport
      ScrollTrigger.refresh()

      return () => {
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill()
        }
      }
    }, [playOnViewport, viewportThreshold, enableScrollOptimization])

    // Scroll detection using ScrollTrigger update callback
    useEffect(() => {
      if (!enableScrollOptimization) return

      const handleScroll = () => {
        setIsScrolling(true)

        // Clear existing scroll timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }

        // Set new timeout to detect when scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
          console.log('⏸️ Scrolling stopped')
          setIsScrolling(false)
        }, 200) // Detect scroll stop after 200ms
      }

      // Create a global ScrollTrigger to detect any scroll
      const scrollDetector = ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: () => {
          handleScroll()
        },
      })

      return () => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        scrollDetector.kill()
      }
    }, [enableScrollOptimization])

    // Handle delayed video play when in viewport and not scrolling
    useEffect(() => {
      if (!enableScrollOptimization) {
        // If optimization disabled, attempt play immediately when in viewport
        setShouldAttemptPlay(isInViewport)
        return
      }

      console.log('📊 Video Play State:', {
        isInViewport,
        isScrolling,
        shouldAttemptPlay,
        isPlaying,
        hasTimer: !!loadDelayTimeoutRef.current,
      })

      // Clear any existing delay timeout
      if (loadDelayTimeoutRef.current) {
        clearTimeout(loadDelayTimeoutRef.current)
      }

      // If video is in viewport and not scrolling, start delay timer
      if (isInViewport && !isScrolling && !shouldAttemptPlay) {
        console.log(
          `⏱️ User stopped on video - starting ${scrollDelay}ms delay before playing`
        )
        loadDelayTimeoutRef.current = setTimeout(() => {
          console.log('✅ Delay complete - attempting to play video')
          setShouldAttemptPlay(true)
        }, scrollDelay)
      }

      // If scrolling started again or left viewport, cancel the timer
      if ((isScrolling || !isInViewport) && loadDelayTimeoutRef.current) {
        console.log('❌ Canceling play attempt (scrolling or out of viewport)')
        clearTimeout(loadDelayTimeoutRef.current)
        loadDelayTimeoutRef.current = null
      }

      return () => {
        if (loadDelayTimeoutRef.current) {
          clearTimeout(loadDelayTimeoutRef.current)
        }
      }
    }, [
      isInViewport,
      isScrolling,
      shouldAttemptPlay,
      isPlaying,
      scrollDelay,
      enableScrollOptimization,
    ])

    // Handle play/pause based on shouldAttemptPlay
    useEffect(() => {
      if (!playOnViewport) {
        return
      }

      const player = playerRef.current

      if (!player) {
        console.log('⚠️ Player ref not available yet')
        return
      }

      if (shouldAttemptPlay && isInViewport) {
        // Attempt to play the video
        console.log('🎬 Attempting to play video')
        player.play().catch(error => {
          console.warn('Play was prevented:', error)
        })
      } else if (!isInViewport) {
        // Video left viewport, pause it
        console.log('⏸️ Video leaving viewport - pausing')
        player.pause()
        setShouldAttemptPlay(false) // Reset play attempt
        setIsPlaying(false) // Reset playing state
      }
      // playerRef is a ref object and is stable across renders
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldAttemptPlay, isInViewport, playOnViewport])

    // Initial autoplay for non-viewport mode
    useEffect(() => {
      if (playOnViewport) {
        return
      }

      // Ensure autoplay starts when component mounts
      const player = playerRef.current
      if (player) {
        // Try to play the video
        player.play().catch(error => {
          console.warn('Autoplay was prevented:', error)
        })
      }
      // playerRef is a ref object and is stable across renders
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playbackId, playOnViewport])

    // Handle when player is ready
    const handleCanPlay = (e: CustomEvent) => {
      console.log('✅ Player ready (canplay event)')
      if (onCanPlay) {
        onCanPlay(e)
      }
    }

    // Handle when video starts playing - this triggers placeholder fadeout
    const handlePlay = (e: CustomEvent) => {
      console.log('▶️ Video started playing - fading out placeholder')
      setIsPlaying(true)
      if (onPlay) {
        onPlay(e)
      }
    }

    // Handle when video is paused
    const handlePause = () => {
      console.log('⏸️ Video paused')
      setIsPlaying(false)
    }

    return (
      <div ref={containerRef} className='relative h-full w-full'>
        {/* Video player - always rendered (has lazy loading built-in) */}
        <MuxPlayer
          ref={playerRef}
          playbackId={playbackId}
          metadata={metadata}
          poster={poster}
          placeholder={placeholder}
          className={cn(className)}
          // Autoplay settings - only enable native autoplay when NOT using viewport control
          {...(!playOnViewport && { autoPlay: 'muted' as const })}
          muted
          loop
          playsInline // Required for iOS autoplay
          // Performance and loading settings
          preload={playOnViewport ? 'metadata' : preload} // Use metadata for manual control
          streamType={streamType}
          startTime={startTime}
          // Resolution settings
          maxResolution={maxResolution}
          minResolution={minResolution}
          // Disable user interactions for background video
          nohotkeys
          // Mobile-specific attributes
          disableTracking={false}
          // Event handlers
          onCanPlay={handleCanPlay}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={onEnded}
          onError={onError}
          onLoadStart={() => console.log('📹 Video load started')}
          onLoadedMetadata={() => console.log('📊 Video metadata loaded')}
          onLoadedData={() => console.log('📦 Video data loaded')}
          {...muxPlayerProps}
        />

        {/* Placeholder overlays video and fades out when video starts playing */}
        <AnimatePresence>
          {enableScrollOptimization && !isPlaying && (
            <motion.div
              key='placeholder'
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className='absolute inset-0 z-10 bg-black'
              style={{
                backgroundImage: poster
                  ? `url(${poster})`
                  : placeholder
                    ? `url(${placeholder})`
                    : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                pointerEvents: 'none', // Allow clicks to pass through to video
              }}
            />
          )}
        </AnimatePresence>
      </div>
    )
  }
)

MuxPlayerWrapper.displayName = 'MuxPlayerWrapper'

export default MuxPlayerWrapper
