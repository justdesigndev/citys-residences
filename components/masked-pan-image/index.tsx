import { gsap } from "@/components/gsap"
import { Img } from "@/components/utility/img"
import { useGSAP } from "@gsap/react"
import { useWindowSize } from "hamo"
import { useRef } from "react"

export interface MaskedPanImageProps {
  imgSrc: string
  sizes: string
}

export function MaskedPanImage({ imgSrc, sizes = "100vw" }: MaskedPanImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  const { width } = useWindowSize()

  useGSAP(
    () => {
      if (!width) return

      // const isBelowTablet = width < breakpoints.breakpointTablet

      const distance = 150

      const tl = gsap.timeline({ paused: true })

      tl.fromTo(
        imgRef.current,
        {
          x: `-${distance * 1.5}px`,
        },
        {
          x: `${distance * 1.5}px`,
        }
      ).fromTo(
        imgRef.current,
        {
          x: `${distance * 1.5}px`,
        },
        {
          x: `-${distance * 1.5}px`,
        }
      )

      tl.play()
        .timeScale(distance * 0.001)
        .repeat(-1)
    },
    {
      scope: ref,
      dependencies: [width],
    }
  )
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden border border-red-500" ref={ref}>
      <div className="relative h-full w-[200%] flex-shrink-0 border border-blue-500" ref={imgRef}>
        <Img
          src={imgSrc}
          alt="Parallax Image"
          className="object-contain z-40 border border-green-500"
          fill
          sizes={sizes}
          loading="lazy"
        />
      </div>
    </div>
  )
}
