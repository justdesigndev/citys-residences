'use client'

import MuxPlayer, { MuxPlayerRefAttributes } from '@mux/mux-player-react'

import { useIntersectionObserver } from 'hamo'
import {
  useCallback,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
} from 'react'

type MuxPlayerLazyProps = ComponentPropsWithoutRef<typeof MuxPlayer>

interface AutoplayVideoProps extends MuxPlayerLazyProps {
  intersectionThreshold?: number
  className?: string
}

export function AutoplayVideo({
  intersectionThreshold = 0,
  className,
  ...props
}: AutoplayVideoProps) {
  const playerRef = useRef<MuxPlayerRefAttributes | null>(null)
  const [setIntersectionRef, entry] = useIntersectionObserver({
    root: null,
    rootMargin: '200px 0px 200px 0px',
    threshold: intersectionThreshold,
  })

  const setPlayerRef = useCallback(
    (node: MuxPlayerRefAttributes | null) => {
      playerRef.current = node
      setIntersectionRef(node ?? undefined)
    },
    [setIntersectionRef]
  )

  useEffect(() => {
    const playerEl = playerRef.current
    if (!playerEl) {
      return
    }

    if (entry?.isIntersecting) {
      playerEl.play().catch(() => undefined)
      return
    }

    playerEl.pause()
  }, [entry])

  return (
    <MuxPlayer
      className={className}
      ref={setPlayerRef}
      muted
      loop
      playsInline
      streamType='on-demand'
      {...props}
    />
  )
}
