'use client'

import { cn } from '@/lib/utils'
import {
  WistiaPlayer,
  WistiaPlayerElement,
  WistiaPlayerProps,
} from '@wistia/wistia-player-react'
import { useEffect, useRef, useState } from 'react'

import { Image } from '@/components/image'

interface WistiaPlayerWrapperProps extends WistiaPlayerProps {
  className?: string
  customPoster?: string
  posterPriority?: boolean
  isInViewport?: boolean
  onPlayStart?: () => void
}

export function WistiaPlayerWrapper(props: WistiaPlayerWrapperProps) {
  const {
    className,
    customPoster,
    posterPriority = false,
    isInViewport = false,
    onPlayStart,
    ...wistiaProps
  } = props

  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef<WistiaPlayerElement | null>(null)
  const playAttemptTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hasPlayedRef = useRef(false)

  // Handle video play event - fade out poster
  const handlePlay = () => {
    if (!hasPlayedRef.current) {
      hasPlayedRef.current = true
      onPlayStart?.()
    }
    setIsPlaying(true)
  }

  // Monitor and force play when in viewport
  useEffect(() => {
    if (!playerRef.current || !isInViewport || hasPlayedRef.current) return

    // Clear any existing timeout
    if (playAttemptTimeoutRef.current) {
      clearTimeout(playAttemptTimeoutRef.current)
    }

    // Attempt to play after a short delay
    playAttemptTimeoutRef.current = setTimeout(() => {
      const player = playerRef.current
      if (player && typeof player.play === 'function') {
        try {
          // Try to play the video
          const playPromise = player.play()

          // Handle play promise if it exists
          if (playPromise && typeof playPromise.then === 'function') {
            playPromise
              .then(() => {
                // Video started playing successfully
                if (!hasPlayedRef.current) {
                  hasPlayedRef.current = true
                  onPlayStart?.()
                }
              })
              .catch((error: unknown) => {
                // Play was prevented, try again with muted
                console.warn('Autoplay prevented, retrying:', error)
                if (player) {
                  player.muted = true
                  player.play?.()
                }
              })
          }
        } catch (error) {
          console.error('Wistia player error:', error)
        }
      }
    }, 500) // Wait 500ms before attempting to play

    return () => {
      if (playAttemptTimeoutRef.current) {
        clearTimeout(playAttemptTimeoutRef.current)
      }
    }
  }, [isInViewport, onPlayStart])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playAttemptTimeoutRef.current) {
        clearTimeout(playAttemptTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className={cn('absolute inset-0 z-50 h-full w-full', className)}
      aria-label='Video player'
    >
      <WistiaPlayer
        ref={playerRef}
        className='!pointer-events-none absolute inset-0 h-full w-full'
        onPlay={handlePlay}
        muted
        autoplay
        preload='auto'
        swatch={false}
        bigPlayButton={false}
        silentAutoplay='allow'
        endVideoBehavior='loop'
        controlsVisibleOnLoad={false}
        playBarControl={false}
        volumeControl={false}
        settingsControl={false}
        transparentLetterbox={true}
        roundedPlayer={0}
        fullscreenControl={false}
        playbackRateControl={false}
        playPauseControl={false}
        {...wistiaProps}
      />
      {customPoster && (
        <Image
          src={customPoster}
          alt='Video poster'
          fill
          className={cn(
            'absolute inset-0 h-full w-full',
            'object-cover object-center',
            'transition-opacity duration-300',
            !isPlaying && 'pointer-events-auto opacity-100',
            isPlaying && 'pointer-events-none opacity-0'
          )}
          quality={75}
          priority={posterPriority}
        />
      )}
    </div>
  )
}
