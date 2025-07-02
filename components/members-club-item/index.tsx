"use client"

import { cn } from "@/lib/utils"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { motion } from "motion/react"

import { AnimatedLine } from "@/components/animated-line"
import { GsapSplitText } from "@/components/gsap-split-text"
import { Img } from "@/components/utility/img"
import { useEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger, useGSAP } from "../gsap"

interface MembersClubItemProps {
  item: {
    title: string
    subtitle?: string
    description: string
    url: string[]
  }
  align?: "ltr" | "rtl"
}

export function MembersClubItem({ item, align = "ltr" }: MembersClubItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoplaying, setIsAutoplaying] = useState(false)

  // Store the length in a ref to avoid dependency issues
  const urlLengthRef = useRef(item.url.length)
  urlLengthRef.current = item.url.length

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    // Autoplay only if there's more than one slide in the effective loop
    if (isAutoplaying && urlLengthRef.current > 1) {
      intervalId = setInterval(() => {
        setActiveIndex((prevActiveIndex) => {
          let nextIndex = prevActiveIndex + 1
          if (nextIndex >= urlLengthRef.current) {
            nextIndex = 0 // Loop to the first slide
          }
          return nextIndex
        })
      }, 4000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isAutoplaying]) // Only depend on isAutoplaying

  // ScrollTrigger for viewport-based autoplay control
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      if (!item.url || item.url.length === 0) return

      const scrollTrigger = ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => setIsAutoplaying(true),
        onLeave: () => setIsAutoplaying(false),
        onEnterBack: () => setIsAutoplaying(true),
        onLeaveBack: () => setIsAutoplaying(false),
        // markers: true, // For debugging
      })

      return () => {
        scrollTrigger.kill()
      }
    },
    { scope: ref }
  )

  const goToIndex = (targetIndex: number) => {
    setIsAutoplaying(false)
    let newIndex = targetIndex

    if (item.url.length > 0) {
      if (newIndex < 0) {
        newIndex = item.url.length - 1
      } else if (newIndex >= item.url.length) {
        newIndex = 0
      }
    } else {
      newIndex = 0
    }

    setActiveIndex(newIndex)
  }

  return (
    <div className="gsap-global-fade-in" ref={ref}>
      <div
        className={cn("flex gap-8 h-[80vh] py-8 section-container", align === "ltr" ? "flex-row" : "flex-row-reverse")}
      >
        <div className="flex flex-col items-start justify-center w-3/12 pr-10">
          <h3 className="font-suisse-intl font-medium text-bricky-brick text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl mb-4">
            <GsapSplitText stagger={0.1} splitBy="lines" duration={0.5}>
              {item.title}
            </GsapSplitText>
          </h3>
          <p className="font-suisse-intl font-semibold text-base lg:text-lg xl:text-base 2xl:text-lg text-black">
            <GsapSplitText stagger={0.1} splitBy="lines" duration={0.5}>
              {item.subtitle}
            </GsapSplitText>
          </p>
          <p className="font-suisse-intl font-normal text-base lg:text-lg xl:text-base 2xl:text-lg text-black">
            <GsapSplitText stagger={0.1} splitBy="lines" duration={0.5}>
              {item.description}
            </GsapSplitText>
          </p>
        </div>
        <AnimatedLine direction="vertical" />
        <div className="flex flex-col w-9/12 relative flex-1">
          {item.url.map((image, imageIndex) => (
            <motion.div
              key={imageIndex}
              initial={{ opacity: 0 }}
              animate={{
                opacity: imageIndex === activeIndex ? 1 : 0,
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
              className="absolute left-0 top-0 w-full h-full overflow-hidden"
              style={{ zIndex: imageIndex === activeIndex ? 2 : 1 }}
            >
              <div className="absolute top-0 left-0 w-full h-full">
                <Img src={image} alt="Members Club" fill sizes="100vw" className="object-cover" />
              </div>
            </motion.div>
          ))}
          {item.url.length > 1 && (
            <>
              <div
                className="absolute top-1/2 -translate-y-1/2 left-1.5 lg:left-4 cursor-pointer blur-bg-white p-2 lg:p-4 rounded-full border border-black z-10"
                onClick={() => goToIndex(activeIndex - 1)}
              >
                <ArrowLeftIcon className="w-4 h-4 lg:w-6 lg:h-6" />
              </div>
              <div
                className="absolute top-1/2 -translate-y-1/2 right-1.5 lg:right-4 cursor-pointer blur-bg-white p-2 lg:p-4 rounded-full border border-black z-10"
                onClick={() => goToIndex(activeIndex + 1)}
              >
                <ArrowRightIcon className="w-4 h-4 lg:w-6 lg:h-6" />
              </div>
            </>
          )}
        </div>
      </div>
      <AnimatedLine direction="horizontal" />
    </div>
  )
}
