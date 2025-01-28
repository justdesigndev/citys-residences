import s from "./sticky-badge.module.css"

import cn from "clsx"

export function StickyBadge() {
  return (
    <div className={cn(s.stickyBadge, "cursor-pointer")}>
      <span className="text-foreground text-xl">RANDEVU AL</span>
    </div>
  )
}
