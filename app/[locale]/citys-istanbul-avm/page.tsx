import { AnimatedLine } from "@/components/animated-line"
import { ScaleOut } from "@/components/animations/scale-out"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysIstanbulLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { LogoSection } from "@/components/logo-section"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { getBrandsData } from "@/lib/api/queries"
import { citysIstanbulAvmVideo } from "@/lib/constants"
import { FilterableContent } from "./filterable-content"

export default async function Page() {
  const brands = await getBrandsData()

  return (
    <Wrapper>
      <SectionsMenuInitializer sections={Object.values([])} />
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
        <ScaleOut>
          <Video
            primaryVideoUrl={citysIstanbulAvmVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </ScaleOut>
      </section>
      <section className="relative z-30 bg-white py-5 flex flex-col items-center">
        <LogoSection foregroundLogo={<IconCitysIstanbulLogo fill="#000000" />} foregroundDuration={0.5} />
        <h2 className="font-primary font-medium text-black text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl xl:leading-normal 2xl:leading-snug xl:max-w-4xl 2xl:max-w-6xl text-center">
          <GsapSplitText stagger={0.2} splitBy="lines" duration={1.5}>
            Alışverişin, yaşamın ve şehrin ritminin tek bir çatı altında buluştuğu yer. <br />
            Uluslararası seçkin markalara ulaşmak, yeni bir lezzet keşfetmek ya da <br />
            günün yorgunluğunu ilham veren bir atmosferde atmak... <br />
            Tüm bu ayrıcalıklar, yaşadığınız yerden sadece bir asansör uzaklıkta.
          </GsapSplitText>
        </h2>
        <div className="section-container py-24">
          <FilterableContent brands={brands.items || []} />
        </div>
      </section>
      <AnimatedLine direction="horizontal" />
      <LinkToPage
        previous={{ title: "City's Life Ayrıcalıkları", href: "/citys-life-privileges" }}
        next={{ title: "Anasayfa", href: "/" }}
      />
    </Wrapper>
  )
}
