import { PageTitle } from '@/components/page-title'
import {
  ComponentType,
  RepetitiveSectionsWrapper,
} from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { SectionSetter } from '@/components/section-setter'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'
import { useTranslations } from 'next-intl'

interface CitysLivingProps {
  data: Array<{
    id: string | number
    componentType: ComponentType
    title?: string
    subtitle?: string
    description?: string
    mediaId?: string
    thumbnail?: string
    aspectRatio?: number
  }>
}

export default function CitysLiving({ data }: CitysLivingProps) {
  const t = useTranslations('citys-living')

  return (
    <SectionSetter sectionId={navigationConfig['/citys-living']?.id as string}>
      <PageTitle
        primaryColor={colors['verve-violet']}
        secondaryColor={colors.white}
        title={
          <>
            <span className='block'>CITY&apos;S</span>
            <span className='block'>LIVING</span>
          </>
        }
        description={t('description')}
        id={navigationConfig['/citys-living']?.id as string}
        bgImage='/img/backgrounds/verve-violet.png'
      />
      <div
        style={
          {
            '--bg-color': colors['verve-violet'],
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
            thumbnail={item.thumbnail}
            videoAspectRatio={item.aspectRatio}
          />
        ))}
      </div>
    </SectionSetter>
  )
}
