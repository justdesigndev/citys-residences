'use client'

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { Check, ChevronDown } from 'lucide-react'
import { forwardRef, useImperativeHandle } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

type Checked = DropdownMenuCheckboxItemProps['checked']

interface CheckboxOption {
  id: string
  label: string
  disabled?: boolean
}

interface DropdownMenuCheckboxesProps {
  selectedValues?: string[]
  placeholder: string
  options: CheckboxOption[]
  onChange?: (ids: string[]) => void
  className?: string
}

// Add ref interface
export interface DropdownMenuCheckboxesRef {
  reset: () => void
}

// Constants for repeated styles
const SELECTED_ITEM_STYLES = 'border border-bricky-brick text-bricky-brick'
const UNSELECTED_ITEM_STYLES = 'border border-neutral-200 text-neutral-950'
const CHECKBOX_SELECTED_STYLES = 'bg-bricky-brick'
const CHECKBOX_UNSELECTED_STYLES = 'bg-transparent group-hover:opacity-30'

export const DropdownMenuCheckboxesHear = forwardRef<
  DropdownMenuCheckboxesRef,
  DropdownMenuCheckboxesProps
>(({ placeholder, selectedValues = [], options, onChange, className }, ref) => {
  const handleCheckedChange = (id: string, checked: Checked) => {
    if (onChange) {
      const currentValues = selectedValues || []
      const isSelected = currentValues.includes(id)

      let newValues: string[]
      if (checked) {
        // Add the id to the array if not already present
        if (!isSelected) {
          newValues = [...currentValues, id]
        } else {
          newValues = currentValues
        }
      } else {
        // Remove the id from the array
        newValues = currentValues.filter(value => value !== id)
      }

      onChange(newValues)
    }
  }

  useImperativeHandle(ref, () => ({
    reset: () => {
      // Reset to no selection
      onChange?.([])
    },
  }))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='flex h-10 w-full items-center justify-between rounded-md border border-bricky-brick px-2 text-base text-neutral-950 outline-none focus:outline-none focus:ring-0 bt:px-4 bt:text-sm'
          type='button'
          aria-label={`Select ${placeholder}`}
        >
          <>
            {selectedValues.length > 0 ? (
              <span className='gradient-white-to-transparent relative w-full overflow-hidden'>
                <span className='flex gap-1'>
                  {selectedValues.map((id, index) => {
                    const option = options.find(opt => opt.id === id)
                    return option ? (
                      <span
                        key={index}
                        className='whitespace-nowrap rounded-sm bg-bricky-brick px-2 py-0.5 text-white'
                      >
                        {option.label}
                      </span>
                    ) : null
                  })}
                </span>
              </span>
            ) : (
              <span className='truncate'>{placeholder}</span>
            )}
          </>
          <ChevronDown className='size-4 flex-shrink-0 text-bricky-brick' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          className,
          'w-[310px] space-y-1 border-bricky-brick-light p-2'
        )}
      >
        {options.map(option => (
          <DropdownMenuCheckboxItem
            className='w-full cursor-pointer'
            key={option.id}
            checked={selectedValues?.includes(option.id)}
            onCheckedChange={checked => handleCheckedChange(option.id, checked)}
            disabled={option.disabled}
            onSelect={event => event.preventDefault()}
          >
            <div
              className={`group flex w-full cursor-pointer items-center justify-start gap-2 rounded-sm px-1.5 py-2.5 transition-all duration-200 ${selectedValues?.includes(option.id) ? SELECTED_ITEM_STYLES : UNSELECTED_ITEM_STYLES}`}
            >
              <div
                className={`relative h-3.5 w-3.5 overflow-hidden rounded-sm border border-bricky-brick-light transition-all duration-200 group-hover:bg-bricky-brick ${selectedValues?.includes(option.id) ? CHECKBOX_SELECTED_STYLES : CHECKBOX_UNSELECTED_STYLES}`}
              >
                <Check className='absolute left-0 top-0 h-full w-full text-white' />
              </div>
              <span>{option.label}</span>
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

DropdownMenuCheckboxesHear.displayName = 'DropdownMenuCheckboxesHear'
