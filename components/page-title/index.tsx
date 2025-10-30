import { cn } from '@/lib/utils'

import { GsapSplitText } from '@/components/gsap-split-text'
import { LogoSlim } from '@/components/icons'
import { SvgBgC } from '@/components/svgs/svg-bg-c'
import { navigationConfig } from '@/lib/constants'

export interface PageTitleProps {
  title: React.ReactNode
  description: React.ReactNode
  id: NonNullable<
    (typeof navigationConfig)[keyof typeof navigationConfig]
  >['id']
  className?: string
  primaryColor?: string
  secondaryColor?: string
  tertiaryColor?: string
}

export function PageTitle(props: PageTitleProps) {
  const {
    title,
    description,
    id,
    className,
    primaryColor,
    secondaryColor,
    tertiaryColor,
  } = props
  return (
    <div
      style={
        {
          '--color-primary': primaryColor,
          '--color-secondary': secondaryColor,
          '--color-tertiary': tertiaryColor,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          'relative z-30 flex min-h-screen items-center justify-center overflow-hidden xl:min-h-[120vh]',
          'before:absolute before:left-0 before:top-0 before:z-10 before:h-3/6 before:w-full before:bg-gradient-to-b before:from-[var(--color-primary)] before:to-transparent',
          'after:absolute after:bottom-0 after:left-0 after:z-10 after:h-3/6 after:w-full after:bg-gradient-to-t after:from-[var(--color-primary)] after:to-transparent',
          className
        )}
        id={id}
        style={{ backgroundColor: primaryColor }}
      >
        <SvgBgC
          stopColor1={primaryColor || ''}
          stopColor2={secondaryColor || ''}
          className='absolute left-1/2 top-1/2 z-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 xl:h-auto xl:w-full'
        />
        <div className='z-40 flex flex-shrink-0 flex-col items-center justify-center gap-6 lg:gap-6'>
          <span className='size-24 lg:size-24'>
            <LogoSlim fill={secondaryColor} />
          </span>
          <h2
            className={cn(
              'text-center font-primary font-[500]',
              'text-3xl/tight tracking-[0.4em] lg:text-5xl/tight xl:text-4xl/tight 2xl:text-4xl/tight'
            )}
            style={{ color: secondaryColor }}
          >
            <GsapSplitText type='chars' stagger={0.02} duration={1}>
              {title}
            </GsapSplitText>
          </h2>
          <p
            className={cn(
              'text-center font-primary font-[300]',
              'text-xl/snug lg:text-2xl/snug xl:text-2xl/snug 2xl:text-3xl/snug',
              'w-[90vw] md:w-[60vw] lg:w-[60vw] xl:w-[40vw] 2xl:w-[40vw] 3xl:w-[40vw]'
            )}
            style={{ color: secondaryColor }}
          >
            <GsapSplitText type='lines' stagger={0.01} duration={1}>
              {description}
            </GsapSplitText>
          </p>
        </div>
      </div>
    </div>
  )
}
