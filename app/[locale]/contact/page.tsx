import { ContactPage } from '@/components/contact-page'
import { getCountries } from '@/lib/api/countries'
import { FormTranslations } from '@/types'
import { getMessages } from 'next-intl/server'

export default async function ContactRoute({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const messages = await getMessages({ locale })
  const countries = getCountries()
  type ContactMessages = { contact: { form: FormTranslations } }
  const formTranslations = (messages as unknown as ContactMessages).contact.form

  return (
    <ContactPage formTranslations={formTranslations} countries={countries} />
  )
}
