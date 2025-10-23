'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'clip-path-inset-50 absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0',
      className
    )}
    {...props}
  />
))
VisuallyHidden.displayName = 'VisuallyHidden'

export { VisuallyHidden }
