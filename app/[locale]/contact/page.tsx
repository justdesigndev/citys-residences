import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { ContactForm } from '@/components/form-contact'
import { FormTranslations } from '@/types'
import { Wrapper } from '@/components/wrapper'

export default function Contact() {
  const t = useTranslations('contact')

  const formTranslations: FormTranslations = {
    inputs: {
      name: {
        placeholder: t('form.inputs.name.placeholder'),
        label: t('form.inputs.name.label'),
        errors: { required: t('form.inputs.name.errors.required') },
      },
      surname: {
        placeholder: t('form.inputs.surname.placeholder'),
        label: t('form.inputs.surname.label'),
        errors: { required: t('form.inputs.surname.errors.required') },
      },
      phone: {
        placeholder: t('form.inputs.phone.placeholder'),
        label: t('form.inputs.phone.label'),
        errors: {
          min: t('form.inputs.phone.errors.min'),
          max: t('form.inputs.phone.errors.max'),
          required: t('form.inputs.phone.errors.required'),
        },
      },
      email: {
        placeholder: t('form.inputs.email.placeholder'),
        label: t('form.inputs.email.label'),
        errors: {
          required: t('form.inputs.email.errors.required'),
          email: t('form.inputs.email.errors.email'),
        },
      },
      residenceType: {
        placeholder: t('form.inputs.residenceType.placeholder'),
        label: t('form.inputs.residenceType.label'),
        errors: {
          required: t('form.inputs.residenceType.errors.required'),
        },
      },
      howDidYouHearAboutUs: {
        placeholder: t('form.inputs.howDidYouHearAboutUs.placeholder'),
        label: t('form.inputs.howDidYouHearAboutUs.label'),
        errors: {
          required: t('form.inputs.howDidYouHearAboutUs.errors.required'),
        },
        options: {
          reference: t('form.inputs.howDidYouHearAboutUs.options.reference'),
          projectVisit: t(
            'form.inputs.howDidYouHearAboutUs.options.projectVisit'
          ),
          internetSocialMedia: t(
            'form.inputs.howDidYouHearAboutUs.options.internetSocialMedia'
          ),
          billboard: t('form.inputs.howDidYouHearAboutUs.options.billboard'),
          newspaperMagazine: t(
            'form.inputs.howDidYouHearAboutUs.options.newspaperMagazine'
          ),
        },
      },
      contactPreference: {
        placeholder: t('form.inputs.contactPreference.placeholder'),
        errors: {
          required: t('form.inputs.contactPreference.errors.required'),
        },
      },
      contactPreferenceOptions: {
        sms: t('form.inputs.contactPreferenceOptions.sms'),
        email: t('form.inputs.contactPreferenceOptions.email'),
        phone: t('form.inputs.contactPreferenceOptions.phone'),
      },
      message: { placeholder: t('form.inputs.message.placeholder') },
      consent: {
        placeholder: t('form.inputs.consent.placeholder'),
        errors: {
          required: t('form.inputs.consent.errors.required'),
        },
      },
      consentElectronicMessage: {
        placeholder: t('form.inputs.consentElectronicMessage.placeholder'),
        errors: {
          required: t('form.inputs.consentElectronicMessage.errors.required'),
        },
      },
      consentSms: {
        placeholder: t('form.inputs.consentSms.placeholder'),
      },
      consentEmail: {
        placeholder: t('form.inputs.consentEmail.placeholder'),
      },
      consentPhone: {
        placeholder: t('form.inputs.consentPhone.placeholder'),
      },
    },
    submit: {
      default: t('form.submit.default'),
      sending: t('form.submit.sending'),
    },
    messages: {
      error: t('form.messages.error'),
      success: t('form.messages.success'),
      successDialog: {
        title: t('form.messages.successDialog.title'),
        description: t('form.messages.successDialog.description'),
        button: t('form.messages.successDialog.button'),
      },
    },
  }

  // const video = (
  //   <Video
  //     primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891"
  //     autoPlay
  //     loop
  //     muted
  //     playsInline
  //     className="w-full h-full object-cover"
  //   />
  // )

  return (
    <Wrapper>
      <div className='mt-[var(--header-height)] flex grid-cols-2 flex-col bd:grid'>
        <div className='col-span-1 flex flex-col'>
          <div className='flex flex-col items-center justify-center gap-6 px-4 pb-8 bt:gap-8 bt:px-12 bt:pb-0 bd:items-start'>
            <div className='col-span-1 -mx-4 flex items-center justify-center px-4 py-4 bt:-mx-12 bt:px-64 bt:py-8 bd:hidden bd:px-32'>
              <Image
                src='/img/yasama-sanati.png'
                alt='Contact Form Image'
                width={1500}
                height={1500}
              />
            </div>
            <h2 className='text-left font-primary text-base font-normal leading-normal text-neutral-900 bt:text-center bt:text-sm bd:text-left'>
              {t.rich('description', {
                br: () => <br className='hidden bt:block' />,
              })}
            </h2>
            <div className='pb-12 bt:px-12 bt:pb-0 bd:px-0 bd:pb-12'>
              <ContactForm translations={formTranslations} />
            </div>
          </div>
        </div>
        <div className='col-span-1 items-center px-16 bd:flex'>
          <Image
            src='/img/yasama-sanati.png'
            alt='Contact Form Image'
            width={1500}
            height={1500}
          />
        </div>
      </div>
    </Wrapper>
  )
}
