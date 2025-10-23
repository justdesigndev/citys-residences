'use client'

import { RepetitiveSectionsWrapper } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { CitysLivingData } from '@/lib/api/queries'

interface LazyCitysLivingContentProps {
  data: CitysLivingData[]
}

export function LazyCitysLivingContent({ data }: LazyCitysLivingContentProps) {
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
