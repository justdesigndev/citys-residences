import CitysLiving from '@/components/sections/citys-living'
import CitysMembersClub from '@/components/sections/citys-members-club'
import CitysPark from '@/components/sections/citys-park'

export default async function Page({ params }: { params: { locale: string } }) {
  return (
    <>
      <CitysPark params={params} />
      <CitysMembersClub params={params} />
      <CitysLiving params={params} />
    </>
  )
}
