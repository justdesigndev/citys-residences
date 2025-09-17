import { InfiniteScrollingCards } from "@/components/infinite-scrolling-cards"

export default async function Page() {
  const items4 = [{ src: "/img/slides-1/1.jpg" }, { src: "/img/slides-1/2.jpg" }, { src: "/img/slides-1/3.jpg" }]

  const manyItems = [
    ...items4,
    ...items4,
    ...items4,
    ...items4,
    ...items4,
    ...items4,
    ...items4,
    ...items4,
    ...items4,
    ...items4,
  ]

  return (
    <div className='relative h-screen w-screen z-[var(--z-test-page)] bg-white'>
      <InfiniteScrollingCards items={manyItems} />
    </div>
  )
}
