import { ReactNode } from 'react'

import { LoadingSpinner } from '@/components/loading-spinner'

interface LoadingSpinnerWithTextProps {
  message?: string
  className?: string
}

export function LoadingSpinnerWithText({
  message = 'Yükleniyor...',
  className = '',
}: LoadingSpinnerWithTextProps) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className='text-center'>
        <div className='mx-auto mb-4 size-8 text-bricky-brick'>
          <LoadingSpinner />
        </div>
        <p className='text-gray-600'>{message}</p>
      </div>
    </div>
  )
}

interface ErrorMessageProps {
  title?: string
  message?: string
  className?: string
}

export function ErrorMessage({
  title = 'Hata oluştu',
  message = 'Bilinmeyen hata',
  className = '',
}: ErrorMessageProps) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className='text-center'>
        <p className='mb-2 text-red-600'>{title}</p>
        <p className='text-gray-600'>{message}</p>
      </div>
    </div>
  )
}

interface LoadingOverlayProps {
  message?: string
  children?: ReactNode
}

export function LoadingOverlay({
  message = 'Filtreleme yapılıyor...',
  children,
}: LoadingOverlayProps) {
  return (
    <div className='relative'>
      {children}
      <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm'>
        <div className='text-center'>
          <div className='mx-auto mb-4 size-8 text-bricky-brick'>
            <LoadingSpinner />
          </div>
          <p className='text-gray-600'>{message}</p>
        </div>
      </div>
    </div>
  )
}
