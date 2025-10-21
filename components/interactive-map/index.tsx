'use client'

import { IconPin } from '@/components/icons'
import { cn } from '@/lib/utils'
import { colors } from '@/styles/config.mjs'
import {
  BankIcon,
  GraduationCapIcon,
  LetterCircleHIcon,
  TrainIcon,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { GsapSplitText } from '../gsap-split-text'

interface LocationItem {
  id: string
  name: string
  distance: string
  icon: 'metro' | 'hospital' | 'university' | 'building'
  position: { x: number; y: number }
}

const locations: LocationItem[] = [
  {
    id: 'kozyatagi-metro',
    name: 'Kozyatağı Metro',
    distance: '1 km',
    icon: 'metro',
    position: { x: 25, y: 35 },
  },
  {
    id: 'yenisahra-metro',
    name: 'Yenisahra Metro',
    distance: '2 km',
    icon: 'metro',
    position: { x: 45, y: 25 },
  },
  {
    id: 'memorial-atasehir',
    name: 'Memorial Ataşehir Hastanesi',
    distance: '1 km',
    icon: 'hospital',
    position: { x: 60, y: 40 },
  },
  {
    id: 'acibadem-atasehir',
    name: 'Acıbadem Ataşehir Hastanesi',
    distance: '4 km',
    icon: 'hospital',
    position: { x: 70, y: 20 },
  },
  {
    id: 'fenerbahce-university',
    name: 'Fenerbahçe Üniversitesi',
    distance: '3 km',
    icon: 'university',
    position: { x: 75, y: 45 },
  },
  {
    id: 'istanbul-finance',
    name: 'İstanbul Finans Merkezi',
    distance: '3 km',
    icon: 'building',
    position: { x: 85, y: 15 },
  },
]

const getIconComponent = (iconType: LocationItem['icon']) => {
  switch (iconType) {
    case 'metro':
      return <TrainIcon size={40} weight='thin' />
    case 'hospital':
      return <LetterCircleHIcon size={40} weight='thin' />
    case 'university':
      return <GraduationCapIcon size={40} weight='thin' />
    case 'building':
      return <BankIcon size={40} weight='thin' />
    default:
      return null
  }
}

export function InteractiveMap() {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  return (
    <div className='grid h-screen grid-cols-24 gap-8'>
      {/* Map Section */}
      <div className='relative col-span-12 overflow-hidden bg-gray-100'>
        <div className='relative h-full w-full bg-gray-200'>
          {/* Map Background - simplified representation */}
          <svg
            className='absolute inset-0 h-full w-full'
            viewBox='0 0 100 60'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            {/* Map paths/roads */}
            <path
              d='M10 30 Q30 10 50 20 T90 40'
              stroke='#d1d5db'
              strokeWidth='0.5'
              fill='none'
            />
            <path
              d='M20 10 Q40 30 60 15 T85 35'
              stroke='#d1d5db'
              strokeWidth='0.5'
              fill='none'
            />
            <path
              d='M5 45 L95 25'
              stroke='#d1d5db'
              strokeWidth='0.5'
              fill='none'
            />
          </svg>

          {/* Location Pins */}
          {locations.map(location => {
            const isHovered = hoveredLocation === location.id
            const isGray = !isHovered && hoveredLocation !== null

            return (
              <div
                key={location.id}
                className='absolute -translate-x-1/2 -translate-y-full transform transition-all duration-300'
                style={{
                  left: `${location.position.x}%`,
                  top: `${location.position.y}%`,
                }}
              >
                {/* Pin shadow/ripple effect for active/hovered state */}
                {isHovered && (
                  <div className='absolute inset-0 animate-ping'>
                    <div className='h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-red-500 opacity-20'></div>
                  </div>
                )}

                {/* Pin */}
                <div className='relative'>
                  <IconPin
                    fill={
                      isHovered
                        ? colors['bricky-brick']
                        : isGray
                          ? colors['namara-grey']
                          : colors['bricky-brick']
                    }
                  />
                  {/* Icon inside pin */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${
                      isHovered
                        ? 'text-white'
                        : isGray
                          ? 'text-gray-400'
                          : 'text-white'
                    }`}
                  >
                    {getIconComponent(location.icon)}
                  </div>
                </div>

                {/* Special styling for central active pin */}
                {location.id === 'memorial-atasehir' && !hoveredLocation && (
                  <div className='absolute inset-0 animate-pulse'>
                    <div className='h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-red-500 opacity-30'></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* List Section */}
      <div className='col-span-12 flex flex-col pb-16 pl-20 pr-24 pt-24'>
        <h3
          className={cn(
            'ml-auto',
            'text-left font-primary font-[400] text-trapped-darkness',
            'text-[0.8rem] lg:text-6xl',
            'lg:leading-tighter leading-normal'
          )}
        >
          <GsapSplitText splitBy='lines' stagger={0.01} duration={1.5}>
            Yaşamın tam <br /> merkezinde.
          </GsapSplitText>
        </h3>

        <div className='mt-auto'>
          {locations.map(location => {
            const isHovered = hoveredLocation === location.id
            const isSelected =
              location.id === 'memorial-atasehir' && !hoveredLocation

            return (
              <div
                key={location.id}
                className='border-b border-gray-200 last:border-b-0'
              >
                <div
                  className={`flex cursor-pointer items-center py-6 transition-all duration-300 ${
                    isHovered || isSelected
                      ? 'text-red-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onMouseEnter={() => setHoveredLocation(location.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      `mr-4 flex items-center justify-center transition-colors duration-300`,
                      isHovered || isSelected
                        ? 'text-bricky-brick'
                        : 'text-black'
                    )}
                  >
                    {getIconComponent(location.icon)}
                  </div>

                  {/* Content */}
                  <div className='ml-auto flex items-end gap-4'>
                    <div
                      className={cn(
                        `font-primary text-2xl font-[300] text-black transition-colors duration-300`,
                        isHovered || isSelected
                          ? 'text-bricky-brick'
                          : 'text-black'
                      )}
                    >
                      {location.name}
                    </div>
                    <div className='font-primary text-2xl font-[200] text-black/50'>
                      {location.distance}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
