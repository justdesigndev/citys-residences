import { FormValues } from '@/components/form-contact'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

// Build an E.164 phone number from the national number + dial code.
// The phone input uses `disableDialCodeAndPrefix`, so `phone` is the national
// number only and `countryCode` holds the dial code (e.g. "+90").
function toE164(phone: string, countryCode: string): string {
  const national = (phone || '').replace(/\D/g, '').replace(/^0+/, '')
  const cc = (countryCode || '').trim()
  const normalizedCc = cc.startsWith('+') ? cc : `+${cc.replace(/\D/g, '')}`
  if (!national) return ''
  return `${normalizedCc}${national}`
}

async function sha256Hex(value: string): Promise<string> {
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(value)
  )
  return Array.from(new Uint8Array(buffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Pushes a `form_submission` event to GTM's dataLayer after a successful
 * contact form submission. All values are read dynamically from the submitted
 * form data; email and phone are SHA-256 hashed before being sent.
 *
 * Must be called with the original submitted values before the form resets.
 */
export async function pushFormSubmission(data: FormValues): Promise<void> {
  if (typeof window === 'undefined') return

  try {
    const normalizedEmail = (data.email || '').trim().toLowerCase()
    const e164Phone = toE164(data.phone, data.countryCode)

    const [emailHash, phoneHash] = await Promise.all([
      normalizedEmail ? sha256Hex(normalizedEmail) : Promise.resolve(''),
      e164Phone ? sha256Hex(e164Phone) : Promise.resolve(''),
    ])

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'form_submission',
      user_data: {
        email: emailHash,
        phone: phoneHash,
      },
    })
  } catch (error) {
    // Analytics must never break the success flow.
    console.error('Failed to push form_submission to dataLayer:', error)
  }
}
