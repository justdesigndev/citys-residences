"use client"

import { useLenis } from "lenis/react"
import { gsap } from "../gsap"

export function ScrollToTop() {
  const lenis = useLenis()

  const handleScrollToTop = () => {
    gsap.to("body", {
      opacity: 0,
      onComplete: () => {
        lenis?.scrollTo(0, { immediate: true })
        gsap.to("body", {
          opacity: 1,
          delay: 0.2,
        })
      },
    })
  }
  return (
    <div
      onClick={handleScrollToTop}
      className="absolute top-4 right-4 font-halenoir font-bold text-sm bg-white text-black px-4 py-2 rounded-full cursor-pointer flex items-center justify-center"
    >
      SCROLL TO TOP
    </div>
  )
}
