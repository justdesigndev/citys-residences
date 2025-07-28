import { cn } from "@/lib/utils"

import { ArrowRightIcon } from "lucide-react"

export interface PageTitleProps {
  title: string
}

export function PageTitle(props: PageTitleProps) {
  return (
    <div className="container flex items-center justify-center gap-6 bd:gap-2 py-12 bt:py-20">
      <h2
        className={cn(
          "flex items-center gap-2",
          "text-bricky-brick font-primary font-semibold text-base xl:text-3xl 2xl:text-4xl"
        )}
      >
        <span>{props.title}</span>
        <ArrowRightIcon className="w-6 h-6 2xl:w-8 2xl:h-8" strokeWidth={3} />
      </h2>
    </div>
  )
}
