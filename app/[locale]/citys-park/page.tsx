import { cn } from "@/lib/utils"

import { AnimatedLine } from "@/components/animated-line"
import { ScaleOut } from "@/components/animations/scale-out"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysParkLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { LogoSection } from "@/components/logo-section"
import { MaskedParallaxImage } from "@/components/masked-parallax-image"
import { MembersClubItem } from "@/components/members-club-item"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { Wrapper } from "@/components/wrapper"
import { citysParkVideo, gsapGlobalClasses, sections } from "@/lib/constants"
import { breakpoints } from "@/styles/config.mjs"

export default function Page() {
  const items = [
    {
      title: `City's Lounge`,
      subtitle: `Buluş, paylaş, keyfini çıkar`,
      description: `
      <p>Sabah bir kahve, öğlen küçük bir toplantı, akşamüstü spontane bir kutlama... <br /> Doğanın içinde arkadaşlarınla bir masaya kurul, ya da ışıkların altında unutulmaz bir etkinlik düzenle.</p>
      <p>Resmiyet yok, sadece senin ritmin, senin alanın.</p>
      `,
      url: ["/img/citys-park/01.jpg"],
      sectionId: sections.citysPark.citysLounge.id,
    },
    {
      title: `Açıkhava <br /> Meydanları`,
      subtitle: `Plan yapmadan buluşmanın en güzel hali`,
      description: `
      <p>City’s Park’ta her şey kendiliğinden gelişir.</p>
      <p>Bir yandan çocuklar kahkahalarla parkta oynarken, diğer yanda birileri havuz başında kitabına dalmış, bazıları ise yürüyüş yolunda günün stresini geride bırakıyor.</p>
      <p>Herkes bir arada. Ailece, dostça, doğayla iç içe.</p>
      <p>Aynı anda aynı yerde herkes kendi ritminde.</p>
      `,
      url: ["/img/citys-park/06.jpg"],
      sectionId: sections.citysPark.openSquares.id,
    },
    {
      title: `Açık Havuzlar`,
      subtitle: `Serin sular, sıcacık anlar`,
      description: `
      <p>Güne biraz serinlik katalım mı?</p>
      <p>Havuz başında bir şezlong kap, gözlüğünü tak, müziği aç... <br /> İster yüz, ister yayıl, ister kitaplara dal... <br /> City’s Residences’ta havuz keyfi nasıl istersen öyle yaşanır.</p>
      <p>Kimse bir yere yetişmez, kimse acele etmez. <br /> Çünkü burası sadece bir havuz değil, şehrin tam ortasında özgürlüğünü hissettiğin bir nefes alma alanı.</p>
      <p>Hayat, bazen sadece nefes almaktır.</p>
      `,
      url: ["/img/citys-park/02.jpg"],
      sectionId: sections.citysPark.openPools.id,
    },
    {
      title: `Çocuk Parkları`,
      subtitle: `Doğayla iç içe, gerçek bir çocukluk`,
      description: `
      <p>Oyunla büyüyen çocuklar... <br /> City’s Park’ta her salıncak bir hayale, her kahkaha bir özgürlüğe açılıyor.</p>
      <p>Yalnızca oyun oynamak için değil, keşfetmek, düşlemek, çocukluğun dolu dolu yaşanması için tasarlandı.</p>
      <p>Her çocukluk bir masaldır ve bu masal; <br /> çimlerin üzerinde çıplak ayakla yürünebilen, salıncağın gölgesinde hayal kurulan, doğayla iç içe, güvenle ve sevgiyle yazılıyor...</p>
      `,
      url: ["/img/citys-park/03.jpg"],
      sectionId: sections.citysPark.childrenParks.id,
    },
    {
      title: `Yürüyüş Parkurları`,
      subtitle: `Şehirden bir adım uzakta, kendine bir adım yakın...`,
      description: `
      <p>Ağaçların arasından süzülen ışıklarla doğa seni içine alır, nefesin yavaşlar, zihnin durulur, kalbin hafifler.</p>
      <p>Sabahın sessizliğinde güne hafifçe başlarsın, akşam üzeri ise kendine ayırdığın eşsiz bir mola olur.</p>
      <p>Adımlarını saymak zorunda değilsin... <br /> Yavaşla, hisset ve keyfini çıkar.</p>
      `,
      url: ["/img/citys-park/04.jpg"],
      sectionId: sections.citysPark.walkingTracks.id,
    },
    {
      title: `Açık Spor Alanları`,
      subtitle: `Bedenin özgür, ruhun doğayla...`,
      description: `
      <p>Sabah serinliğinde yoga matını ser, güne içten bir nefesle başla. Ya da gün batarken bisikletinle rüzgarı yüzünde hisset.</p>
      <p>İster hafif bir esneme, ister tempolu bir koşu... Her adım, her duruş, her nefes daha iyi hissetmek için...</p>
      <p>Doğa ritmi verir, sen katılırsın. İster sessiz, ister özgür, kendinin ve bedeninin kulak verdiği davete uyarsın.</p>
      <p>Burada spor; kendine iyi gelme hali.</p>
      `,
      url: ["/img/citys-park/05.jpg"],
      sectionId: sections.citysPark.openSportsAreas.id,
    },
  ]

  return (
    <Wrapper>
      <SectionsMenuInitializer sections={Object.values(sections.citysPark)} />
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
        <ScaleOut>
          <Video
            primaryVideoUrl={citysParkVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </ScaleOut>
      </section>
      <section className="relative z-20 bg-white py-5">
        <LogoSection foregroundLogo={<IconCitysParkLogo fill="#5D7261" />} foregroundDuration={0.5} />
        <div className="section-container py-20 flex flex-col items-center gap-20">
          <h2 className="font-primary font-medium text-black text-2xl lg:text-2xl xl:text-3xl 2xl:text-6xl xl:leading-normal 2xl:leading-tight xl:max-w-4xl 2xl:max-w-6xl text-center">
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1.5}>
              Şehrin kalbinde, <br /> sizi yavaşlatan, yaşamın en özel hali...
            </GsapSplitText>
          </h2>
          <h2 className="font-primary font-medium text-black text-2xl lg:text-2xl xl:text-3xl 2xl:text-5xl xl:leading-normal 2xl:leading-tight xl:max-w-4xl 2xl:max-w-6xl text-center">
            <GsapSplitText stagger={0.002} splitBy="chars" duration={1.5}>
              Yaşam Yeniden Tasarlandı: CITY&apos;S.
            </GsapSplitText>
          </h2>
          <div className={cn("relative w-full h-[90vh]", gsapGlobalClasses.fadeIn)}>
            <MaskedParallaxImage
              imgSrc={"/img/citys-park-banner.jpg"}
              sizes={`(max-width: ${breakpoints.breakpointMobile}px) 100vw, (max-width: ${breakpoints.breakpointTablet}px) 90vw, 90vw`}
            />
          </div>
        </div>
      </section>
      <section className="relative z-20 bg-white">
        <AnimatedLine direction="horizontal" />
        {items.map((item, i) => (
          <MembersClubItem
            key={i}
            item={item}
            align={i % 2 === 0 ? "ltr" : "rtl"}
            className={i % 2 === 0 ? "bg-white" : "bg-unbleached"}
            sectionId={item.sectionId}
          />
        ))}
      </section>
      <section className={cn("relative section-container py-20", gsapGlobalClasses.fadeIn)}>
        <VideoSection
          primaryVideoUrl={citysParkVideo}
          thumbnail="/img/thumbnail-pinar-cemil-aktas.jpg"
          title="Peyzaj: Bir Vaha Tasarımı"
        />
      </section>
      <AnimatedLine direction="horizontal" />
      <LinkToPage
        previous={{ title: "Daireler", href: "/residences" }}
        next={{ title: "City's Members Club", href: "/citys-members-club" }}
      />
    </Wrapper>
  )
}
