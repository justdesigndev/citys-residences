'use client'

import { ContactFormSuccessScreen } from '@/components/contact-form-success-screen'
import { ContactForm } from '@/components/form-contact'
import { Logo } from '@/components/icons'
import { useFadeoutWithTimeout } from '@/hooks/useFadeoutWithTimeout'
import { FormTranslations } from '@/types'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

interface ContactPageProps {
  formTranslations: FormTranslations
}

export function ContactPage({ formTranslations }: ContactPageProps) {
  const t = useTranslations()
  const locale = useLocale()
  const [isFormSuccess, handleFormSuccess] = useFadeoutWithTimeout(3000)

  return (
    <main className='min-h-screen bg-gradient-appointment px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20 xl:px-24 xl:py-24 2xl:px-32'>
      <ContactFormSuccessScreen isVisible={isFormSuccess} centered />

      <div className='mx-auto w-full max-w-[1440px]'>
        <div className='mb-12 flex items-start justify-between gap-8 lg:mb-16'>
          <div className='min-w-0 max-w-lg flex-1'>
            <h1 className='mb-4 font-primary text-3xl font-[400] leading-tight text-white sm:text-4xl lg:text-6xl'>
              {t('contact.form.title')}
            </h1>
            <p className='font-primary text-base font-[300] leading-snug text-white lg:text-xl'>
              {t.rich('contact.description', {
                br: () => <br />,
              })}
            </p>
          </div>

          <Link
            href={`/${locale}`}
            aria-label={t('common.navigation.home')}
            className='block h-[68px] w-24 shrink-0 transition-opacity duration-300 hover:opacity-70 sm:h-20 sm:w-28 lg:h-24 lg:w-32'
          >
            <Logo fill='white' />
          </Link>
        </div>

        <ContactForm
          translations={formTranslations}
          onSuccess={handleFormSuccess}
        />
      </div>
    </main>
  )
}
