'use client'

import { useUiStore } from '@/lib/store/ui'
import Script from 'next/script'
import { useEffect } from 'react'

interface WebChatProps {
  locale: string
}

export function WebChat({ locale }: WebChatProps) {
  const { setIsInquiryVisible } = useUiStore()
  useEffect(() => {
    // Wait for the chat window to be added to the DOM
    const checkForChatWindow = () => {
      const chatWindow = document.getElementById('cw-window')

      if (chatWindow) {
        // Check initial state
        const initiallyOpen = chatWindow.classList.contains('open')
        console.log('Chat window initial state - open:', initiallyOpen)

        if (initiallyOpen) {
          setIsInquiryVisible(false)
        } else {
          setIsInquiryVisible(true)
        }

        // Create a MutationObserver to watch for class changes
        const observer = new MutationObserver(mutations => {
          mutations.forEach(mutation => {
            if (
              mutation.type === 'attributes' &&
              mutation.attributeName === 'class'
            ) {
              const target = mutation.target as HTMLElement
              const hasOpenClass = target.classList.contains('open')

              if (hasOpenClass) {
                // Open class was added
                console.log('Chat window opened')
                setIsInquiryVisible(false)
              } else {
                // Open class was removed
                console.log('Chat window closed')
                setIsInquiryVisible(true)
              }
            }
          })
        })

        // Start observing the chat window for attribute changes
        observer.observe(chatWindow, {
          attributes: true,
          attributeFilter: ['class'],
        })

        // Cleanup function to disconnect observer
        return () => observer.disconnect()
      }
    }

    // Try to find the chat window immediately
    const cleanup = checkForChatWindow()
    if (cleanup) return cleanup

    // If not found, wait a bit for the script to load and create it
    const timeoutId = setTimeout(() => {
      checkForChatWindow()
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [setIsInquiryVisible])

  return (
    <>
      <Script
        id='webchat-script'
        src='https://webchat.citysresidences.com/WebChatWidgets/web-chat.js'
        strategy='afterInteractive'
        onLoad={() => {
          if (typeof window !== 'undefined' && window.WebChat) {
            new window.WebChat({
              position: 'bottom-right',
              lang: locale,
            })
          }
        }}
      />
    </>
  )
}

declare global {
  interface Window {
    WebChat: new (config: { position: string; lang?: string }) => void
  }
}
