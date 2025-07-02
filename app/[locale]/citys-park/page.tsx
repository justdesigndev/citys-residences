import { useTranslations } from "next-intl"

import { FadeInOnScroll } from "@/components/animations/fade-in-on-scroll"
import { ScaleOut } from "@/components/animations/scale-out"
import { IconCitysParkBgLogo, IconCitysParkLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { MembersClubItem } from "@/components/members-club-item"
import { Video } from "@/components/utility/video"
import { VideoWithPlayButton } from "@/components/utility/video-with-play-button"
import { Wrapper } from "@/components/wrapper"
import { citysParkVideo, pinarVeCemilAktasVideo } from "@/lib/constants"

export default function Page() {
  const t = useTranslations("citys-park")

  const items = [
    {
      title: t("items.i1.title"),
      description: t("items.i1.text"),
      url: ["/img/citys-park/01.jpg"],
    },
    {
      title: t("items.i6.title"),
      description: t("items.i6.text"),
      url: ["/img/citys-park/06.jpg"],
    },
    {
      title: t("items.i2.title"),
      description: t("items.i2.text"),
      url: ["/img/citys-park/02.jpg"],
    },
    {
      title: t("items.i3.title"),
      description: t("items.i3.text"),
      url: ["/img/citys-park/03.jpg"],
    },
    {
      title: t("items.i4.title"),
      description: t("items.i4.text"),
      url: ["/img/citys-park/04.jpg"],
    },
    {
      title: t("items.i5.title"),
      description: t("items.i5.text"),
      url: ["/img/citys-park/05.jpg"],
    },
  ]

  return (
    <Wrapper>
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
        <div className="w-full h-[30vh] lg:h-[35vh] xl:h-[50vh] 2xl:h-[60vh]">
          <FadeInOnScroll duration={1.5}>
            <IconCitysParkBgLogo fill="#000" />
          </FadeInOnScroll>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bt:h-60">
          <FadeInOnScroll duration={0.5}>
            <IconCitysParkLogo fill="#5D7261" />
          </FadeInOnScroll>
        </div>
      </section>
      <section className="relative z-20 bg-white mb-20">
        {items.map((item, i) => (
          <MembersClubItem key={i} item={item} align={i % 2 === 0 ? "ltr" : "rtl"} />
        ))}
      </section>
      <section className="relative section-container">
        <div className="w-full h-[350px] bt:h-auto bt:aspect-video relative z-10 flex items-center justify-center bg-black">
          <VideoWithPlayButton
            primaryVideoUrl={pinarVeCemilAktasVideo}
            thumbnail="/img/thumbnail-pinar-cemil-aktas.jpg"
            title="Peyzaj: Bir Vaha Tasarımı..."
          />
        </div>
      </section>
      <LinkToPage
        previous={{ title: "Daireler", href: "/residences" }}
        next={{ title: "City's Members Club", href: "/citys-members-club" }}
      />
    </Wrapper>
  )
}
