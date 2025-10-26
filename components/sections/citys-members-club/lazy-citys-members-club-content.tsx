'use client'

import { RepetitiveSectionsWrapper } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { CitysMembersClubData } from '@/lib/api/queries'

interface LazyCitysMembersClubContentProps {
  data: CitysMembersClubData[]
}

export function LazyCitysMembersClubContent({
  data,
}: LazyCitysMembersClubContentProps) {
  return (
    <>
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
