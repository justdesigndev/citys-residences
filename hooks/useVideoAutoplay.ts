import { useCallback, useEffect, useRef, useState } from 'react'

type UseVideoAutoplayProps = {
  videoRef: React.RefObject<HTMLVideoElement | null>
  dependencies?: unknown[]
}

export const useVideoAutoplay = ({
  videoRef,
  dependencies = [],
}: UseVideoAutoplayProps) => {
  const [hasPlayed, setHasPlayed] = useState(false)
  const prevDepsRef = useRef<unknown[] | null>(null)

  const attemptPlay = useCallback(
    (reason: string = 'manual') => {
      const video = videoRef.current
      if (!video) return

      // Safari: play() on an element with no data (readyState 0) while its
      // load is being (re)started can wedge WebKit's media pipeline for ~30s,
      // freezing rAF and with it Lenis/GSAP/ScrollTrigger. Native `autoplay`
      // covers the initial start; only rescue once data exists, except for
      // explicit user gestures which are always safe.
      if (video.readyState === 0 && reason !== 'user-interaction') return
      if (!video.paused) return

      if (!video.muted) {
        video.muted = true
      }

      const playPromise = video.play()

      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => setHasPlayed(true))
          .catch(error => {
            // Only log if it's not an AbortError (common when loading)
            if (error.name !== 'AbortError') {
              console.debug(
                `[video-autoplay] autoplay blocked (${reason})`,
                error
              )
            }
          })
      } else {
        setHasPlayed(true)
      }
    },
    [videoRef]
  )

  // Reload only when the sources actually change after the initial mount.
  // The initial load is already driven by `preload`/`autoplay` in the SSR
  // HTML; calling load() over it aborts Safari's in-flight fetch and stalls
  // playback for tens of seconds.
  useEffect(() => {
    const prev = prevDepsRef.current
    prevDepsRef.current = dependencies

    // Initial mount, or re-run with identical sources (e.g. React StrictMode
    // double-effects): nothing to reload.
    if (prev === null) return
    const changed =
      prev.length !== dependencies.length ||
      dependencies.some((dep, i) => !Object.is(dep, prev[i]))
    if (!changed) return

    const video = videoRef.current
    if (!video) return

    setHasPlayed(false)
    video.load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef, ...dependencies])

  // Core video event handling
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setHasPlayed(true)
    const handleCanPlay = () => attemptPlay('canplay')
    const handleLoadedData = () => attemptPlay('loadeddata')

    video.addEventListener('play', handlePlay)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', handleLoadedData)

    if (!video.paused) {
      setHasPlayed(true)
    } else if (video.readyState >= 2) {
      attemptPlay('initial-readyState')
    }

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [videoRef, attemptPlay])

  // Retry when the tab becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        attemptPlay('visibilitychange')
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [attemptPlay])

  // User interaction fallback (covers autoplay-blocked cases, e.g. Low Power Mode)
  useEffect(() => {
    const events: Array<keyof DocumentEventMap> = [
      'pointerdown',
      'touchstart',
      'keydown',
    ]
    const handleUserInteraction = () => {
      attemptPlay('user-interaction')
    }

    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, {
        once: true,
        passive: true,
      })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction)
      })
    }
  }, [attemptPlay])

  return { hasPlayed, attemptPlay }
}
