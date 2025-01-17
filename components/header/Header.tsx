"use client"

import s from "./header.module.css"

import { gsap } from "@/lib/gsap"
import cn from "clsx"
import Lenis from "lenis"
import { useLenis } from "lenis/react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Logo } from "@/components/icons"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { Menu } from "@/components/menu"
import { MenuX } from "@/components/menu-x"
import { Link as LocalizedLink } from "@/i18n/routing"
import { initialScroll } from "@/lib/constants"

// const headerVariants = cva("w-full flex items-center justify-between", {
//   variants: {
//     variant: {
//       v1: s.v1,
//       v2: s.slim,
//     },
//   },
//   defaultVariants: {
//     variant: "v1",
//   },
// })

// type HeaderVariantsProps = VariantProps<typeof headerVariants>

export default function Header() {
// { variant }: HeaderVariantsProps
  const lenis = useLenis()
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [slim, setSlim] = useState(false)
  const pathname = usePathname()
  const t = useTranslations("routes")
  // const locale = useLocale()

  useEffect(() => {
    return menuOpen ? lenis?.stop() : lenis?.start()
  }, [menuOpen, lenis])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleEvents = (e: Lenis) => {
      if (e.className && e.actualScroll < 10) {
        setSlim(false)
      } else {
        setSlim(true)
      }

      if (lenis?.direction === 1 && e.actualScroll > window.innerHeight / 2) {
        setHidden(true)
      } else {
        setHidden(false)
      }
    }

    lenis?.on("scroll", handleEvents)

    return () => lenis?.off("scroll", handleEvents)
  }, [lenis])

  function handleContact() {
    gsap.to("body", {
      opacity: 0,
      onComplete: () => {
        lenis?.scrollTo(`#footer`, { immediate: true })
        setHidden(true)
        gsap.to("body", {
          opacity: 1,
          delay: 0.3,
        })
      },
    })
  }

  return (
    <>
      <header
        className={cn(s.header, "flex items-center", {
          [s.hidden]: hidden,
          [s.slim]: slim,
        })}
      >
        <div
          className={cn(s.content, "flex items-center justify-between flex-1", {
            [s.slim]: slim,
          })}
        >
          <LocalizedLink className={cn(s.logoC, "cursor-pointer")} href="/" scroll={initialScroll}>
            <Logo fill="var(--foreground)" />
          </LocalizedLink>
          <div
            className={cn(s.trigger, "cursor-pointer flex items-center gap-2 lg:gap-4", {
              [s.active]: menuOpen,
            })}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <div className={cn(s.cross, "cursor-pointer")}>
              <MenuX
                className="hidden lg:block"
                isOpen={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
                strokeWidth="1"
                color="#fff"
                transition={{ type: "spring", stiffness: 260, damping: 40 }}
                width="50"
                height="6"
              />
              <MenuX
                className="block lg:hidden"
                isOpen={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
                strokeWidth="1"
                color="#fff"
                transition={{ type: "spring", stiffness: 260, damping: 40 }}
                width="25"
                height="6"
              />
            </div>
            <div className={cn(s.text, "cursor-pointer", { [s.active]: menuOpen })}>
              <div className="cursor-pointer">CLOSE</div>
              <div className="cursor-pointer">MENU</div>
            </div>
          </div>
          <Menu open={menuOpen} />
          <nav className={cn(s.nav, "flex flex-col gap-10 lg:flex-row items-center")}>
            <div className={"flex flex-col lg:flex-row items-center gap-10"}>
              <div
                className={cn(s.navItem, "cursor-pointer hidden lg:block animated-underline-single")}
                onClick={handleContact}
              >
                {t("contact")}
              </div>
              <div className={cn(s.navItem, "cursor-pointer")}>
                <LocaleSwitcher />
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
