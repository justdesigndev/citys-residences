"use client"

import { cn } from "@/lib/utils"

import { ScaleOut } from "@/components/animations/scale-out"
import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { mainVideoDesktop } from "@/lib/constants"
import { ImagesSection } from "./images-section"

export default function Page() {
  const images = [
    {
      url: "/img/slides-3/1.jpg",
    },
    {
      url: "/img/slides-3/2.jpg",
    },
    {
      url: "/img/slides-3/3.jpg",
    },
    {
      url: "/img/slides-3/4.jpg",
    },
    {
      url: "/img/slides-3/5.jpg",
    },
    {
      url: "/img/slides-3/6.jpg",
    },
  ]

  return (
    <Wrapper>
      <section className={cn("h-[var(--svh-calc)] bg-bricky-brick relative z-10 overflow-hidden")}>
        <ScaleOut>
          <div className="h-full w-full">
            <Video
              primaryVideoUrl={mainVideoDesktop}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </ScaleOut>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50">
          <div className="container flex h-full">
            <h1 className="block font-lexend-giga text-white text-2xl bt:text-4xl font-medium mt-auto mb-20">
              <TextRevealOnScroll splitBy="characters" textAlign="left" staggerDuration={0.005}>
                CITY&apos;S PARK
              </TextRevealOnScroll>
            </h1>
          </div>
        </div>
      </section>
      <ImagesSection images={images} />
    </Wrapper>
  )
}
