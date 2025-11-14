import { OptimizedVideo } from '../optimized-video'

export interface FullWidthSingleVideoProps {
  mediaId: string
  thumbnail?: string
  videoAspectRatio?: number
}

export function FullWidthSingleVideo(props: FullWidthSingleVideoProps) {
  const { mediaId, thumbnail } = props

  return (
    <section className='relative aspect-[16/14] overflow-hidden lg:aspect-[16/7]'>
      {/* <div className='absolute left-0 top-0'>FullWidthSingleVideo</div> */}
      {/* <MuxPlayerWrapper
          playbackId={mediaId}
          style={
            {
              aspectRatio: videoAspectRatio as number,
              '--media-object-fit': 'cover',
              '--media-object-position': 'center',
              '--controls': 'none',
            } as React.CSSProperties
          }
          // placeholder={thumbnail}
          customPlaceholder={thumbnail}
        /> */}
      <OptimizedVideo
        playbackId={mediaId}
        scrollDelay={1500}
        placeholder={thumbnail}
      />
    </section>
  )
}
