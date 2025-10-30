import { Wrapper } from '@/components/wrapper'

import CitysIstanbulAvm from '@/components/sections/citys-istanbul-avm'
import CitysLiving from '@/components/sections/citys-living'
import CitysMembersClub from '@/components/sections/citys-members-club'
import CitysPark from '@/components/sections/citys-park'
import { CitysTimes } from '@/components/sections/citys-times'
import HomePage from '@/components/sections/home'
import ProjectPage from '@/components/sections/project'
import ResidencesPage from '@/components/sections/residences'
import {
  fetchCitysLivingData,
  fetchCitysMembersClubData,
  fetchCitysParkData,
} from '@/lib/api/queries'

export default async function Page({ params }: { params: { locale: string } }) {
  const citysParkData = await fetchCitysParkData(params.locale)
  const citysParkDataItems = citysParkData.data || []
  const citysMembersClubData = await fetchCitysMembersClubData(params.locale)
  const citysMembersClubDataItems = citysMembersClubData.data || []
  const citysLivingData = await fetchCitysLivingData(params.locale)
  const citysLivingDataItems = citysLivingData.data || []
  return (
    <Wrapper>
      <HomePage params={params} />
      <ProjectPage />
      <ResidencesPage params={params} />
      <CitysPark data={citysParkDataItems} />
      <CitysMembersClub data={citysMembersClubDataItems} />
      <CitysLiving data={citysLivingDataItems} />
      <CitysIstanbulAvm />
      <CitysTimes />
    </Wrapper>
  )
}
