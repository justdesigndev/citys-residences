"use client"

import { EmblaCarousel } from "@/components/utility/embla-carousel"

export interface ImageSliderProps {
  items: React.ReactNode[]
}

export function ImageSlider({ items }: ImageSliderProps) {
  return (
    <div className="z-[100] w-screen">
      <EmblaCarousel slides={items} options={{ duration: 35, loop: true, align: "start" }} slideWidth="80%" />
    </div>
  )
}
