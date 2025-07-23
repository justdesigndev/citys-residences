import { cn } from "@/lib/utils"

import { Logo } from "@/components/icons"
import { VideoWithPlayButton } from "@/components/utility/video-with-play-button"
import { colors } from "@/styles/config.mjs"

interface VideoSectionProps {
  primaryVideoUrl: string
  thumbnail: string
  title: string
  className?: string
  spot?: string
}

export function VideoSection({ primaryVideoUrl, thumbnail, title, className, spot }: VideoSectionProps) {
  return (
    <div
      className={cn(
        "w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black rounded-sm overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 xl:h-48 xl:w-48 2xl:h-60 2xl:w-60 z-50">
        <Logo fill={colors.white} />
      </div>
      <VideoWithPlayButton primaryVideoUrl={primaryVideoUrl} thumbnail={thumbnail} title={title} spot={spot} />
    </div>
  )
}
