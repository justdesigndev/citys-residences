'use client'

import { useState } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Image } from '@/components/image'

interface ZoomImageDialogProps {
  dialogTrigger?: React.ReactNode
  image: string
}

export function ZoomImageDialog({
  dialogTrigger,
  image,
}: ZoomImageDialogProps) {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {dialogTrigger && <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>}
      <DialogContent className='z-[var(--z-modal)] p-4'>
        <div className='relative flex aspect-[16/9] w-[30vw] flex-col'>
          <Image src={image} alt='Zoom Image' fill className='object-cover' />
        </div>
      </DialogContent>
    </Dialog>
  )
}
