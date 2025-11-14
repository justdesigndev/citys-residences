import en from './messages/en.json'

type Messages = typeof en

declare global {
  // Use type safe message keys with `next-intl`
  type IntlMessages = Messages

  // Video observer for optimized video playback
  interface Window {
    __videoObserver?: IntersectionObserver
  }
}
