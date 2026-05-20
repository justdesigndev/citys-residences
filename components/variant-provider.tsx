'use client'

import { createContext, useContext } from 'react'

import type { Variant } from '@/lib/variant'

const VariantContext = createContext<Variant>('default')

type Props = {
  value: Variant
  children: React.ReactNode
}

export function VariantProvider({ value, children }: Props) {
  return (
    <VariantContext.Provider value={value}>{children}</VariantContext.Provider>
  )
}

export function useVariant(): Variant {
  return useContext(VariantContext)
}

export function useIsStand(): boolean {
  return useContext(VariantContext) === 'stand'
}
