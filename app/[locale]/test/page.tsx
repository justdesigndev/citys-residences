import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { PageTitle } from '@/components/page-title'
import { colors } from '@/styles/config.mjs'

export default function TestPage() {
  return (
    <div>
      <Header />
      <PageTitle
        primaryColor={colors['army-canvas']}
        secondaryColor={colors.white}
        title="CITY'S PARK"
        description='Şehrin kalbinde, sizi yavaşlatan, yeşil bir vaha...'
        id='test'
      />
      <PageTitle
        primaryColor={colors.white}
        secondaryColor={colors['bricky-brick']}
        title='DAiRELER'
        description='Günlük yaşamın alışkanlıklarından, yıllara yayılan huzurlu anılara kadar her detay; evinizin size ait bir dünyaya dönüşmesi için tasarlandı.'
        id='residences'
      />
      <PageTitle
        primaryColor={colors['blue-shimmer']}
        secondaryColor={colors.black}
        title={
          <>
            <span className='block'>CITY&apos;S</span>
            <span className='block'>MEMBERS CLUB</span>
          </>
        }
        description='Sanat, spor ve sosyal ayrıcalıkların buluştuğu,özel bir yaşam alanı.'
        id='citys-members-club'
      />
      <PageTitle
        primaryColor={colors['verve-violet']}
        secondaryColor={colors.white}
        title={
          <>
            <span className='block'>CITY&apos;S</span>
            <span className='block'>LIVING</span>
          </>
        }
        description='Artık her şey daha kolay.'
        id='citys-living'
      />
      <HeroSection
        mainText='Gösteriş değil yaşam kalitesi: zamansız malzeme ve yalın detaylarla ‘gizli lüks’ kurduk.'
        videoThumbnail='/img/thumbnail-kolaj-video.jpg'
      />
      <PageTitle
        primaryColor={colors['aqua-belt']}
        secondaryColor={colors.black}
        title={
          <>
            <span className='block'>CITY&apos;S</span>
            <span className='block'>İSTANBUL AVM</span>
          </>
        }
        description='Sanat, spor ve sosyal ayrıcalıkların buluştuğu,özel bir yaşam alanı.'
        id='citys-istanbul-avm'
      />
      <PageTitle
        primaryColor={colors['trapped-darkness']}
        secondaryColor={colors.white}
        title="CITY'S TIMES"
        description='Bizi takip edin.'
        id='citys-times'
      />
      <Footer />
    </div>
  )
}
