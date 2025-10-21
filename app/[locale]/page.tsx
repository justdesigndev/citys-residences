import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Wrapper } from '@/components/wrapper'
// import { LazyHomeSection } from "@/components/lazy-home-section"

import Home from './home/page'
import Project from './project/page'

export default function Page({ params }: { params: { locale: string } }) {
  return (
    <>
      <Header />
      <Wrapper>
        <Home params={params} />
        <Project />
        {/* <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} />
        <LazyHomeSection params={params} /> */}
      </Wrapper>
      <Footer />
    </>
  )
}
