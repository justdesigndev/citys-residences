"use client"

import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useWindowSize } from "@darkroom.engineering/hamo"
import { useGSAP } from "@gsap/react"
import React, { useRef } from "react"

interface ScaleInProps {
  children: React.ReactNode
}

export function ScaleIn({ children }: ScaleInProps) {
  const windowSize = useWindowSize(0.5)
  const scaleInRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (ScrollTrigger.isTouch || !scaleInRef.current) {
        return
      }

      const tl = gsap.timeline({
        paused: true,
      })

      tl.from(".gsap-scale-in-inner", {
        scale: 1,
      })

      ScrollTrigger.create({
        animation: tl,
        id: `scale-in`,
        trigger: scaleInRef.current,
        start: "top bottom",
        end: "top top",
        scrub: true,
      })
    },
    {
      dependencies: [windowSize],
      revertOnUpdate: true,
    }
  )

  return (
    <div ref={scaleInRef} className="gsap-scale-in">
      <div className="gsap-scale-in-inner">{children}</div>
    </div>
  )
}
