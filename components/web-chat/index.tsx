'use client'

import Script from 'next/script'

export function WebChat() {
  return (
    <>
      <Script
        src='https://cdn.jsdelivr.net/gh/msuatafdeneme-art/crr-wcht@main/web-chat.js'
        strategy='afterInteractive'
        onLoad={() => {
          if (typeof window !== 'undefined' && window.WebChat) {
            new window.WebChat({
              position: 'bottom-right',
            })
          }
        }}
      />
    </>
  )
}

declare global {
  interface Window {
    WebChat: new (config: { position: string }) => void
  }
}
