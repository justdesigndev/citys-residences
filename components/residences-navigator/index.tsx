'use client'

import { cn } from '@/lib/utils'

import { HouseSimpleIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { Image } from '@/components/image'
import { useTranslations } from 'next-intl'

export function ResidencesNavigator() {
  const t = useTranslations('residences.navigator.labels')
  const options = [
    {
      id: '1',
      label: '1+1',
      src: '/img/residences/1+1/interior.jpg',
      icon: <HouseSimpleIcon size={40} weight='thin' />,
    },
    {
      id: '2',
      label: '2+1',
      src: '/img/residences/2+1/interior.jpg',
      icon: <HouseSimpleIcon size={40} weight='thin' />,
    },
    {
      id: '3',
      label: '3+1',
      src: '/img/residences/3+1/interior.jpg',
      icon: <HouseSimpleIcon size={40} weight='thin' />,
    },
    {
      id: '4',
      label: '4+1',
      src: '/img/residences/4+1/interior.jpg',
      icon: <HouseSimpleIcon size={40} weight='thin' />,
    },
    {
      id: '5',
      label: '5+1',
      src: '/img/residences/4+1/interior.jpg',
      icon: <HouseSimpleIcon size={40} weight='thin' />,
    },
    {
      id: '6',
      label: '6+1',
      src: '/img/residences/4+1/interior.jpg',
      icon: <HouseSimpleIcon size={40} weight='thin' />,
    },
    {
      id: '7',
      label: t('citysParkHouses'),
      src: '/img/residences/1+1/interior.jpg',
      icon: <HouseSimpleIcon size={40} weight='thin' />,
    },
    {
      id: '8',
      label: t('terraceHouses'),
      src: '/img/residences/terrace-houses/interior.jpg',
      icon: <HouseSimpleIcon size={40} weight='thin' />,
    },
    {
      id: '9',
      label: t('penthouse'),
      src: '/img/residences/terrace-houses/interior.jpg',
      icon: <HouseSimpleIcon size={40} weight='thin' />,
    },
  ]

  const [selectedValue, setSelectedValue] = useState<string>('1')

  const handleOptionClick = (id: string) => {
    setSelectedValue(id)
  }

  return (
    <div className={cn('mt-12 flex flex-col gap-16 lg:mt-24')}>
      <div className='grid grid-cols-3 grid-rows-3 flex-wrap items-stretch justify-center gap-x-4 gap-y-4 px-16 lg:flex lg:px-0 xl:gap-2.5 2xl:gap-3.5'>
        {options.map(option => {
          const isSelected = selectedValue === option.id
          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={cn(
                'aspect-[1/1] cursor-pointer px-1 pt-4',
                'flex flex-shrink-0 flex-col items-center justify-start rounded-md',
                'transition-all duration-200',
                {
                  'bg-bricky-brick text-white': isSelected,
                  'border border-bricky-brick bg-bricky-brick text-white hover:bg-white hover:text-bricky-brick':
                    !isSelected,
                  'border border-bricky-brick bg-white text-bricky-brick':
                    selectedValue === option.id,
                }
              )}
              aria-label={`Select ${option.label}`}
              type='button'
            >
              <div className='mb-1 flex items-center justify-center'>
                {option.icon}
              </div>
              <span className={cn('font-[300 ] text-sm/tight')}>
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
      <div className='relative aspect-[16/16] lg:aspect-[16/9]'>
        {options.map(option => {
          return (
            <div
              key={option.id}
              className={cn(
                'absolute inset-0 transition-opacity duration-300',
                {
                  'opacity-100': selectedValue === option.id,
                  'opacity-0': selectedValue !== option.id,
                }
              )}
            >
              <Image
                key={option.id}
                src={option.src}
                alt={option.label}
                fill
                desktopSize='100vw'
                mobileSize='100vw'
                className='object-cover'
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
