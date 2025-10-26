'use client'

import { cn } from '@/lib/utils'

import { GsapSplitText } from '@/components/gsap-split-text'
import { Image } from '@/components/image'
import {
  BlueprintIcon,
  PlayCircleIcon,
  QuotesIcon,
} from '@phosphor-icons/react'
import { FullScreenVideoDialog } from '@/components/dialogs/full-screen-video-dialog'

export interface QuoteWithVideoProps {
  quote: string
  mediaId: string
  portraitImage?: string
  personName?: string
  personTitle?: string
  sidebarText?: string
  primaryColor?: string
  secondaryColor?: string
  thumbnail?: string
  className?: string
  hasBg?: boolean
}

export function QuoteWithVideo({
  quote,
  mediaId,
  portraitImage,
  personName,
  personTitle,
  sidebarText,
  primaryColor,
  secondaryColor,
  thumbnail,
  className,
  hasBg = false,
}: QuoteWithVideoProps) {
  return (
    <section className={cn('relative min-h-lvh', className)}>
      <div
        className={cn(
          'relative z-10 grid min-h-lvh grid-cols-24',
          hasBg &&
            'bg-[url(/svg/murat-kader-bg.svg)] bg-contain bg-right-bottom bg-no-repeat bg-blend-soft-light'
        )}
        style={{ backgroundColor: primaryColor }}
      >
        <div className='col-span-24 flex items-center justify-between px-8 pt-48 lg:col-span-15 lg:col-start-5 lg:px-0 lg:pt-48'>
          <div className='max-w-[80%] text-left lg:max-w-[50%]'>
            <h2
              className='relative font-primary text-2xl font-[400] lg:text-4xl lg:leading-snug'
              style={{ color: secondaryColor }}
            >
              <span className='absolute left-0 top-0 z-20 block -translate-y-[140%]'>
                <QuotesIcon
                  size={64}
                  weight='thin'
                  style={{ color: secondaryColor }}
                />
              </span>
              <GsapSplitText type='lines' stagger={0.1} duration={1.5}>
                {quote}
              </GsapSplitText>
            </h2>
          </div>
          <div className='mt-auto hidden text-right lg:block'>
            {personName && (
              <h3
                className='font-primary text-xl font-[400] lg:text-2xl'
                style={{ color: secondaryColor }}
              >
                {personName}
              </h3>
            )}
            {personTitle && (
              <p
                className='mt-1 font-primary text-sm font-[300] lg:text-2xl'
                style={{ color: secondaryColor }}
              >
                {personTitle}
              </p>
            )}
          </div>
        </div>
        <div className='col-span-24 px-8 pb-32 pt-16 lg:col-span-15 lg:col-start-5 lg:px-0 lg:pb-32 lg:pt-16'>
          <div className='group relative aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md text-red-400'>
            <FullScreenVideoDialog
              dialogTrigger={
                <Image
                  src={thumbnail || ''}
                  alt='Thumbnail'
                  fill
                  className='object-cover object-center'
                />
              }
              mediaId={mediaId}
            />
            <span className='pointer-events-none absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 text-white transition-transform duration-300 ease-in-out group-hover:scale-125'>
              <PlayCircleIcon size={120} weight='fill' />
            </span>
          </div>
          <div className='mr-auto inline-flex text-right lg:hidden'>
            {personName && (
              <h3
                className='font-primary text-xl font-[400] lg:text-2xl'
                style={{ color: secondaryColor }}
              >
                {personName}
              </h3>
            )}
            {personTitle && (
              <p
                className='mt-1 font-primary text-sm font-[300] lg:text-2xl'
                style={{ color: secondaryColor }}
              >
                {personTitle}
              </p>
            )}
          </div>
        </div>
        <div className='aspect-square pointer-events-none absolute bottom-0 right-0 z-50 h-[30%] w-full lg:h-2/4'>
          <Image
            src={portraitImage || ''}
            alt={personName || 'Portrait'}
            fill
            className='object-contain object-right-bottom'
          />
        </div>
        <div className='absolute right-8 top-8 flex flex-col items-center justify-end gap-4 lg:right-24 lg:top-24'>
          <BlueprintIcon
            size={48}
            weight='thin'
            className='rotate-90'
            style={{ color: secondaryColor }}
          />
          <div
            className='writing-mode-vertical font-primary text-xl font-[400] lg:text-4xl'
            style={{ color: secondaryColor }}
          >
            <span className='rotate-90 transform whitespace-nowrap'>
              {sidebarText}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
