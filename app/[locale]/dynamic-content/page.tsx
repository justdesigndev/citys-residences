import CitysLivingPage from '@/components/sections/citys-living'
import CitysMembersClubPage from '@/components/sections/citys-members-club'
import CitysParkPage from '@/components/sections/citys-park'

export default async function Page({ params }: { params: { locale: string } }) {
  return (
    <>
      <CitysParkPage params={params} />
      <CitysMembersClubPage params={params} />
      <CitysLivingPage params={params} />
    </>
  )
}
