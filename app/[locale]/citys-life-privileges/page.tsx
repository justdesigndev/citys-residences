import { useTranslations } from "next-intl"

import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { ScaleOut } from "@/components/animations/scale-out"
import { IconCitysLifeLogo, IconCitysParkBgLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { MembersClubItem } from "@/components/members-club-item"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { citysLifeVideo } from "@/lib/constants"

export default function Page() {
  const t = useTranslations("citys-life")
  const items = [
    {
      title: t("items.i1.title"),
      subtitle: t("items.i1.spot"),
      description: t("items.i1.text"),
      url: ["/img/citys-life/01.jpg"],
    },
    {
      title: t("items.i2.title"),
      subtitle: t("items.i2.spot"),
      description: t("items.i2.text"),
      url: ["/img/citys-life/02.jpg"],
    },
    {
      title: t("items.i3.title"),
      subtitle: t("items.i3.spot"),
      description: t("items.i3.text"),
      url: ["/img/citys-life/03.jpg"],
    },
    {
      title: t("items.i4.title"),
      subtitle: t("items.i4.spot"),
      description: t("items.i4.text"),
      url: ["/img/citys-life/04.jpg"],
    },
    {
      title: t("items.i5.title"),
      subtitle: t("items.i5.spot"),
      description: t("items.i5.text"),
      url: ["/img/citys-life/05.jpg"],
    },
    {
      title: t("items.i6.title"),
      subtitle: t("items.i6.spot"),
      description: t("items.i6.text"),
      url: ["/img/citys-life/06.jpg"],
    },
    {
      title: t("items.i7.title"),
      subtitle: t("items.i7.spot"),
      description: t("items.i7.text"),
      url: ["/img/citys-life/07.jpg"],
    },
  ]
  return (
    <Wrapper>
      <section className="relative h-svh bg-bricky-brick z-10 overflow-hidden">
        <ScaleOut>
          <Video
            primaryVideoUrl={citysLifeVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </ScaleOut>
      </section>
      <section className="relative z-20 bg-white py-5">
        <div className="w-full h-[30vh] lg:h-[35vh] xl:h-[50vh] 2xl:h-[60vh]">
          <FadeInOnScroll duration={1.5}>
            <IconCitysParkBgLogo fill="#000" />
          </FadeInOnScroll>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bt:h-60">
          <FadeInOnScroll duration={0.5}>
            <IconCitysLifeLogo fill="#000000" />
          </FadeInOnScroll>
        </div>
      </section>
      <section className="relative z-20 bg-white">
        {items.map((item, i) => (
          <MembersClubItem key={i} item={item} align={i % 2 === 0 ? "ltr" : "rtl"} />
        ))}
      </section>
      <LinkToPage
        previous={{ title: "City's Members Club", href: "/citys-members-club" }}
        next={{ title: "City's İstanbul AVM", href: "/citys-istanbul-avm" }}
      />
    </Wrapper>
  )
}
