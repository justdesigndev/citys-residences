import { PageTitle } from '@/components/page-title'
import { CitysParkData } from '@/lib/api/queries'
import { colors } from '@/styles/config.mjs'
import { LazyCitysPark } from './lazy-citys-park'
import { navigationConfig } from '@/lib/constants'

export function CitysPark({
  data,
}: {
  data: CitysParkData[]
}): React.ReactNode {
  return (
    <>
      <PageTitle
        primaryColor={colors['army-canvas']}
        secondaryColor={colors.white}
        title="CITY'S PARK"
        description='Şehrin kalbinde, sizi yavaşlatan, yeşil bir vaha...'
        id={navigationConfig['/citys-park']?.id as string}
      />
      <LazyCitysPark data={data} />
    </>
  )
}
