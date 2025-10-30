import { PageTitle } from '@/components/page-title'
import {
  RepetitiveSectionsWrapper,
  ComponentType,
} from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

interface CitysMembersClubProps {
  data: Array<{
    id: string | number
    componentType: ComponentType
    title?: string
    subtitle?: string
    description?: string
    mediaId?: string
    thumbnail?: string
  }>
}

export default function CitysMembersClub({ data }: CitysMembersClubProps) {
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
      {data.map(item => (
        <RepetitiveSectionsWrapper
          key={item.id}
          componentType={item.componentType}
          title={item.title}
          subtitle={item.subtitle}
          description={item.description}
          mediaId={item.mediaId}
          thumbnail={item.thumbnail}
        />
      ))}
    </>
  )
}
