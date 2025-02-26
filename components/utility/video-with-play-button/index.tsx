"use client"

import { useRef, useState } from "react"
import cn from "clsx"

import { Video } from "@/components/utility/video"
import { IconPlay } from "@/components/icons"

export interface IVideoWithPlayButtonProps {
  primaryVideoUrl: string
  primaryVideoType?: string
}

export function VideoWithPlayButton(props: IVideoWithPlayButtonProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    videoRef.current?.play()
    setIsPlaying(true)
  }

  return (
    <div className="group relative w-full h-full">
      <Video
        className="w-full h-full object-cover"
        primaryVideoUrl={props.primaryVideoUrl}
        ref={videoRef}
        controls={isPlaying}
      />
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-full flex items-center justify-center bg-neutral-900/50 transition-all duration-500 cursor-pointer",
          "group-hover:bg-neutral-900/70",
          {
            "opacity-0 pointer-events-none": isPlaying,
          }
        )}
        onClick={handlePlay}
      >
        <button
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center transition-transform duration-300",
            "group-hover:scale-125"
          )}
        >
          <IconPlay fill="var(--white)" />
        </button>
      </div>
    </div>
  )
}
