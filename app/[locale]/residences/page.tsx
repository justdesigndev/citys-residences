import { AnimatedLine } from "@/components/animated-line"
import { ScaleOut } from "@/components/animations/scale-out"
import { Logo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"
import { Sequenced } from "@/components/sequenced"
import { StackingCards } from "@/components/stacking-cards"
import { Video } from "@/components/utility/video"
import { VideoSection } from "@/components/video-section"
import { Wrapper } from "@/components/wrapper"
import { melihBulgurVideo, mustafaTonerVideo, residencesVideo } from "@/lib/constants"
import { colors } from "@/styles/config.mjs"

export default function Page() {
  const items = [
    {
      title: "1+1 Daire",
      description: "“Şehir hayatına konforlu bir dokunuş: Kendi köşen, kendi ritmin.”",
      images: [
        {
          url: "/img/residences/1+1/plan.jpg",
        },
        {
          url: "/img/residences/1+1/interior.jpg",
        },
      ],
      bg: "#fbfbfb",
    },
    {
      title: "2+1 Daire",
      description: "“Modern profesyoneller için hem çalışmaya hem yaşamaya ilham veren bir düzen.”",
      images: [
        {
          url: "/img/residences/2+1/plan.jpg",
        },
        {
          url: "/img/residences/2+1/interior.jpg",
        },
      ],
      bg: "#fffdfd",
    },
    {
      title: "3+1 Daire",
      description: "“Büyüyen hikâyeler ve köklenen yaşamlar için geniş bir dünya.”",
      images: [
        {
          url: "/img/residences/3+1/plan.jpg",
        },
        {
          url: "/img/residences/3+1/interior.jpg",
        },
      ],
      bg: "#ffffff",
    },
    {
      title: "4+1 Daire",
      description: "“Büyüyen hikâyeler ve köklenen yaşamlar için geniş bir dünya.”",
      images: [
        {
          url: "/img/residences/3+1/plan.jpg",
        },
        {
          url: "/img/residences/3+1/interior.jpg",
        },
      ],
      bg: "#ffffff",
    },
    {
      title: "5+1 Daire",
      description: "“Büyüyen hikâyeler ve köklenen yaşamlar için geniş bir dünya.”",
      images: [
        {
          url: "/img/residences/3+1/plan.jpg",
        },
        {
          url: "/img/residences/3+1/interior.jpg",
        },
      ],
      bg: "#ffffff",
    },
    {
      title: "6+1 Daire",
      description: "“Büyüyen hikâyeler ve köklenen yaşamlar için geniş bir dünya.”",
      images: [
        {
          url: "/img/residences/3+1/plan.jpg",
        },
        {
          url: "/img/residences/3+1/interior.jpg",
        },
      ],
      bg: "#ffffff",
    },
    {
      title: "City's Park Daireleri",
      description: "“Büyüyen hikâyeler ve köklenen yaşamlar için geniş bir dünya.”",
      images: [
        {
          url: "/img/residences/3+1/plan.jpg",
        },
        {
          url: "/img/residences/3+1/interior.jpg",
        },
      ],
      bg: "#ffffff",
    },
    {
      title: "Teras Evler",
      description: "“Büyüyen hikâyeler ve köklenen yaşamlar için geniş bir dünya.”",
      images: [
        {
          url: "/img/residences/3+1/plan.jpg",
        },
        {
          url: "/img/residences/3+1/interior.jpg",
        },
      ],
      bg: "#ffffff",
    },
    {
      title: "Penthouse",
      description: "“Büyüyen hikâyeler ve köklenen yaşamlar için geniş bir dünya.”",
      images: [
        {
          url: "/img/residences/3+1/plan.jpg",
        },
        {
          url: "/img/residences/3+1/interior.jpg",
        },
      ],
      bg: "#ffffff",
    },
  ]

  return (
    <Wrapper>
      <SectionsMenuInitializer sections={Object.values([])} />
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
        <ScaleOut>
          <Video
            primaryVideoUrl={residencesVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </ScaleOut>
      </section>
      <section className="bg-white relative z-30 py-12 lg:py-20 2xl:py-28">
        <div className="w-full h-40 lg:h-64 mx-auto ">
          <Logo fill={colors["bricky-brick"]} />
        </div>
      </section>
      <section className="bg-white relative z-30 py-12">
        <div className="section-container">
          <VideoSection
            primaryVideoUrl={mustafaTonerVideo}
            thumbnail="/img/thumbnail-toners.jpg"
            title="İç Mimari: Yaşam Konforu ve Kalitesi"
          />
        </div>
      </section>
      <AnimatedLine direction="horizontal" />
      <section className="hidden xl:block bg-white relative z-30 section-container">
        <Sequenced />
      </section>
      <section className="bg-white relative z-30 section-container py-12">
        <StackingCards items={items} />
      </section>
      <section className="section-container py-12">
        <VideoSection
          primaryVideoUrl={melihBulgurVideo}
          thumbnail="/img/thumbnail-melih-bulgur.jpg"
          title="Zemin Güvenliği: Huzur Mühendisliği"
        />
      </section>
      <AnimatedLine direction="horizontal" />
      <LinkToPage
        previous={{ title: "Proje", href: "/project" }}
        next={{ title: "City's Park", href: "/citys-park" }}
      />
    </Wrapper>
  )
}
