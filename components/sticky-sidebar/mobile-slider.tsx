'use client'

import { useNavigation } from '@/hooks/useNavigation'
import { cn, toAllUppercase } from '@/lib/utils'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface MobileSliderProps {
  items: Array<{ label: string; href: string; id: string }>
  activeSection: string | null
  isStickySidebarVisible: boolean
  containerRef: MutableRefObject<HTMLDivElement | null>
  itemRefs: MutableRefObject<Map<string, HTMLElement>>
  onEmblaApiReady?: (api: EmblaCarouselType | undefined) => void
}

export const useSelectedSnapDisplay = (
  emblaApi: EmblaCarouselType | undefined
) => {
  const [selectedSnap, setSelectedSnap] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  const updateScrollSnapState = useCallback((emblaApi: EmblaCarouselType) => {
    setSnapCount(emblaApi.scrollSnapList().length)
    setSelectedSnap(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    updateScrollSnapState(emblaApi)

    emblaApi.on('select', updateScrollSnapState)
    emblaApi.on('reInit', updateScrollSnapState)
  }, [emblaApi, updateScrollSnapState])

  return {
    selectedSnap,
    snapCount,
  }
}

export const MobileSlider: React.FC<MobileSliderProps> = ({
  items,
  activeSection,
  isStickySidebarVisible,
  containerRef,
  itemRefs,
  onEmblaApiReady,
}) => {
  const { handleNavClick } = useNavigation()

  const emblaOptions = useMemo<EmblaOptionsType>(
    () => ({
      align: 'center',
      containScroll: false,
      dragFree: true,
      loop: false,
      dragThreshold: 20,
      duration: 40,
    }),
    []
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions)
  const itemIndexMap = useMemo(() => {
    const map = new Map<string, number>()
    items.forEach((item, index) => map.set(item.id, index))
    return map
  }, [items])

  useEffect(() => {
    if (!emblaApi) return

    const logSelectedSnap = () => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(
          'Current snap point:',
          emblaApi.selectedScrollSnap(),
          'of',
          emblaApi.scrollSnapList().length
        )
      }
    }

    emblaApi.on('select', logSelectedSnap)

    return () => {
      emblaApi.off('select', logSelectedSnap)
    }
  }, [emblaApi])

  // Expose emblaApi to parent
  useEffect(() => {
    if (onEmblaApiReady) {
      onEmblaApiReady(emblaApi)
    }
  }, [emblaApi, onEmblaApiReady])

  // Scroll to active section when it changes
  useEffect(() => {
    if (!emblaApi || !activeSection) return

    const activeIndex = itemIndexMap.get(activeSection)
    if (typeof activeIndex === 'number') {
      if (emblaApi.selectedScrollSnap() !== activeIndex) {
        emblaApi.scrollTo(activeIndex)
      }
    }
  }, [activeSection, emblaApi, itemIndexMap])

  const handleSlideClick = useCallback(
    (itemId: string, slideIndex: number) => {
      emblaApi?.scrollTo(slideIndex)
      handleNavClick(itemId)
    },
    [emblaApi, handleNavClick]
  )

  // Set container ref callback
  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
    },
    [containerRef]
  )

  const handleSetItemRef = useCallback(
    (id: string, node: HTMLElement | null) => {
      const refs = itemRefs.current
      if (!refs) return

      if (node) {
        if (refs.get(id) !== node) {
          refs.set(id, node)
        }
        return
      }

      refs.delete(id)
    },
    [itemRefs]
  )

  return (
    // ... existing code ...
    <>
      {/* Gradient line */}
      <div
        className={cn(
          'fixed bottom-[2%] left-8 right-8 z-[var(--z-sticky-menu)] mix-blend-difference lg:hidden',
          'before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-[100%] before:bg-gradient-sidebar',
          (!isStickySidebarVisible || !emblaApi) &&
            'pointer-events-none opacity-0'
        )}
      ></div>
      {/* Embla viewport */}
      <div
        className={cn(
          'fixed bottom-[2%] left-0 right-0 z-[var(--z-sticky-menu)] w-full overflow-hidden mix-blend-difference transition-opacity duration-300 focus:outline-none lg:hidden',
          (!isStickySidebarVisible || !emblaApi) &&
            'pointer-events-none opacity-0'
        )}
        ref={emblaRef}
      >
        {/* Embla container */}
        <div
          className='pinch-zoom -ml-6 flex touch-pan-y items-center'
          ref={setContainerRef}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              ref={el => handleSetItemRef(item.id, el)}
              className='relative flex min-w-0 flex-none items-center justify-center pl-6'
            >
              <button
                onClick={() => handleSlideClick(item.id, index)}
                className={cn(
                  'relative',
                  'whitespace-nowrap font-primary font-[600] tracking-[0.2em] text-white',
                  'flex h-full w-full items-center justify-center',
                  'transition-all duration-300 ease-out',
                  'cursor-pointer px-6 py-3',
                  'before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[4px] before:w-full before:bg-white before:backdrop-blur-[54px] before:transition-opacity before:duration-500 before:ease-in-out before:content-[""]',
                  {
                    'text-[9px] opacity-100': activeSection === item.id,
                    'text-[9px] opacity-60': activeSection !== item.id,
                    'before:opacity-100': activeSection === item.id,
                    'before:opacity-0': activeSection !== item.id,
                  }
                )}
                type='button'
              >
                <span className='whitespace-nowrap'>
                  {toAllUppercase(item.label)}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
