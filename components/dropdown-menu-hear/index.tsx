"use client"

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import cn from "clsx"
import { Check, ChevronDown } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

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
const SELECTED_ITEM_STYLES = "border border-bricky-brick text-bricky-brick"
const UNSELECTED_ITEM_STYLES = "border border-neutral-200 text-neutral-950"
const CHECKBOX_SELECTED_STYLES = "bg-bricky-brick"
const CHECKBOX_UNSELECTED_STYLES = "bg-transparent group-hover:opacity-30"

export const DropdownMenuCheckboxesHear = forwardRef<DropdownMenuCheckboxesRef, DropdownMenuCheckboxesProps>(
  ({ placeholder, selectedValues = [], options, onChange, className }, ref) => {
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
          newValues = currentValues.filter((value) => value !== id)
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
            className='h-10 w-full text-neutral-950 border border-bricky-brick flex items-center justify-between px-2 bt:px-4 rounded-md text-base bt:text-sm outline-none focus:outline-none focus:ring-0'
            type='button'
            aria-label={`Select ${placeholder}`}
          >
            <>
              {selectedValues.length > 0 ? (
                <span className='w-full relative overflow-hidden gradient-white-to-transparent'>
                  <span className='flex gap-1'>
                    {selectedValues.map((id, index) => {
                      const option = options.find((opt) => opt.id === id)
                      return option ? (
                        <span
                          key={index}
                          className='bg-bricky-brick px-2 py-0.5 rounded-sm text-white whitespace-nowrap'
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
        <DropdownMenuContent className={cn(className, "w-[310px] space-y-1 border-bricky-brick-light p-2")}>
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              className='w-full cursor-pointer'
              key={option.id}
              checked={selectedValues?.includes(option.id)}
              onCheckedChange={(checked) => handleCheckedChange(option.id, checked)}
              disabled={option.disabled}
              onSelect={(event) => event.preventDefault()}
            >
              <div
                className={`w-full flex items-center justify-start gap-2 px-1.5 py-2.5 rounded-sm transition-all duration-200 cursor-pointer group
                      ${selectedValues?.includes(option.id) ? SELECTED_ITEM_STYLES : UNSELECTED_ITEM_STYLES}`}
              >
                <div
                  className={`h-3.5 w-3.5 rounded-sm relative overflow-hidden transition-all duration-200 border border-bricky-brick-light group-hover:bg-bricky-brick
                     ${selectedValues?.includes(option.id) ? CHECKBOX_SELECTED_STYLES : CHECKBOX_UNSELECTED_STYLES}`}
                >
                  <Check className='w-full h-full absolute top-0 left-0 text-white' />
                </div>
                <span>{option.label}</span>
              </div>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

DropdownMenuCheckboxesHear.displayName = "DropdownMenuCheckboxesHear"
