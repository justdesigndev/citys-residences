import dynamic from 'next/dynamic'

import { Wrapper } from '@/components/wrapper'

const CitysPark = dynamic(() => import('@/components/sections/citys-park'), {
  ssr: false,
})
const CitysMembersClub = dynamic(
  () => import('@/components/sections/citys-members-club'),
  { ssr: false }
)
const CitysLiving = dynamic(
  () => import('@/components/sections/citys-living'),
  {
    ssr: false,
  }
)

export default function Page() {
  return (
    <Wrapper>
      <CitysPark />
      <CitysMembersClub />
      <CitysLiving />
    </Wrapper>
  )
}
