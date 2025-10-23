'use client'

import { RepetitiveSectionsWrapper } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { CitysParkData } from '@/lib/api/queries'

interface LazyCitysParkContentProps {
  data: CitysParkData[]
}

export function LazyCitysParkContent({ data }: LazyCitysParkContentProps) {
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
