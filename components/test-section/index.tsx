import { citysParkVideo } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { FadeInOnScroll } from '../animations/fade-in-on-scroll'
import { GsapSplitText } from '../gsap-split-text'
import { Img } from '../utility/img'
import { VideoWithText } from '../video-with-text'

export default function TestSection() {
  const t = useTranslations('home')

  return (
    <div>
      <section className='relative z-20 bg-white py-12 lg:py-12'>
        <div className='relative ml-32 flex items-center justify-center gap-32 py-12 xl:py-28'>
          <div className='flex w-[700px] flex-shrink-0 flex-col items-center gap-2 lg:gap-2'>
            <article
              className={cn(
                'text-center font-montserrat font-[500] text-trapped-darkness',
                'text-4xl lg:text-5xl',
                'leading-tight lg:leading-tight',
                'tracking-wide lg:tracking-widest'
              )}
            >
              <GsapSplitText splitBy='chars' stagger={0.02} duration={1.5}>
                {t('section1.title1')}
              </GsapSplitText>
              <span className='sr-only'>{t('section1.title1')}</span>
            </article>
            <FadeInOnScroll delay={0.5}>
              <article className='relative h-16 w-screen lg:h-44 xl:h-32'>
                <Img
                  src='/img/sanati.png'
                  alt='Sanatı'
                  fill
                  className='object-contain'
                  sizes='100vw'
                  loading='lazy'
                />
                <span className='sr-only'>{t('section1.title2')}</span>
              </article>
            </FadeInOnScroll>
          </div>
          <div className='flex w-80 flex-shrink-0'>
            <article
              className={cn(
                'text-left font-montserrat font-[300] text-trapped-darkness',
                'text-[0.8rem] lg:text-2xl',
                'leading-relaxed'
              )}
            >
              <GsapSplitText splitBy='lines' stagger={0.01} duration={1.5}>
                {t('section1.title3')}
              </GsapSplitText>
            </article>
          </div>
        </div>
      </section>
      <VideoWithText
        mediaId='e2tew1zhxj'
        primaryVideoUrl={citysParkVideo}
        title={
          <span>
            Daha <strong>huzurlu</strong> yaşa.
          </span>
        }
        description={
          <>
            Farklı ve zamansız mimarinin, doğanın cömertliği ile buluştuğu
            mekanlarda güven içinde, daha huzurlu yaşa.
          </>
        }
      />
    </div>
  )
}
