import { VideoWithPlayButton } from "@/components/utility/video-with-play-button"
import { cn } from "@/lib/utils"

interface VideoSectionProps {
  primaryVideoUrl: string
  thumbnail: string
  title: string
  className?: string
}

export function VideoSection({ primaryVideoUrl, thumbnail, title, className }: VideoSectionProps) {
  return (
    <div
      className={cn(
        "w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black rounded-sm overflow-hidden",
        className
      )}
    >
      <VideoWithPlayButton primaryVideoUrl={primaryVideoUrl} thumbnail={thumbnail} title={title} />
    </div>
  )
}
