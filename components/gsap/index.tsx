'use client'

import gsap from 'gsap'
import { useLayoutEffect } from 'react'
import { ScrollTriggerConfig } from './scroll-trigger'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/all'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'

function GSAP({ scrollTrigger = false }) {
  useLayoutEffect(() => {
    gsap.defaults({ ease: 'none' })

    // Register plugins
    gsap.registerPlugin(SplitText, Flip)
  }, [])

  return scrollTrigger ? <ScrollTriggerConfig /> : null
}

export { ScrollTrigger, gsap, useGSAP, CustomEase, SplitText, Flip, GSAP }
