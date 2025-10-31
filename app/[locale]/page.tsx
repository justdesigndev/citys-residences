import { Wrapper } from '@/components/wrapper'

import CitysIstanbulAvm from '@/components/sections/citys-istanbul-avm'
// import CitysLivingPage from '@/components/sections/citys-living'
// import CitysMembersClubPage from '@/components/sections/citys-members-club'
// import CitysParkPage from '@/components/sections/citys-park'
import { CitysTimes } from '@/components/sections/citys-times'
import Home from '@/components/sections/home'
import ProjectSection from '@/components/sections/project'
import ResidencesSection from '@/components/sections/residences'

export default async function Page({ params }: { params: { locale: string } }) {
  return (
    <>
      <Wrapper>
        <Home params={params} />
        <ProjectSection params={params} />
        <ResidencesSection params={params} />
        {/* <CitysParkPage params={params} />
        <CitysMembersClubPage params={params} />
        <CitysLivingPage params={params} /> */}
        <CitysIstanbulAvm />
        <CitysTimes />
      </Wrapper>
    </>
  )
}
