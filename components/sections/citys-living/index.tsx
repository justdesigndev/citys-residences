import { PageTitle } from '@/components/page-title'
import {
  RepetitiveSectionsWrapper,
  ComponentType,
} from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { navigationConfig } from '@/lib/constants'
import { colors } from '@/styles/config.mjs'

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
  return (
    <>
      <PageTitle
        primaryColor={colors['verve-violet']}
        secondaryColor={colors.white}
        title={
          <>
            <span className='block'>CITY&apos;S</span>
            <span className='block'>LIVING</span>
          </>
        }
        description='Artık her şey daha kolay.'
        id={navigationConfig['/citys-living']?.id as string}
        stopColor1={colors['white']}
        stopColor2={colors['verve-violet']}
        bgClassName='mix-blend-soft-light opacity-50'
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
    </>
  )
}
