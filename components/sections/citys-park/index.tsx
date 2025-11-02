import { PageTitle } from '@/components/page-title'
import {
  RepetitiveSectionsWrapper,
  ComponentType,
} from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { SectionSetter } from '@/components/section-setter'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'
import { useTranslations } from 'next-intl'

interface CitysParkProps {
  data: Array<{
    id: string | number
    componentType: ComponentType
    width?: number
    height?: number
    aspectRatio?: number
    title?: string
    subtitle?: string
    description?: string
    mediaId?: string
    thumbnail?: string
  }>
}

export default function CitysPark({ data }: CitysParkProps) {
  const t = useTranslations('citys-park')

  return (
    <SectionSetter sectionId={navigationConfig['/citys-park']?.id as string}>
      <PageTitle
        primaryColor={colors['army-canvas']}
        secondaryColor={colors.white}
        title="CITY'S PARK"
        description={t('description')}
        id={navigationConfig['/citys-park']?.id as string}
        stopColor1={colors['white']}
        stopColor2={colors['army-canvas']}
        bgClassName='mix-blend-soft-light opacity-50'
      />
      <div
        style={
          {
            '--bg-color': colors['army-canvas'],
            '--text-color': colors.white,
          } as React.CSSProperties
        }
      >
        {data.map(item => (
          <RepetitiveSectionsWrapper
            key={item.id}
            componentType={item.componentType}
            title={item.title}
            subtitle={item.subtitle}
            description={item.description}
            mediaId={item.mediaId}
            videoAspectRatio={item.aspectRatio}
            thumbnail={item.thumbnail}
          />
        ))}
      </div>
    </SectionSetter>
  )
}
