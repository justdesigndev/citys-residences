import { InfiniteScrollingCards } from "@/components/infinite-scrolling-cards"

export default async function Page() {
  const items4 = [
    { src: "/img/test-carousel/1.jpg", text: "CITY'S RESIDENCES" },
    { src: "/img/test-carousel/2.jpg", text: "DAİRE PLANI" },
    { src: "/img/test-carousel/3.jpg", text: "HİZMETLER" },
    { src: "/img/test-carousel/4.jpg", text: "MASTERPLAN" },
    { src: "/img/test-carousel/5.jpg", text: "ÖDEME PLANI" },
    { src: "/img/test-carousel/6.jpg", text: "GALERİ" },
  ]

  const manyItems = [...items4, ...items4, ...items4, ...items4, ...items4]

  return (
    <div className='relative h-screen w-screen z-[var(--z-test-page)] bg-white'>
      <InfiniteScrollingCards items={manyItems} />
    </div>
  )
}
