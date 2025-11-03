'use client'

import { useEffect } from 'react'
import { useIntersectionObserver } from 'hamo'

interface VimeoPlayerProps {
  src: string
  className?: string
  poster?: string
  onLoadedData?: () => void
}

export function VimeoPlayer({
  src,
  className = '',
  poster,
  onLoadedData,
}: VimeoPlayerProps) {
  // Intersection observer to play/pause video based on visibility
  const [intersectionRef, entry] = useIntersectionObserver({
    threshold: 0.5, // Video needs to be at least 50% visible
  })

  // Initial autoplay on mount/load
  useEffect(() => {
    const video = entry?.target as HTMLVideoElement | undefined
    if (!video) return

    // Force play on mount (some browsers need this)
    const attemptPlay = async () => {
      try {
        await video.play()
      } catch (error) {
        console.log('Autoplay prevented:', error)
        // Autoplay was prevented, user interaction needed
      }
    }

    // Attempt to play when loaded
    if (video.readyState >= 3) {
      attemptPlay()
    }

    const handleLoadedData = () => {
      attemptPlay()
      onLoadedData?.()
    }

    video.addEventListener('loadeddata', handleLoadedData)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [entry?.target, onLoadedData])

  // Handle play/pause based on intersection (but don't interfere with initial load)
  useEffect(() => {
    const video = entry?.target as HTMLVideoElement | undefined
    if (!video || !entry) return

    // Only manage visibility-based play/pause after initial load
    if (video.readyState < 3) return

    if (entry.isIntersecting) {
      // Play video when intersecting
      video.play().catch(error => {
        console.log('Play prevented:', error)
      })
    } else {
      // Pause video when not intersecting
      video.pause()
    }
  }, [entry])

  return (
    <video
      ref={intersectionRef}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload='auto'
      disablePictureInPicture
      controlsList='nodownload nofullscreen noremoteplayback'
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}
    />
  )
}
