"use client"

import s from "./horizontal-scroll.module.css"

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap"
import cn from "clsx"
import Image from "next/image"
import { useRef } from "react"

export function HorizontalScroll() {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const sections = gsap.utils.toArray(`.${s.panel}`)

      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none", // <-- IMPORTANT!
        scrollTrigger: {
          trigger: `.${s.container}`,
          pin: true,
          scrub: true,
          end: "+=5000",
        },
      })

      ScrollTrigger.defaults({ markers: { startColor: "white", endColor: "white" } })

      // const textWrappers = gsap.utils.toArray(`.text`) as HTMLElement[]
      // const texts = gsap.utils.toArray(`.t`) as HTMLElement[]

      const imageWrappers = gsap.utils.toArray(`.bg-image`) as HTMLElement[]
      const images = gsap.utils.toArray(`.img`) as HTMLElement[]

      // Create parallax effect for all images
      images.forEach((image, index) => {
        const isFirst = index === 0
        const isLast = index === images.length - 1

        gsap.fromTo(
          image,
          {
            xPercent: isFirst ? 0 : -30,
            ease: "none",
          },
          {
            xPercent: isLast ? 0 : 30,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrappers[index],
              containerAnimation: scrollTween,
              scrub: true,
            },
          }
        )
      })

      // texts.forEach((text, index) => {
      //   if (index === 0) return

      //   gsap.set(text, { y: -300 })
      // })

      // texts.forEach((text, index) => {
      //   if (index === 0) return

      //   gsap.to(text, {
      //     y: 0,
      //     ease: "none",
      //     scrollTrigger: {
      //       trigger: textWrappers[index - 1],
      //       containerAnimation: scrollTween,
      //       scrub: true,
      //     },
      //   })
      // })

      // green section
      // ScrollTrigger.create({
      //   trigger: `.${s.green}`,
      //   containerAnimation: scrollTween,
      //   start: "center 65%",
      //   end: "center 51%",
      //   onEnter: () => console.log("enter"),
      //   onLeave: () => console.log("leave"),
      //   onEnterBack: () => console.log("enterBack"),
      //   onLeaveBack: () => console.log("leaveBack"),
      //   onToggle: (self) => console.log("active", self.isActive),
      //   id: "4",
      // })

      // only show the relevant section's markers at any given time
      gsap.set(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end", {
        autoAlpha: 0,
      })

      Array.from(["blue", "red", "gray", "purple"]).forEach((triggerClass, i) => {
        ScrollTrigger.create({
          trigger: `.${triggerClass}`,
          containerAnimation: scrollTween,
          start: "left 30%",
          end: i === 3 ? "right right" : "right 30%",
          markers: false,
          onToggle: (self) => gsap.to(`.marker-${i + 1}`, { duration: 0.25, autoAlpha: self.isActive ? 1 : 0 }),
        })
      })

      // helper function for causing the sections to always snap in the direction of the scroll (next section) rather than whichever section is "closest" when scrolling stops.
      // function directionalSnap(increment: number) {
      //   const snapFunc = gsap.utils.snap(increment)
      //   return (raw: number, self: any) => {
      //     const n = snapFunc(raw)
      //     return Math.abs(n - raw) < 1e-4 || n < raw === self.direction < 0
      //       ? n
      //       : self.direction < 0
      //       ? n - increment
      //       : n + increment
      //   }
      // }
    },
    {
      scope: ref,
    }
  )

  return (
    <div ref={ref}>
      <div className={s.container}>
        <div className={cn(s.frame)}>
          <div className={cn(s.text, s.text1, "text text-1 overflow-hidden")}>
            <div className="t">DAHA ÇOK YAŞA</div>
          </div>
          <div className={s.infoCard}>
            <p className={s.infoText}>
              Lorem ipsum dolor sit amet, consectetuer adipLorem ipsum dolor sit amet, consectetuer adip.
            </p>
          </div>
        </div>
        <section className={cn(s.panel, s.blue, "blue")}>
          <div className={cn(s.bgImage, "bg-image")}>
            <Image
              src="/img/horizontal-scroll/1.jpg"
              alt="Aerial view of City's Residences"
              fill
              className={cn(s.img, "img object-cover")}
              priority
              sizes="100vw"
            />
          </div>
        </section>
        <section className={cn(s.panel, s.red, "red")}>
          <div className={cn(s.bgImage, "bg-image")}>
            <Image
              src="/img/horizontal-scroll/2.jpg"
              alt="Aerial view of City's Residences"
              fill
              className={cn(s.img, "img object-cover")}
              priority
              sizes="100vw"
            />
          </div>
        </section>
        <section className={cn(s.panel, s.gray, "gray")}>
          <div className={cn(s.bgImage, "bg-image")}>
            <Image
              src="/img/horizontal-scroll/3.jpg"
              alt="Aerial view of City's Residences"
              fill
              className={cn(s.img, "img object-cover")}
              priority
              sizes="100vw"
            />
          </div>
        </section>
        <section className={cn(s.panel, s.purple, "purple")}>
          <div className={cn(s.bgImage, "bg-image")}>
            <Image
              src="/img/horizontal-scroll/4.jpg"
              alt="Aerial view of City's Residences"
              fill
              className={cn(s.img, "img object-cover")}
              priority
              sizes="100vw"
            />
          </div>
        </section>
      </div>
    </div>
  )
}
