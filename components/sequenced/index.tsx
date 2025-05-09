"use client"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

import { TextRevealOnScroll } from "@/components/animations/text-reveal-on-scroll"
import { ScrollTrigger, useGSAP } from "@/components/gsap"
import { Img } from "@/components/utility/img"

const Sequenced = () => {
  const ref = useRef(null)
  const [phase, setPhase] = useState(0)

  useGSAP(
    () => {
      function setImgRecursively(progress: number, items: NodeListOf<Element>, currentIndex: number) {
        const part = 1 / items.length

        if (currentIndex === items.length) {
          return
        }

        if (progress < part * (currentIndex + 1)) {
          setPhase(currentIndex)
        } else {
          setImgRecursively(progress, items, currentIndex + 1)
        }
      }

      ScrollTrigger.create({
        scrub: true,
        start: "center center",
        end: "bottom+=1750px bottom",
        pin: true,
        trigger: ".gsap-sequence",
        onUpdate: ({ progress }) => {
          setImgRecursively(progress, document.querySelectorAll(".gsap-sequence-item"), phase)
        },
        refreshPriority: 200,
      })
    },
    {
      scope: ref,
    }
  )

  return (
    <div ref={ref}>
      <div
        className={cn(
          "gsap-sequence",
          "relative h-[60vh] bt:h-[60vh] bd:h-screen w-screen overflow-hidden pointer-events-none"
        )}
      >
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center max-w-xl mx-auto">
          <h2 className="font-montserrat font-normal text-bricky-brick text-4xl bt:text-7xl bd:text-6xl mb-5 bt:mb-10 text-center">
            <TextRevealOnScroll
              elementLevelClassName="leading-relaxed text-center"
              splitBy="lines"
              textAlign="left"
              staggerDuration={0.005}
            >
              YAŞAMA ALAN AÇAN DETAYLAR
            </TextRevealOnScroll>
          </h2>
          <p className="font-halenoir text-md bt:text-4xl bd:text-2xl font-bold mb-4">
            <TextRevealOnScroll
              elementLevelClassName="leading-relaxed"
              splitBy="lines"
              textAlign="left"
              staggerDuration={0.005}
            >
              Her metrekaresi ince tasarlanmış, ferah bir hayata açılan çizgiler
            </TextRevealOnScroll>
          </p>
          <p className="font-halenoir text-md bt:text-4xl bd:text-xl font-normal">
            <TextRevealOnScroll
              elementLevelClassName="leading-relaxed"
              splitBy="lines"
              textAlign="left"
              staggerDuration={0.005}
            >
              Günlük alışkanlıklardan uzun vadeli konfora kadar her detay, yaşamın doğal akışına uyum sağlayacak şekilde
              tasarlandı.
            </TextRevealOnScroll>
          </p>
        </div>
        {Array.from({ length: 24 }).map((_, i) => {
          return (
            <div
              className={cn(
                "gsap-sequence-item",
                "absolute top-1/2 right-0 translate-x-20 -translate-y-1/2 h-screen w-9/12 scale-125 bt:scale-100",
                "opacity-0",
                {
                  "opacity-100": phase === i,
                }
              )}
              key={i}
            >
              <Img
                className="w-full h-full object-contain"
                src={`/img/residences/3d/${String(i + 1).padStart(2, "0")}.png`}
                alt="Residence 3D View"
                fill
                priority={true}
                sizes="80vw"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { Sequenced }
