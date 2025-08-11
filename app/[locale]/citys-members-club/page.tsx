import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { IconCitysMembersClubLogo } from "@/components/icons"
import { LogoSection } from "@/components/logo-section"
import { MembersClubItem } from "@/components/members-club-item"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { membersClubVideo } from "@/lib/constants"
import { getCitysMembersClubContent } from "@/lib/content"
import { cn } from "@/lib/utils"

export default async function Page({ params }: { params: { locale: string } }) {
  const { locale } = params
  const items = await getCitysMembersClubContent(locale)

  return (
    <>
      <FadeInOnScroll>
        <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
          <Video
            primaryVideoUrl={membersClubVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </section>
      </FadeInOnScroll>
      <section className="relative z-20 bg-minor-blue">
        <LogoSection foregroundLogo={<IconCitysMembersClubLogo fill="#000000" />} />
        <div className="flex flex-col items-center justify-center pb-12 lg:pb-24">
          <FadeInOnScroll>
            <div className="relative w-[90vw] h-[80vw] lg:w-[35vw] lg:h-[35vw] mb-12">
              <Img src="/img/members-cat.png" alt="City's Members Club" fill className="object-contain" />
            </div>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.3}>
            <h2
              className={cn(
                "font-primary font-medium text-center",
                "text-3xl lg:text-2xl xl:text-4xl 2xl:text-5xl 3xl:text-5xl",
                "xl:leading-normal 2xl:leading-tight 3xl:leading-tight",
                "xl:max-w-4xl 2xl:max-w-6xl",
                "flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0"
              )}
            >
              <span>Yaşam Yeniden Tasarlandı </span>
              <span className="block lg:inline font-montserrat font-light text-[1.5em] mx-8">X</span>
              <span>CITY&apos;S</span>
            </h2>
          </FadeInOnScroll>
        </div>
      </section>
      <section className="bg-white z-30">
        {items.map((item, i) => (
          <MembersClubItem
            key={i}
            item={item}
            align={i % 2 === 0 ? "ltr" : "rtl"}
            className={i % 2 === 0 ? "bg-white" : "bg-unbleached"}
            sectionId={item.sectionId as string}
          />
        ))}
      </section>
    </>
  )
}
