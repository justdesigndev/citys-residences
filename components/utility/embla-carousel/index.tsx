import s from "./embla.module.css"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import React from "react"

import { useAutoplay } from "./autoplay"
import { NextButton, PrevButton, usePrevNextButtons } from "./embla-carousel-buttons"
import { EmblaOptionsType } from "embla-carousel"

type PropType = {
  slides: React.ReactNode[]
  options?: EmblaOptionsType
  autoplay?: boolean
  autoplayDelay?: number
  slideWidth?: string
  slideSpacing?: string
}

export const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, autoplay = false, autoplayDelay = 5000, slideWidth = "100%", slideSpacing = "0px" } = props
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options as any,
    autoplay ? ([Autoplay({ playOnInit: true, delay: autoplayDelay })] as any) : []
  )

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi as any)
  const { onAutoplayButtonClick } = useAutoplay(emblaApi as any)
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return (
    <div
      className={s["embla"]}
      style={{ "--slide-size": slideWidth, "--slide-spacing": slideSpacing } as React.CSSProperties}
    >
      <div className={s["embla-viewport"]} ref={emblaRef}>
        <div className={s["embla-container"]}>
          {slides.map((item, index) => (
            <div className={s["embla-slide"]} key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className={s["embla-buttons"]}>
        <PrevButton
          className="blur-bg-white"
          onClick={autoplay ? () => onAutoplayButtonClick(onPrevButtonClick) : onPrevButtonClick}
          disabled={prevBtnDisabled}
        />
        <NextButton
          className="blur-bg-white"
          onClick={autoplay ? () => onAutoplayButtonClick(onNextButtonClick) : onNextButtonClick}
          disabled={nextBtnDisabled}
        />
      </div>
    </div>
  )
}

export default EmblaCarousel
