import { HorizontalScroll } from "@/components/horizontal-scroll"
import { Img } from "@/components/utility/img"
import { MainLayout } from "@/layouts/main-layout"

export default function Home() {
  return (
    <MainLayout headerVariant="v2">
      <section className="h-screen w-screen bg-bricky-brick relative">
        <Img src="/img/hero.jpg" alt="City's Residences Istanbul" fill className="object-cover" />
      </section>
      {/* <section>
        <ScaleGrid
          images={[
            "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6",
            "https://images.unsplash.com/photo-1511818966892-d7d671e672a2",
            "https://images.unsplash.com/photo-1486325212027-8081e485255e",
            "https://images.unsplash.com/photo-1478860409698-8707f313ee8b",
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
            "https://images.unsplash.com/photo-1464146072230-91cabc968266",
          ]}
        />
      </section> */}
      <section className="h-screen w-screen bg-stone-100"></section>
      <section className="h-screen w-screen bg-stone-200"></section>
      <div className="relative">
        <HorizontalScroll />
      </div>
      <section className="h-screen w-screen bg-slate-400"></section>
      <section className="h-screen w-screen bg-slate-500"></section>
      <section className="h-screen w-screen bg-slate-600"></section>
      <section className="h-screen w-screen bg-slate-700"></section>
    </MainLayout>
  )
}
