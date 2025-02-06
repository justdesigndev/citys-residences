"use client"

import { useGSAP } from "@gsap/react"
import cn from "clsx"
import Image from "next/image"
import { useRef } from "react"
import { gsap, ScrollTrigger } from "@/components/gsap"

export interface MPImgProps {
  imgSrc: string
}

export function MPImg(props: MPImgProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true })

      tl.fromTo(
        ".gsap-parallax-img-c",
        {
          yPercent: -10,
        },
        {
          yPercent: 10,
        },
        "s"
      )
        .fromTo(
          ".gsap-parallax-img",
          {
            yPercent: -20,
          },
          {
            yPercent: 20,
          },
          "s"
        )
        .from(
          ".gsap-parallax-img",
          {
            opacity: 0,
            duration: 0.25,
          },
          "s"
        )

      ScrollTrigger.create({
        animation: tl,
        trigger: ref.current,
        // markers: true,
        scrub: true,
      })
    },
    {
      scope: ref,
    }
  )

  return (
    <div className="w-3/4 aspect-square" ref={ref}>
      <div className={cn("gsap-parallax-img-c relative overflow-hidden rounded-lg w-full h-full")}>
        <div className="absolute top-0 left-0 right-0 bottom-0 gsap-overlay z-10 bg-bricky-brick"></div>
        <Image
          src={props.imgSrc}
          alt="Parallax Image"
          fill
          className="object-cover gsap-parallax-img mix-blend-overlay z-20"
        />
        <Image src={props.imgSrc} alt="Parallax Image" fill className="object-cover gsap-parallax-img z-30" />
      </div>
    </div>
  )
}
