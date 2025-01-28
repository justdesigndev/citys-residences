"use client"

import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap"
import React, { useRef } from "react"
import { useWindowSize } from "@darkroom.engineering/hamo"

interface ScaleOutProps {
  children: React.ReactNode
}

export function ScaleOut({ children }: ScaleOutProps) {
  const windowSize = useWindowSize(0.5)
  const scaleOutRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      if (ScrollTrigger.isTouch || !scaleOutRef.current) {
        return
      }

      const scaleOut = scaleOutRef.current

      const tl = gsap.timeline({
        paused: true,
      })

      tl.fromTo(
        ".gsap-scale-out-inner",
        {
          yPercent: 0,
        },
        {
          yPercent: -50,
          opacity: 0.75,
        }
      )

      ScrollTrigger.create({
        animation: tl,
        id: `scale-out`,
        trigger: scaleOut,
        start: () => `bottom top+=${scaleOut.getBoundingClientRect().height + scaleOut.getBoundingClientRect().top}px`,
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
      })
    },
    {
      dependencies: [windowSize],
      revertOnUpdate: true,
    }
  )

  return (
    <div ref={scaleOutRef} className="gsap-scale-out">
      <div className="gsap-scale-out-inner">{children}</div>
    </div>
  )
}
