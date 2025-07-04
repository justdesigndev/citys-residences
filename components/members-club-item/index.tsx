"use client"

import { cn } from "@/lib/utils"
import { useRef } from "react"

import { AnimatedLine } from "@/components/animated-line"
import { GsapSplitText } from "@/components/gsap-split-text"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { EmblaCarousel } from "@/components/utility/embla-carousel"
import { breakpoints } from "@/styles/config.mjs"

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

  return (
    <div className="gsap-global-fade-in" ref={ref}>
      <div
        className={cn(
          "flex items-stretch gap-8 py-8 h-[80vh]",
          align === "ltr" ? "flex-row" : "flex-row-reverse",
          item.url.length > 1
            ? align === "rtl"
              ? "section-container-full-left"
              : "section-container-full-right"
            : "section-container"
        )}
      >
        <div className="flex flex-col items-start justify-center w-3/12 pr-6">
          <h3 className="font-primary font-medium text-bricky-brick text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl mb-4">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1}>
              {item.title}
            </GsapSplitText>
          </h3>
          <p className="font-primary font-bold text-base lg:text-lg xl:text-base 2xl:text-lg text-black">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1}>
              {item.subtitle}
            </GsapSplitText>
          </p>
          <p className="font-primary font-normal text-base lg:text-lg xl:text-base 2xl:text-lg text-black">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1}>
              {item.description}
            </GsapSplitText>
          </p>
        </div>
        <AnimatedLine direction="vertical" />
        <div className="flex flex-col w-9/12 relative flex-1 overflow-hidden">
          {/* {item.url.map((image, imageIndex) => (
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
                <MaskedParallaxImage
                  imgSrc={image}
                  sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 80vw, 80vw`}
                />
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
          )} */}
          {item.url.length > 1 ? (
            <EmblaCarousel
              autoplay={true}
              autoplayDelay={5000}
              slides={item.url.map((image, imageIndex) => (
                <div key={imageIndex} className="relative h-[80vh] w-[70vw]">
                  <MaskedParallaxImage
                    imgSrc={image}
                    sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 80vw, 80vw`}
                  />
                </div>
              ))}
              options={{ duration: 35, loop: true, align: align === "rtl" ? "end" : "start" }}
              slideWidth="60vw"
              slideSpacing="24px"
              parallax={true}
            />
          ) : (
            <div className="relative w-full h-[80vh]">
              <MaskedParallaxImage
                imgSrc={item.url[0]}
                sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 80vw, 80vw`}
              />
            </div>
          )}
        </div>
      </div>
      <AnimatedLine direction="horizontal" />
    </div>
  )
}
