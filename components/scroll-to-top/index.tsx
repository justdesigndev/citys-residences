"use client"

import { useLenis } from "lenis/react"
import { useTranslations } from "next-intl"

import { gsap } from "@/components/gsap"

export function ScrollToTop() {
  const lenis = useLenis()
  const t = useTranslations("common")

  const handleScrollToTop = () => {
    gsap.to("body", {
      opacity: 0,
      onComplete: () => {
        lenis?.scrollTo(0, { immediate: true })
        gsap.to("body", {
          opacity: 1,
          delay: 0.2,
        })
      },
    })
  }

  return (
    <button
      onClick={handleScrollToTop}
      className="font-suisse-intl font-normal text-sm text-white opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
      type="button"
    >
      {t("scrollToTop")}
    </button>
  )
}
