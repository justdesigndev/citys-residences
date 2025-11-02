'use client'

import { useEffect } from 'react'
import { useSectionStore } from '@/lib/store/sections'

interface UseActiveSectionCallbacks {
  onEnter?: (section: string) => void
  onLeave?: (section: string, nextSection: string) => void
  onLeaveBack?: (section: string, prevSection: string) => void
}

/**
 * Returns the active section ID based on scroll-based section detection
 *
 * @example
 * ```tsx
 * const activeSection = useActiveSection()
 *
 * // With callbacks
 * useActiveSection({
 *   onEnter: (section) => console.log('Entered:', section),
 *   onLeave: (prev, next) => console.log('Left', prev, 'for', next),
 * })
 * ```
 */
export function useActiveSection(): string
export function useActiveSection(callbacks?: UseActiveSectionCallbacks): string
export function useActiveSection(
  callbacks?: UseActiveSectionCallbacks
): string {
  const { currentSection, previousSection } = useSectionStore()

  // Use the section detected by scrolling (from store)
  const activeSection = currentSection

  // Handle callbacks on section changes
  useEffect(() => {
    if (!callbacks) return

    const prev = previousSection
    const curr = activeSection

    // Only trigger if section actually changed
    if (!prev || prev === curr) return

    const { onEnter, onLeave } = callbacks

    // Call onEnter for the new section
    onEnter?.(curr)

    // Call onLeave for the previous section
    onLeave?.(prev, curr)

    // Note: onLeaveBack would need scroll direction detection
    // For now, we rely on SectionSetter's onLeaveBack callback
  }, [activeSection, previousSection, callbacks])

  return activeSection
}

/**
 * Get both current and previous sections
 * @returns Object with current and previous section IDs
 */
export function useActiveSectionWithPrevious() {
  const { currentSection, previousSection } = useSectionStore()

  return {
    current: currentSection,
    previous: previousSection,
  }
}
