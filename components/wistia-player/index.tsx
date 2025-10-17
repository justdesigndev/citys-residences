"use client"

import { WistiaPlayer, WistiaPlayerProps } from "@wistia/wistia-player-react"

export function WistiaPlayerWrapper(props: WistiaPlayerProps) {
  function handlePlay() {
    console.log("The video was just played!")
  }

  return <WistiaPlayer className='w-full object-cover' onPlay={handlePlay} {...props} />
}
