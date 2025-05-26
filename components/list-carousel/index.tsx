"use client"

import { ScrollTrigger, useGSAP } from "@/components/gsap" // Removed gsap import
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { Img } from "@/components/utility/img"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

export interface ListCarouselProps {
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

export function ListCarousel({ title, items, images, reverse = false }: ListCarouselProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [currentItem, setCurrentItem] = useState(0)
  const [isAutoplaying, setIsAutoplaying] = useState(false) // Initialized to false

  useEffect(() => {
    // Animations based on currentItem (handled by framer-motion)
  }, [currentItem, items, images])

  // Autoplay interval useEffect
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (isAutoplaying && items.length > 0) {
      intervalId = setInterval(() => {
        setCurrentItem((prevCurrentItem) => {
          let nextItem = prevCurrentItem + 1
          if (nextItem >= items.length) {
            nextItem = 0 // Loop to the first item
          }
          return nextItem
        })
      }, 3000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isAutoplaying, items.length, setCurrentItem]) // Added setCurrentItem to dependencies

  // ScrollTrigger for viewport-based autoplay control
  useGSAP(
    () => {
      if (!items || items.length === 0) return

      const st = ScrollTrigger.create({
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
        st.kill() // Kill the specific ScrollTrigger instance
      }
    },
    { scope: ref, dependencies: [items, setIsAutoplaying] }
  )

  const handleItemClick = (clickedIndex: number) => {
    setIsAutoplaying(false)
    let newIndex = clickedIndex

    if (newIndex < 0) {
      newIndex = items.length - 1 // Loop to the last item
    } else if (newIndex >= items.length) {
      newIndex = 0 // Loop to the first item
    }

    setCurrentItem(newIndex)
  }

  return (
    <div className="w-full h-[80vh]" ref={ref}>
      <div className="gsap-stacking-cards-container h-full relative">
        <div className={cn("absolute top-0 left-0 w-full h-full flex gap-10 xl:gap-10 2xl:gap-10")}>
          <div className={cn("relative basis-4/12", reverse && "order-last")}>
            <h2 className="font-montserrat text-3xl lg:text-4xl xl:text-5xl font-medium text-bricky-brick">{title}</h2>
            <div className="flex flex-col items-start justify-start gap-2 pt-6">
              {items.map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  className={cn(
                    "whitespace-nowrap relative font-montserrat text-base lg:text-lg xl:text-sm 2xl:text-base text-black cursor-pointer"
                  )}
                  onClick={() => handleItemClick(itemIndex)}
                  animate={{
                    opacity: itemIndex === currentItem ? 1 : 0.5,
                    fontWeight: itemIndex === currentItem ? 700 : 400,
                    x: itemIndex === currentItem ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.title}
                </motion.div>
              ))}
            </div>
            <div className="relative mt-20">
              <AnimatePresence mode="wait">
                {items[currentItem] && (
                  <motion.div
                    key={`text-${currentItem}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-0 w-full"
                  >
                    <h3 className="font-montserrat text-3xl lg:text-4xl xl:text-3xl 2xl:text-4xl font-medium text-bricky-brick mb-8">
                      {items[currentItem].title}
                    </h3>
                    <div className="xl:pr-8 2xl:pr-16">
                      <p className="font-montserrat text-base lg:text-lg xl:text-lg 2xl:text-lg font-bold text-black">
                        {items[currentItem].subtitle}
                      </p>
                      <p className="font-montserrat text-base lg:text-lg xl:text-lg 2xl:text-lg font-normal text-black">
                        {items[currentItem].description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className={cn("relative overflow-hidden basis-8/12")}>
            <AnimatePresence mode="popLayout">
              {images[currentItem] && (
                <motion.div
                  key={currentItem}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-0 top-0 w-full h-full overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-full">
                    <Img src={images[currentItem].url} alt="Members Club" fill sizes="100vw" className="object-cover" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div
              className="absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer blur-bg-white p-4 rounded-full border-2 border-black"
              onClick={() => handleItemClick(currentItem - 1)}
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </div>
            <div
              className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer blur-bg-white p-4 rounded-full border-2 border-black"
              onClick={() => handleItemClick(currentItem + 1)}
            >
              <ArrowRightIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
