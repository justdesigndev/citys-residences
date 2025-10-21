import { cn } from '@/lib/utils'
import { WistiaPlayerWrapper } from '../wistia-player'

export interface FullWidthSingleVideoProps {
  mediaId: string
}

export function FullWidthSingleVideo(props: FullWidthSingleVideoProps) {
  const { mediaId } = props
  return (
    <section className={cn('relative h-[40vw]')}>
      <div className='absolute inset-0 bottom-0 left-0 right-0 top-0 z-10'>
        <WistiaPlayerWrapper
          muted
          autoplay
          preload='auto'
          qualityMin={1080}
          swatch={false}
          bigPlayButton={false}
          silentAutoplay='allow'
          endVideoBehavior='loop'
          controlsVisibleOnLoad={false}
          playBarControl={false}
          volumeControl={false}
          settingsControl={false}
          transparentLetterbox={true}
          mediaId={mediaId}
        />
      </div>
    </section>
  )
}
