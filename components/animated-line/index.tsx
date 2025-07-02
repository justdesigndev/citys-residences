"use client"

import { gsap, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useRef } from "react"

export interface AnimatedLineProps {
  direction: "horizontal" | "vertical"
}

export function AnimatedLine({ direction }: AnimatedLineProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const bar = ref.current?.querySelector(".bar") as HTMLDivElement
      if (!bar) return
      gsap.to(bar, {
        opacity: 1,
        duration: 2,
        ease: "expo.out",
        ...(direction === "horizontal" ? { scaleX: 1 } : { scaleY: 1 }),
        scrollTrigger: {
          trigger: ref.current,
          start: "center center",
        },
      })
    },
    {
      scope: ref,
      dependencies: [direction],
    }
  )

  return (
    <div className={cn("relative", direction === "horizontal" ? "h-px w-full" : "h-full w-px")} ref={ref}>
      <div
        className={cn("bar h-full w-full bg-black opacity-0", direction === "horizontal" ? "scale-x-0" : "scale-y-0")}
        style={{ transformOrigin: direction === "horizontal" ? "left center" : "top center" }}
      ></div>
    </div>
  )
}
