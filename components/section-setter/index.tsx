'use client'

import { useSectionStore, useStore } from '@/lib/store/sections'
import { ScrollTrigger, useGSAP } from '@/components/gsap'
import { useRef } from 'react'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface SectionSetterProps {
  sectionId: string
  onEnter?: (sectionId: string) => void
  onLeave?: (sectionId: string) => void
  onEnterBack?: (sectionId: string) => void
  onLeaveBack?: (sectionId: string) => void
  children?: React.ReactNode
}

export function SectionSetter({
  children,
  sectionId,
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack,
}: SectionSetterProps) {
  const ref = useRef(null)
  const sectionStore = useSectionStore()

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top+=200px center',
      end: 'bottom center',
      onUpdate: self => {
        // Continuously check if scroll is within the markers (like Intersection Observer)
        // Only set if the current section is different to avoid unnecessary updates
        const currentSection = useStore.getState().currentSection
        if (self.isActive && currentSection !== sectionId) {
          sectionStore.setCurrentSection(sectionId)
        }
      },
      onEnter: () => {
        // Only set if different to avoid unnecessary updates
        const currentSection = useStore.getState().currentSection
        if (currentSection !== sectionId) {
          sectionStore.setCurrentSection(sectionId)
        }
        onEnter?.(sectionId)
      },
      onEnterBack: () => {
        // Only set if different to avoid unnecessary updates
        const currentSection = useStore.getState().currentSection
        if (currentSection !== sectionId) {
          sectionStore.setCurrentSection(sectionId)
        }
        onEnterBack?.(sectionId)
      },
      onLeave: () => {
        onLeave?.(sectionId)
      },
      onLeaveBack: () => {
        onLeaveBack?.(sectionId)
      },
    })
  })

  return <div ref={ref}>{children}</div>
}
