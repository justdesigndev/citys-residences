import { ContactPage } from '@/components/contact-page'
import { FormTranslations } from '@/types'
import { getMessages } from 'next-intl/server'

export default async function ContactRoute({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const messages = await getMessages({ locale })
  type ContactMessages = { contact: { form: FormTranslations } }
  const formTranslations = (messages as unknown as ContactMessages).contact.form

  return <ContactPage formTranslations={formTranslations} />
}
