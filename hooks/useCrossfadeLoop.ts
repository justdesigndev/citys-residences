import { useCallback, useEffect, useRef } from 'react'

const FADE_MS = 400
// Start the dissolve this long before the end of the clip
const LEAD_S = 0.55
// Ensure the standby element has data this long before the end
const PREPARE_S = 1.6

type UseCrossfadeLoopResult = {
  primaryRef: React.MutableRefObject<HTMLVideoElement | null>
  secondaryRef: React.MutableRefObject<HTMLVideoElement | null>
  /** Play the currently visible element (autoplay/viewport logic) */
  playActive: () => void
  /** Pause both elements (leave viewport, dialog open, …) */
  pauseAll: () => void
  /** Kick load() on both elements (lazy-load entry point) */
  loadAll: () => void
  /** The currently visible element, e.g. for paused checks */
  getActive: () => HTMLVideoElement | null
}

/**
 * Seamless-feeling looping for muted autoplay videos.
 *
 * Safari stalls ~0.5-0.8s on every loop restart (measured: the decode
 * pipeline is slow to resume after any seek-to-start, regardless of
 * technique), and the clips end on a hard cut, so native looping reads as
 * "the video freezes when it restarts". Instead of one looping element we
 * run two stacked elements with the same source and dissolve between them
 * across the loop point: the next cycle starts playing behind a ~400ms
 * crossfade while the old cycle's final motion is still on screen, hiding
 * both the cut and the restart latency.
 *
 * Degrades to exactly the old behavior: both elements keep the native
 * `loop` attribute, and a swap is only attempted when the standby element
 * has buffered data and actually starts playing — any failure (autoplay
 * denied, no data yet, throttled timers in background tabs) simply lets
 * the active element wrap natively like today.
 */
export function useCrossfadeLoop(): UseCrossfadeLoopResult {
  const primaryRef = useRef<HTMLVideoElement | null>(null)
  const secondaryRef = useRef<HTMLVideoElement | null>(null)
  const activeIsPrimaryRef = useRef(true)
  const swappingRef = useRef(false)

  const getActive = useCallback(
    () => (activeIsPrimaryRef.current ? primaryRef : secondaryRef).current,
    []
  )
  const getStandby = useCallback(
    () => (activeIsPrimaryRef.current ? secondaryRef : primaryRef).current,
    []
  )

  const playActive = useCallback(() => {
    getActive()
      ?.play()
      .catch(() => {})
  }, [getActive])

  const pauseAll = useCallback(() => {
    primaryRef.current?.pause()
    secondaryRef.current?.pause()
  }, [])

  const loadAll = useCallback(() => {
    primaryRef.current?.load()
    secondaryRef.current?.load()
  }, [])

  useEffect(() => {
    // Initial layering: primary visible, secondary hidden
    if (primaryRef.current) primaryRef.current.style.opacity = '1'
    if (secondaryRef.current) secondaryRef.current.style.opacity = '0'

    const tick = () => {
      const active = getActive()
      const standby = getStandby()
      if (!active || !standby || swappingRef.current) return
      if (active.paused || !active.duration || !isFinite(active.duration)) {
        return
      }
      // Clips too short for a lead window keep native looping
      if (active.duration < PREPARE_S + 1) return

      const remaining = active.duration - active.currentTime

      // Warm the standby ahead of the loop point: make sure it has data
      // and sits at the start, paused
      if (remaining < PREPARE_S && remaining > LEAD_S) {
        if (standby.readyState === 0) {
          standby.load()
        } else if (standby.readyState >= 2 && standby.currentTime > 0.05) {
          try {
            standby.currentTime = 0.001
          } catch {
            /* not seekable yet */
          }
        }
        return
      }

      // Dissolve across the loop point
      if (remaining <= LEAD_S && standby.readyState >= 2) {
        swappingRef.current = true
        const oldActive = active
        const newActive = standby

        newActive.play().catch(() => {})
        requestAnimationFrame(() => {
          newActive.style.opacity = '1'
          oldActive.style.opacity = '0'
        })
        activeIsPrimaryRef.current = !activeIsPrimaryRef.current

        window.setTimeout(() => {
          if (newActive.paused && !oldActive.paused) {
            // The standby never started (e.g. autoplay denied): revert and
            // let the old element's native loop carry on as before
            activeIsPrimaryRef.current = !activeIsPrimaryRef.current
            oldActive.style.opacity = '1'
            newActive.style.opacity = '0'
          } else {
            // Park the old element at the start, ready to be next standby
            oldActive.pause()
            try {
              oldActive.currentTime = 0.001
            } catch {
              /* ignore */
            }
          }
          swappingRef.current = false
        }, FADE_MS + 300)
      }
    }

    const interval = window.setInterval(tick, 60)
    return () => window.clearInterval(interval)
  }, [getActive, getStandby])

  return { primaryRef, secondaryRef, playActive, pauseAll, loadAll, getActive }
}

export const CROSSFADE_FADE_MS = FADE_MS
