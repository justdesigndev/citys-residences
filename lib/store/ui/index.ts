import { create } from 'zustand'

interface State {
  resetAnimatedLogo: boolean
  setResetAnimatedLogo: (status: boolean) => void
  isMenuOpen: boolean
  setIsMenuOpen: (status: boolean) => void
  isModalContactFormOpen: boolean
  setIsModalContactFormOpen: (status: boolean) => void
}

export const useStore = create<State>(set => ({
  isMenuOpen: false,
  setIsMenuOpen: status => set({ isMenuOpen: status }),
  resetAnimatedLogo: false,
  setResetAnimatedLogo: status => set({ resetAnimatedLogo: status }),
  isModalContactFormOpen: false,
  setIsModalContactFormOpen: status => set({ isModalContactFormOpen: status }),
}))

export const useUiStore = useStore
