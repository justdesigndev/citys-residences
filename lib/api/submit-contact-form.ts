import { FormValues } from '@/components/form-contact'
import { getUtmParameter } from '@/lib/utils'

const WEBSITE_BY_HOSTNAME: Record<string, string> = {
  'justwork.citysresidences.com': 'justwork',
  'allianz.citysresidences.com': 'allianz',
  'allianztower.citysresidences.com': 'allianztower',
}

function getWebsiteValue(hostname: string) {
  return WEBSITE_BY_HOSTNAME[hostname.toLowerCase()] ?? ''
}

export async function submitContactForm(data: FormValues, locale: string) {
  const formData = new FormData()

  // Convert all form values to FormData
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value?.toString() ?? '')
  })

  // Add current language to formData
  formData.append('language', locale)

  // Add UTM parameters to formData
  formData.append('utm_source', getUtmParameter('utm_source'))
  formData.append('utm_medium', getUtmParameter('utm_medium'))
  formData.append('utm_campaign', getUtmParameter('utm_campaign'))

  // Add complete URL to formData
  formData.append('url', window.location.href)
  formData.append('website', getWebsiteValue(window.location.hostname))

  const response = await fetch(
    'https://panel.citysresidences.com/api/lead.php',
    {
      method: 'POST',
      body: formData,
    }
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to submit form')
  }

  if (!result.success) {
    throw new Error(result.message)
  }

  return result
}
