"use client"

import s from "./sticky-badge.module.css"

import cn from "clsx"
import { useState } from "react"

import ModalContactForm from "@/components/modal-contact-form"

interface StickyBadgeProps {
  hidden: boolean
}

export function StickyBadge({ hidden }: StickyBadgeProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className={cn(s.stickyBadge, "flex items-center justify-center cursor-pointer", { [s.hidden]: !hidden })}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="text-foreground text-base">{open ? "KAPAT" : "RANDEVU AL"}</span>
      </div>
      <ModalContactForm open={open} />
    </>
  )
}
