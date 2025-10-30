import CitysLiving from '@/components/sections/citys-living'
import CitysMembersClub from '@/components/sections/citys-members-club'
import CitysPark from '@/components/sections/citys-park'
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
    <>
      <CitysPark data={citysParkDataItems} />
      <CitysMembersClub data={citysMembersClubDataItems} />
      <CitysLiving data={citysLivingDataItems} />
    </>
  )
}
