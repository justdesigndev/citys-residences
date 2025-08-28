import { Img } from "@/components/utility/img"
import { navigationConfig } from "@/lib/constants"
import { Content } from "./content"
// import { fetchEvents, getEventImageUrl } from "@/lib/api/queries"

export default async function Page() {
  // { params }: { params: { locale: string } }
  //const { locale } = params
  // const eventsResponse = await fetchEvents(locale)
  // const events = eventsResponse.success ? eventsResponse.data || [] : []

  return (
    <>
      <section className="h-[35vw] relative overflow-hidden" id={navigationConfig["/citys-times"]?.id as string}>
        <Img
          className="object-cover w-full h-full"
          src="/img/citys-times-banner.jpg"
          alt="Citys Times"
          fill
          sizes="100vw"
          loading="lazy"
        />
      </section>
      <Content />
    </>
  )
}
