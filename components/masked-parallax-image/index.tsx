"use client"

import cn from "clsx"
import { useRef } from "react"

import { AnimatedButton } from "@/components/animated-button"
import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { MPImg } from "@/components/mp-img"
import { Link } from "@/components/utility/link"

export interface MaskedParallaxImageProps {
  horizontalAlignment?: "rtl" | "ltr"
  text: string
  imgSrc: string
  link?: {
    url: string
    text: string
  }
}

export function MaskedParallaxImage({ horizontalAlignment = "ltr", text, imgSrc, link }: MaskedParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  // const { width } = useWindowSize()

  // useGSAP(
  //   () => {
  //     if (!width) return
  //     if (width < breakpoints.breakpointMobile) return

  //     const tl = gsap.timeline({ paused: true })

  //     // tl.fromTo(
  //     //   ".gsap-parallax-text",
  //     //   {
  //     //     yPercent: 600,
  //     //   },
  //     //   {
  //     //     yPercent: 200,
  //     //   },
  //     //   "s"
  //     // )

  //     ScrollTrigger.create({
  //       animation: tl,
  //       trigger: ref.current,
  //       // markers: true,
  //       scrub: true,
  //     })
  //   },
  //   {
  //     scope: ref,
  //     dependencies: [width],
  //   }
  // )

  return (
    <div className="px-4 bt:px-10 py-4 bt:py-14 bd:py-28" ref={ref}>
      <div className={cn("flex flex-col-reverse bt:grid bt:grid-cols-24 bt:items-center gap-8 bt:gap-0")}>
        <div
          className={cn(
            "gsap-parallax-text col-span-7 flex flex-col gap-12",
            horizontalAlignment === "ltr" ? "col-start-1 order-2 bt:order-1" : "col-start-[18] order-1 bt:order-2"
          )}
        >
          <p className="hidden bt:block bt:text-2xl bd:text-3xl">
            <TextRevealOnScroll splitBy="lines" textAlign="left" staggerDuration={0.0075}>
              {text}
            </TextRevealOnScroll>
          </p>
          <p className="block bt:hidden">
            <TextRevealOnScroll splitBy="lines" textAlign="center" staggerDuration={0.0075}>
              {text}
            </TextRevealOnScroll>
          </p>
          {link && (
            <Link className="w-56" href={link.url}>
              <AnimatedButton text={link.text} size="lg" theme="tertiary" />
            </Link>
          )}
        </div>
        <div
          className={cn(
            "aspect-h-11 aspect-w-9 relative col-span-16 gsap-parallax-img-c",
            horizontalAlignment === "ltr" ? "col-start-9 order-2" : "col-start-1 order-1"
          )}
        >
          <MPImg imgSrc={imgSrc} />
        </div>
      </div>
    </div>
  )
}
