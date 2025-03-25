"use client"

import s from "./masked-parallax-image-section.module.css"

import cn from "clsx"

import { AnimatedButton } from "@/components/animated-button"
import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { Link } from "@/components/utility/link"
import { breakpoints } from "@/styles/config.mjs"

export interface MaskedParallaxImageSectionProps {
  horizontalAlignment?: "rtl" | "ltr"
  text: string
  imgSrc: string
  link?: {
    url: string
    text: string
  }
}

export function MaskedParallaxImageSection({
  horizontalAlignment = "ltr",
  text,
  imgSrc,
  link,
}: MaskedParallaxImageSectionProps) {
  return (
    <div className="px-4 bt:px-10">
      <div className="flex flex-col-reverse bt:grid bt:grid-cols-24 bt:items-center gap-4 bt:gap-0">
        <div
          className={cn(
            "gsap-parallax-text col-span-7 flex flex-col gap-12",
            horizontalAlignment === "ltr" ? "col-start-1 order-2 bt:order-1" : "col-start-[18] order-1 bt:order-2"
          )}
        >
          <div className={s.text}>
            <p className="hidden bt:block">
              <TextRevealOnScroll splitBy="lines" textAlign="left" staggerDuration={0.0075}>
                {text}
              </TextRevealOnScroll>
            </p>
            <p className="block bt:hidden">
              <TextRevealOnScroll splitBy="lines" textAlign="center" staggerDuration={0.0075}>
                {text}
              </TextRevealOnScroll>
            </p>
          </div>
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
          <MaskedParallaxImage
            imgSrc={imgSrc}
            sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 80vw, 80vw`}
          />
        </div>
      </div>
    </div>
  )
}
