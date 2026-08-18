import { useEffect, useState } from 'react'

/**
 * Returns false during the initial page-load window and flips to true after
 * `delay` ms. Below-the-fold media uses this to stay out of the critical
 * startup path (hero video + first paint) and then warm itself in the
 * background, so fast scrolling finds thumbnails already loaded — the feel
 * the site always had, previously provided by accident because Safari's
 * startup freeze gave the network a ~30s head start before scrolling worked.
 */
export function useStartupSettled(delay = 3000) {
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setSettled(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return settled
}
