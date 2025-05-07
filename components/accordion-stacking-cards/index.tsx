"use client"

import { ScrollTrigger, gsap, useGSAP } from "@/components/gsap"
import { cn } from "@/lib/utils"
import { useRef } from "react"

import { Img } from "@/components/utility/img"

export interface AccordionStackingCardsProps {
  title: string
  items: {
    title: string
    subtitle: string
    description: string
  }[]
  images: {
    url: string
  }[]
  reverse?: boolean
}

export function AccordionStackingCards({ title, items, images, reverse = false }: AccordionStackingCardsProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()
      const tlText = gsap.timeline()

      const images: HTMLElement[] = gsap.utils.toArray(ref.current?.querySelectorAll(`.gsap-stacking-card-image`) ?? [])

      images.forEach((image, imageIndex) => {
        if (imageIndex === 0) return

        gsap.set(image, {
          yPercent: imageIndex === 0 ? 0 : 100,
        })

        gsap.set(image.querySelector(".gsap-image") as HTMLElement, {
          scale: 1.5,
        })
      })

      images.forEach((image, imageIndex) => {
        if (imageIndex === 0) return

        // const prevImage = images[imageIndex - 1] as HTMLElement

        tl.to(
          image,
          {
            duration: 1,
            yPercent: 0,
          },
          `s-${imageIndex}`
        ).to(
          image.querySelector(".gsap-image") as HTMLElement,
          {
            duration: 1,
            scale: 1,
          },
          `s-${imageIndex}`
        )
        // .to(
        //   prevImage,
        //   {
        //     duration: 1,
        //     yPercent: -50,
        //     delay: -1,
        //   },
        //   `ss-${imageIndex}`
        // )
      })

      items.forEach((_, index) => {
        if (index === 0) {
          // First item starts visible, no initial animation needed
          return
        } else if (index === items.length - 1) {
          // Last item only needs to fade in
          tlText
            .fromTo(`.gsap-stacking-card-text-${index - 1}`, { opacity: 1 }, { opacity: 0, duration: 0.5 })
            .fromTo(`.gsap-stacking-card-text-${index}`, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        } else {
          // Middle items need both fade out of previous and fade in of current
          tlText
            .fromTo(`.gsap-stacking-card-text-${index - 1}`, { opacity: 1 }, { opacity: 0, duration: 0.5 })
            .fromTo(`.gsap-stacking-card-text-${index}`, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        }
      })

      const masterTl = gsap.timeline()
      masterTl.add(tl, 0).add(tlText, 0)

      ScrollTrigger.create({
        animation: masterTl,
        trigger: ref.current,
        pin: true,
        scrub: 1,
        end: `+=${items.length * 1000}px`,
        start: "center center",
      })
    },
    {
      scope: ref,
    }
  )

  return (
    <div className="w-full h-[80vh]" ref={ref}>
      <div className="gsap-stacking-cards-container h-full relative">
        <h2 className="absolute top-0 left-0 font-montserrat text-3xl bt:text-4xl bd:text-5xl font-medium text-bricky-brick max-w-lg bd:leading-tight">
          {title}
        </h2>
        <div className={cn("absolute top-0 left-0 w-full h-full flex gap-10")}>
          <div className={cn("relative basis-4/12", reverse && "order-last")}>
            {items.map((item, itemIndex) => (
              <div
                className={cn(
                  `gsap-stacking-card-text-${itemIndex} absolute top-0 left-0 w-full h-full flex flex-col items-start justify-start pt-96`
                )}
                key={itemIndex}
              >
                <h3 className="font-montserrat text-3xl bt:text-4xl bd:text-3xl font-medium text-bricky-brick mb-8">
                  {item.title}
                </h3>
                <div className="pr-16">
                  <p className="font-montserrat text-base bt:text-lg bd:text-xl font-bold text-black">
                    {item.subtitle}
                  </p>
                  <p className="font-montserrat text-base bt:text-lg bd:text-xl font-normal text-black">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className={cn("relative overflow-hidden basis-8/12")}>
            {images.map((image, imageIndex) => (
              <div
                key={imageIndex}
                className={cn(
                  "gsap-stacking-card-image",
                  "absolute left-1/2 -translate-x-1/2 w-full h-full overflow-hidden"
                )}
              >
                <div className="gsap-image absolute top-0 left-0 w-full h-full">
                  <Img src={image.url} alt="Members Club" fill sizes="100vw" className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
