'use client'

import { useIntersectionObserver } from 'hamo'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Image } from '../image'
import { cn } from '@/lib/utils'

type HeroVideoProps = {
  desktopVideoId?: string
  mobileVideoId?: string
  desktopPoster: string
  mobilePoster: string
}

const HeroVideo: React.FC<HeroVideoProps> = ({
  desktopPoster,
  mobilePoster,
  desktopVideoId,
  mobileVideoId,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)

  const [setIntersectionRef, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '200px 0px 200px 0px',
    threshold: 0,
  })

  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      setIntersectionRef(node ?? undefined)
    },
    [setIntersectionRef]
  )

  // Handle video play/pause based on intersection
  useEffect(() => {
    if (!videoRef.current || !isVideoReady) {
      return
    }

    // Only pause if we explicitly know the element is NOT intersecting
    // Don't pause if entry is null/undefined (initial state)
    if (entry && !entry.isIntersecting) {
      videoRef.current.pause()
      return
    }

    // Play if intersecting (or if entry is null initially, let autoplay handle it)
    if (entry?.isIntersecting && videoRef.current.paused) {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay was prevented or failed
          console.warn('Video play failed:', error)
        })
      }
    }
  }, [entry, isVideoReady])

  // Ensure video plays when it becomes ready and is in view
  useEffect(() => {
    if (!videoRef.current || !isVideoReady) {
      return
    }

    // If video is ready and should be visible, try to play
    if (!entry || entry.isIntersecting) {
      if (videoRef.current.paused) {
        const playPromise = videoRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn('Video autoplay failed:', error)
          })
        }
      }
    }
  }, [isVideoReady, entry])

  // Force video to load when sources are available
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Ensure video loads when component mounts or sources change
    if (desktopVideoId || mobileVideoId) {
      // Only call load if video hasn't started loading yet
      if (video.readyState === 0) {
        video.load()
      }
    }
  }, [desktopVideoId, mobileVideoId])

  // Fallback: Try to play video after a delay if it hasn't started
  useEffect(() => {
    if (!videoRef.current) return

    const timeoutId = setTimeout(() => {
      const video = videoRef.current
      if (!video) return

      // If video is ready or has some data loaded, and it's paused, try to play
      if ((video.readyState >= 2 || isVideoReady) && video.paused) {
        // Only play if in viewport (or intersection observer hasn't fired yet)
        if (!entry || entry.isIntersecting) {
          const playPromise = video.play()
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Silently fail - autoplay might be blocked
            })
          }
        }
      }
    }, 500) // Try after 500ms

    return () => clearTimeout(timeoutId)
  }, [isVideoReady, entry])

  const commonVideoProps = {
    preload: 'auto',
    autoPlay: true,
    playsInline: true,
    loop: true,
    muted: true,
  }

  // Handle video ready state
  const handleLoadedData = useCallback(() => {
    setIsVideoReady(true)
    // Try to play once video is loaded if it's in view
    const video = videoRef.current
    if (video && video.paused) {
      // Check if video should be playing based on intersection
      const shouldPlay = !entry || entry.isIntersecting
      if (shouldPlay) {
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn('Video autoplay failed on load:', error)
          })
        }
      }
    }
  }, [entry])

  const handleCanPlay = useCallback(() => {
    setIsVideoReady(true)
    // Also try to play when video can play
    const video = videoRef.current
    if (video && video.paused) {
      const shouldPlay = !entry || entry.isIntersecting
      if (shouldPlay) {
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Silently fail - autoplay might be blocked
          })
        }
      }
    }
  }, [entry])

  const handlePlay = useCallback(() => {
    setHasPlayed(true)
  }, [])

  // Handle source changes (when media queries match different sources)
  const handleLoadedMetadata = useCallback(() => {
    setIsVideoReady(true)
  }, [])

  // Set up video ref callback to attach event listeners
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('play', handlePlay)

    // Check if video is already ready
    if (video.readyState >= 2) {
      setIsVideoReady(true)
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('play', handlePlay)
    }
  }, [handleLoadedData, handleLoadedMetadata, handleCanPlay, handlePlay])

  return (
    <div ref={setContainerRef} className='relative h-screen w-full'>
      <video
        ref={videoRef}
        {...commonVideoProps}
        className='relative h-screen w-full object-cover object-bottom'
      >
        {mobileVideoId && (
          <source
            src={`https://stream.mux.com/${mobileVideoId}/highest.mp4`}
            media='(max-width: 799px)'
            type='video/mp4'
          />
        )}
        {desktopVideoId && (
          <source
            src={`https://stream.mux.com/${desktopVideoId}/highest.mp4`}
            media='(min-width: 800px)'
            type='video/mp4'
          />
        )}
      </video>
      <Image
        className={cn(
          'absolute inset-0 z-20 h-full w-full object-cover object-bottom transition-opacity duration-300 ease-in-out xl:hidden',
          hasPlayed && 'pointer-events-none opacity-0'
        )}
        src={mobilePoster}
        alt='Hero Video Poster'
        fill
        desktopSize='100vw'
        mobileSize='100vw'
        priority
      />
      <Image
        className={cn(
          'absolute inset-0 z-20 hidden h-full w-full object-cover object-bottom transition-opacity duration-300 ease-in-out xl:block',
          hasPlayed && 'pointer-events-none opacity-0'
        )}
        src={desktopPoster}
        alt='Hero Video Poster'
        fill
        desktopSize='100vw'
        mobileSize='100vw'
        priority
      />
    </div>
  )
}

export { HeroVideo }
