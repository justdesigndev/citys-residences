import Lenis from "lenis"
import { create } from "zustand"
import { ScrollTrigger, gsap } from "@/components/gsap"

interface ScrollState {
  // Lenis instance
  lenis: Lenis | null

  // Stacking cards state
  stackingCards: {
    scrollTrigger: ScrollTrigger | null
    currentCard: number
    itemsLength: number
  }

  // Menu state
  menu: {
    isOpen: boolean
    activeItem: number | null
  }

  // Actions for Lenis
  setLenis: (lenis: Lenis | null) => void

  // Actions for stacking cards
  setStackingCardsScrollTrigger: (trigger: ScrollTrigger | null) => void
  setCurrentCard: (cardIndex: number) => void
  setStackingCardsItemsLength: (length: number) => void
  updateCurrentCardFromProgress: (progress: number) => void

  // Actions for menu
  setMenuOpen: (isOpen: boolean) => void
  setMenuActiveItem: (activeItem: number | null) => void

  // Unified scroll actions
  scrollToCard: (cardIndex: number, immediate?: boolean) => void
  scrollToElement: (id: string, options?: { immediate?: boolean; closeMenu?: boolean }) => void
  smoothScrollWithWrapper: (
    targetAction: () => void,
    options?: {
      wrapperSelector?: string
      fadeOutDuration?: number
      fadeInDelay?: number
      closeMenu?: boolean
    }
  ) => void
}

export const useScrollStore = create<ScrollState>((set, get) => ({
  // Initial state
  lenis: null,
  stackingCards: {
    scrollTrigger: null,
    currentCard: 0,
    itemsLength: 0,
  },
  menu: {
    isOpen: false,
    activeItem: null,
  },

  // Lenis actions
  setLenis: (lenis) => set({ lenis }),

  // Stacking cards actions
  setStackingCardsScrollTrigger: (trigger) =>
    set((state) => ({
      stackingCards: { ...state.stackingCards, scrollTrigger: trigger },
    })),

  setCurrentCard: (cardIndex) =>
    set((state) => ({
      stackingCards: { ...state.stackingCards, currentCard: cardIndex },
    })),

  setStackingCardsItemsLength: (length) =>
    set((state) => ({
      stackingCards: { ...state.stackingCards, itemsLength: length },
    })),

  updateCurrentCardFromProgress: (progress) => {
    const { stackingCards } = get()
    const { itemsLength } = stackingCards

    // Calculate which card should be active based on halfway point
    const cardProgress = progress * (itemsLength - 1)
    const cardIndex = Math.floor(cardProgress + 0.5)

    set((state) => ({
      stackingCards: {
        ...state.stackingCards,
        currentCard: Math.min(Math.max(cardIndex, 0), itemsLength - 1),
      },
    }))
  },

  // Menu actions
  setMenuOpen: (isOpen) =>
    set((state) => ({
      menu: { ...state.menu, isOpen },
    })),

  setMenuActiveItem: (activeItem) =>
    set((state) => ({
      menu: { ...state.menu, activeItem },
    })),

  // Unified scroll actions
  scrollToCard: (cardIndex, immediate = false) => {
    const { lenis, stackingCards } = get()
    const { scrollTrigger, itemsLength } = stackingCards

    if (itemsLength === 0) return

    const wrapperSelector = ".wrapper"
    const fadeInDelay = 0.4

    // If ScrollTrigger is available (desktop), use the existing method
    if (scrollTrigger) {
      const progress = cardIndex / (itemsLength - 1)
      const start = scrollTrigger.start
      const end = scrollTrigger.end
      const targetScrollTop = start + progress * (end - start)

      lenis?.scrollTo(targetScrollTop, {
        immediate,
        onComplete: () => {
          gsap.to(wrapperSelector, {
            opacity: 1,
            delay: fadeInDelay,
          })
        },
      })
    } else {
      // Mobile fallback: scroll directly to the card element
      const cards = document.querySelectorAll(".gsap-stacking-card")
      const targetCard = cards[cardIndex] as HTMLElement

      if (targetCard && lenis) {
        lenis.scrollTo(targetCard, {
          immediate,
          onComplete: () => {
            gsap.to(wrapperSelector, {
              opacity: 1,
              delay: fadeInDelay,
            })
          },
        })
      }
    }
  },

  scrollToElement: (id, options = {}) => {
    const { immediate = false } = options
    const { lenis } = get()

    const wrapperSelector = ".wrapper"
    const fadeInDelay = 0.4

    lenis?.scrollTo(`#${id}`, {
      immediate,
      onComplete: () => {
        gsap.to(wrapperSelector, {
          opacity: 1,
          delay: fadeInDelay,
        })
      },
    })
  },

  smoothScrollWithWrapper: (targetAction, options = {}) => {
    const { wrapperSelector = ".wrapper", fadeOutDuration = 0.6, fadeInDelay = 0.4, closeMenu = true } = options

    // Close menu if requested
    if (closeMenu) {
      set((state) => ({
        menu: { ...state.menu, isOpen: false, activeItem: null },
      }))
    }

    // Fade out wrapper, perform action, then fade back in
    gsap.to(wrapperSelector, {
      opacity: 0,
      duration: fadeOutDuration,
      onComplete: () => {
        targetAction()

        // Always fade back in
        gsap.to(wrapperSelector, {
          opacity: 1,
          delay: fadeInDelay,
        })
      },
    })
  },
}))

// Legacy exports for backward compatibility
export const useStackingCardsStore = () => {
  const store = useScrollStore()

  return {
    scrollTrigger: store.stackingCards.scrollTrigger,
    currentCard: store.stackingCards.currentCard,
    itemsLength: store.stackingCards.itemsLength,
    lenis: store.lenis,
    setScrollTrigger: store.setStackingCardsScrollTrigger,
    setCurrentCard: store.setCurrentCard,
    setItemsLength: store.setStackingCardsItemsLength,
    setLenis: store.setLenis,
    scrollToCard: store.scrollToCard,
    updateCurrentCardFromProgress: store.updateCurrentCardFromProgress,
  }
}
