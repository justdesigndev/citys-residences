import { cn } from '@/lib/utils'

import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll'
import { AutoplayVideo } from '@/components/autoplay-video'
import { GsapSplitText } from '@/components/gsap-split-text'
import { Image } from '@/components/image'
import { Wrapper } from '@/components/wrapper'
import { dnaMedia } from '@/lib/constants'
import Balancer from 'react-wrap-balancer'
import { ScaleOut } from '@/components/animations/scale-out'

// Reusable class constants
const sectionGrid = 'grid grid-cols-24'
const contentContainer =
  'col-span-22 px-8 py-16 lg:col-span-16 lg:col-start-6 lg:px-0 lg:py-24 xl:col-span-17 xl:col-start-5 xl:py-36'
const headingStyles = cn(
  'text-left font-primary font-[400] text-black',
  'text-3xl/[1.15] lg:text-4xl/[1.15] xl:text-5xl/[1.15] 2xl:text-7xl/[1.15]',
  'my-6 lg:my-10 xl:my-12'
)
const articleStyles = cn(
  'text-left font-primary font-[300] text-black',
  'text-base/[1.35] lg:text-base/[1.35] xl:text-2xl/[1.35] 2xl:text-[28px]/[1.35]',
  'prose [&_strong]:font-[400] [&_ul]:list-disc [&_li]:marker:text-black'
)
const imageContainerStyles =
  'relative col-span-24 aspect-[16/12] lg:aspect-[16/9] xl:aspect-[16/7]'

export default async function Page() {
  // { params }: { params: { locale: string } }
  return (
    <Wrapper
      stickySidebar={false}
      headerWithNavigation={false}
      contactForm={false}
      footer={false}
    >
      {/* Hero Section */}
      <ScaleOut>
        <section className='relative z-10 flex h-screen items-center justify-center'>
          <div className='absolute inset-0 z-0'>
            <Image
              src='/img/citys-dna.jpg'
              alt='Citys DNA Background'
              fill
              className='object-cover object-center'
              mobileSize='100vw'
              desktopSize='100vw'
              quality={100}
              priority
            />
          </div>
          <div className='z-10 flex flex-col items-center gap-3'>
            <article
              className={cn(
                'text-center font-primary font-[400] text-white',
                'text-6xl/tight lg:text-4xl/tight xl:text-[7.25rem]/tight',
                'tracking-wide lg:tracking-wide'
              )}
            >
              City&apos;s DNA
            </article>
            <article
              className={cn(
                'text-center font-primary font-[200] text-white',
                'text-xl/tight lg:text-2xl/tight xl:text-3xl/tight',
                'tracking-wide lg:tracking-wide'
              )}
            >
              Geleceğin Şehri Bugüne Geldi. <br />
              Yaşam Yeniden Tasarlandı:
            </article>
            <article
              className={cn(
                'text-center font-primary font-[300] text-white',
                'text-xl/tight lg:text-2xl/tight xl:text-3xl/tight',
                'tracking-wide lg:tracking-wide'
              )}
            >
              CITY&apos;S RESIDENCES x CITY&apos;S LIVING
            </article>
          </div>
          <div className='absolute bottom-[20%] left-1/2 z-50 size-12 -translate-x-1/2 lg:bottom-[8%] xl:size-16 2xl:size-16'>
            <div className='relative size-full animate-bounce-translate'>
              <Image
                src='/svg/scroll-down.svg'
                alt='Scroll Down'
                fill
                className='object-contain'
                priority
              />
            </div>
            <span className='sr-only'>Scroll Down</span>
          </div>
        </section>
      </ScaleOut>

      <div className='relative z-20 bg-white'>
        {/* Geleceğin Şehri Bugüne Geldi. Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                Geleceğin Şehri <br className='hidden lg:block' /> Bugüne Geldi.
              </GsapSplitText>
            </h2>
            <article className={articleStyles}>
              <FadeInOnScroll delay={0.35}>
                <div>
                  <p>
                    Yaşadığınız her anı daha anlamlı, daha keyifli ve daha
                    huzurlu kılan bir yer hayal edin.
                    <br />
                    <strong>
                      Hayatın yürüyerek beş dakikaya sığdığı bir yaşam modeli…
                    </strong>
                    <br />
                    <strong>Burası City&apos;s Residences.</strong>
                  </p>
                  <p>
                    City&apos;s Residences yalnızca yapılardan ibaret değil; bu
                    bir vizyon. <br /> Geleceğin şehir yaşamına bugünden atılmış
                    bir imza; gelecek nesillere bırakılacak değerli bir miras.
                  </p>
                </div>
              </FadeInOnScroll>
            </article>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-1'].src}
              aspectRatio={dnaMedia['dna-1'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* Şehir İçinde Bir Mikro Şehir... Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                Şehir İçinde Bir Mikro Şehir...
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <>
                  <p>
                    İstanbul&apos;un yükselen yaşam ekseni Kozyatağı ve İstanbul
                    Finans Merkezi hattında,
                    <br /> E-5 ve TEM&apos;in kesişme noktasında, metroya
                    doğrudan bağlantılı konumuyla{' '}
                    <strong>
                      City&apos;s Residences şehrin tüm imkanlarını kendi
                      merkezinde yaşatan bir mikro-şehir.
                    </strong>
                  </p>
                  <p>
                    Avrupa&apos;nın sayılı karma yaşam projelerinden biri olan
                    City&apos;s Residences; konut, ofis, AVM, kültür, sanat,
                    sosyal yaşam, park, bahçe ve özel peyzajlı yeşil alanları
                    bir araya getiren çok kolay bir yaşam modeli…
                  </p>
                </>
              </article>
            </FadeInOnScroll>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-2'].src}
              aspectRatio={dnaMedia['dna-2'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* Yaşam Modeli: City's Living Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                Yaşam Modeli: City&apos;s Living
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <p>
                  City’s Living; teknolojiyi, estetiği ve konforu birleştiren
                  bir yaşam biçimidir. <br /> Hayatı kolaylaştırır, her anı
                  anlamlı, erişilebilir ve özel kılar. <br />{' '}
                  <strong>
                    City’s Living’in bir parçası olmak, geleceği bugünden
                    yaşamak demektir.
                  </strong>
                </p>
              </article>
            </FadeInOnScroll>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-3'].src}
              aspectRatio={dnaMedia['dna-3'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* 5 Dakikada Yaşam Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                &quot;5 Dakikada Yaşam&quot;
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <div>
                  <p>
                    City&apos;s Residences, Türkiye&apos;de ilk kez, tüm hayatın
                    birbirine 5 dakika yürüyüş mesafesinde olduğu bir yaşam
                    modeli sunuyor: <br /> Ev – Ofis: 2 dk, Spor & Spa: 2 dk,
                    Alışveriş: 3 dk, Performans Sanatları Merkezi: 3 dk, Sosyal
                    yaşam: 3 dk, Metro: 4 dk, Okul & Hastane: 5 dk...
                  </p>
                  <p>
                    <strong>
                      Aracınıza ihtiyaç duymadan, her şeyin elinizin altında
                      olduğu bir hayat.
                    </strong>{' '}
                    <br />{' '}
                    <strong>
                      City&apos;s Living bu yaşamı sizin için tasarladı.
                    </strong>
                  </p>
                </div>
              </article>
            </FadeInOnScroll>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-4'].src}
              aspectRatio={dnaMedia['dna-4'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* Dünya Standartlarında Bir Yaşam Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                Dünya Standartlarında Bir Yaşam
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <div>
                  <p>
                    City&apos;s Residences, konut, ofis, alışveriş, kültür,
                    sanat, eğlence ve iyi yaşam imkanlarını bir arada sunan,
                    dünya standartlarında bir karma yaşam projesi…
                  </p>
                  <p>
                    Avrupa&apos;nın en cazip yaşam alanlarından biri olan
                    City&apos;s Residences, sizi insan odaklı ve yüksek
                    standartlarda bir yaşam ile buluşturuyor.
                  </p>
                  <p>
                    City&apos;s Residences ve City&apos;s Living alanının en
                    iyilerini bir araya getirerek, fonksiyonel, estetik,
                    ergonomik ve zamansız bir mimari inşa etti. Bu anlayış,
                    yaşamı sanata dönüştürdü.
                  </p>
                  <p>
                    <strong>
                      &quot;Yaşama Sanatı&quot; vizyonunda yer alan isimler:
                    </strong>
                    <br />
                    <ul>
                      <li>Mimaride Murat Kader imzası,</li>
                      <li>İç mimaride Mustafa Toner ve Emre Toner tasarımı,</li>
                      <li>
                        Statik ve deprem güvenliğinin uzman ismi Melih Bulgur
                        ile huzur mühendisliği,
                      </li>
                      <li>
                        City&apos;s Park&apos;da Pınar & Cemil Aktaş imzasıyla,
                        şehir içinde eşsiz bir vaha.
                      </li>
                    </ul>
                  </p>
                </div>
              </article>
            </FadeInOnScroll>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-5'].src}
              aspectRatio={dnaMedia['dna-5'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* City's Park: Şehrin İçinde Bir Vaha Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                City&apos;s Park: Şehrin İçinde Bir Vaha
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <div>
                  <p>
                    <strong>
                      50.000 m² büyüklüğündeki City&apos;s Park, şehir hayatıyla
                      doğa arasındaki sınırı kaldırıyor. <br />
                      Burada yeşil, sadece bir manzara değil; günlük hayatınızın
                      temel bir parçası.
                    </strong>
                  </p>
                  <p>
                    City’s Park’ta yer alan bahçeler, parklar, yürüyüş alanları,
                    havuzlar, çocuk oyun ve açıkhava spor alanları, amfiler,
                    bisiklet parkuru ve rekreasyon alanları günlük yaşamınızın
                    tam merkezinde.
                  </p>
                </div>
              </article>
            </FadeInOnScroll>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-6'].src}
              aspectRatio={dnaMedia['dna-6'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* Akıllı Binalar, Entegre ve Sürdürülebilir Yaşam Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                <Balancer>
                  Akıllı Binalar, Entegre ve Sürdürülebilir Yaşam
                </Balancer>
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <ul>
                  <li>
                    Nesnelerin interneti destekli altyapı ve yapay zeka
                    kontrollü bina yönetimi
                  </li>
                  <li>Enerji pozitif yapılar, verimli cephe sistemleri</li>
                  <li>Yağmur suyu geri kazanımı ve atık dönüşümü</li>
                  <li>Karbon ayak izini sıfırlama hedefi</li>
                  <li>
                    Digital Twins ile afet simülasyonları ve yapı bakım
                    planlaması
                  </li>
                  <li>Görünmez konfor, hissedilir kalite</li>
                </ul>
              </article>
            </FadeInOnScroll>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-7'].src}
              aspectRatio={dnaMedia['dna-7'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* Yaşamı Kolaylaştıran Ayrıcalıklar Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                Yaşamı Kolaylaştıran Ayrıcalıklar
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <>
                  <p>
                    City&apos;s Residences, yaşamı tek bir adreste buluşturur:
                  </p>
                  <ul>
                    <li>City&apos;s Park (50.000 m²)</li>
                    <li>
                      City&apos;s Members Club (6.500 m² – spor, spa, hobi ve
                      sosyal alanlar)
                    </li>
                    <li>City&apos;s Performans Sanatları Merkezi</li>
                    <li>City&apos;s İstanbul AVM</li>
                    <li>
                      JustWork Ofis Kampüsü, JustAcademy, JustStay Hotel,
                      JustEvent
                    </li>
                  </ul>
                  <p>
                    <strong>
                      Tek adres, tüm yaşam: CITY&apos;S RESIDENCES x CITY&apos;S
                      LIVING
                    </strong>
                  </p>
                </>
              </article>
            </FadeInOnScroll>
          </div>
          <div className={imageContainerStyles}>
            <AutoplayVideo
              playbackId={dnaMedia['dna-8'].src}
              aspectRatio={dnaMedia['dna-8'].aspect()}
              verticalPosition={95}
            />
          </div>
        </section>

        {/* Global Bir Yönetim Vizyonu Section */}
        <section className={sectionGrid}>
          <div className={contentContainer}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                Global Bir Yönetim Vizyonu
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <p>
                  City&apos;s Residences, WAM Asset Management portföyündeki en
                  yeni ve en prestijli projelerden biri.
                </p>
                <p>
                  WAM Asset Management portföyünde City&apos;s Nişantaşı AVM,
                  City&apos;s İstanbul AVM, Meydan İstanbul AVM, JustWork Office
                  Campus, Gebze Lojistik Merkezi, Elegance Hotel International,
                  New York IGT Shopping Mall gibi uluslararası projeler yer
                  alıyor.
                </p>
                <p>
                  WAM Asset Management, kurumsal gücü, marka güveni,
                  sürdürülebilir kira getirisi ve uluslararası network avantajı
                  ile City&apos;s Residences&apos;ı her anlamda doğru yönetilen,
                  global değere sahip bir yatırıma dönüştürüyor.{' '}
                  <a
                    href='https://wamturkey.com'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    (wamturkey.com)
                  </a>
                </p>
              </article>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Son Söz Section */}
        <section className={cn(sectionGrid)}>
          <div className={cn(contentContainer, 'pt-0')}>
            <h2 className={headingStyles}>
              <GsapSplitText type='chars' stagger={0.005} duration={1.25}>
                Son Söz
              </GsapSplitText>
            </h2>
            <FadeInOnScroll delay={0.35}>
              <article className={articleStyles}>
                <>
                  <p>
                    City&apos;s Residences&apos;ta yaşam yalnızca kolaylaşmaz;
                    yeniden tanımlanır.
                    <br />
                    Her adımda zarafet, her anda huzur, her detayda yaşama
                    sanatı.
                  </p>
                  <p className='my-16 block'>
                    <span className='block border-b border-gray-900 py-4 text-3xl font-[200] xl:text-4xl'>
                      Daha çok yaşa...
                    </span>
                    <span className='block border-b border-gray-900 py-4 text-3xl font-[300] xl:text-4xl'>
                      Daha huzurlu yaşa...
                    </span>
                    <span className='block border-b border-gray-900 py-4 text-3xl font-[400] xl:text-4xl'>
                      Daha huzurlu yaşa...
                    </span>
                  </p>
                  <p>
                    <strong>
                      Yaşamınızın en iyi versiyonuna hoş geldiniz.
                    </strong>
                  </p>
                  <p>
                    <strong>CITY&apos;S RESIDENCES x CITY&apos;S LIVING</strong>
                  </p>
                </>
              </article>
            </FadeInOnScroll>
          </div>
        </section>
      </div>
    </Wrapper>
  )
}
