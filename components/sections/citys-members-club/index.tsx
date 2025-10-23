import { PageTitle } from '@/components/page-title'
import { CitysMembersClubData } from '@/lib/api/queries'
import { colors } from '@/styles/config.mjs'
import { LazyCitysMembersClub } from './lazy-citys-members-club'
import { navigationConfig } from '@/lib/constants'

export function CitysMembersClub({
  data,
}: {
  data: CitysMembersClubData[]
}): React.ReactNode {
  return (
    <>
      <PageTitle
        primaryColor={colors['blue-shimmer']}
        secondaryColor={colors.black}
        title={
          <>
            <span className='block'>CITY&apos;S</span>
            <span className='block'>MEMBERS CLUB</span>
          </>
        }
        description='Sanat, spor ve sosyal ayrıcalıkların buluştuğu,özel bir yaşam alanı.'
        id={navigationConfig['/citys-members-club']?.id as string}
      />
      <LazyCitysMembersClub data={data} />
    </>
  )
}
