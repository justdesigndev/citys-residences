"use client"

import { cn } from "@/lib/utils"
import { forwardRef, useImperativeHandle } from "react"

import { IconHome } from "@/components/icons"

interface ResidenceOption {
  id: string
  label: string
  disabled?: boolean
}

interface ResidenceTypeSelectorProps {
  title: string
  selectedValues?: string[]
  options: ResidenceOption[]
  onChange?: (ids: string[]) => void
  className?: string
}

export interface ResidenceTypeSelectorRef {
  reset: () => void
}

export const DropdownMenuCheckboxesResidences = forwardRef<ResidenceTypeSelectorRef, ResidenceTypeSelectorProps>(
  ({ title, selectedValues = [], options, onChange, className }, ref) => {
    const handleOptionClick = (id: string) => {
      if (onChange) {
        const currentValues = selectedValues || []
        const isSelected = currentValues.includes(id)

        let newValues: string[]
        if (isSelected) {
          // Remove the id from the array
          newValues = currentValues.filter((value) => value !== id)
        } else {
          // Add the id to the array
          newValues = [...currentValues, id]
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
      <div className={cn("space-y-8", className)}>
        <h3 className='font-primary text-white text-lg font-[400]'>{title}</h3>
        <div className='flex flex-wrap gap-3'>
          {options.map((option) => {
            const isSelected = (selectedValues || []).includes(option.id)
            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                disabled={option.disabled}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 min-w-[80px] cursor-pointer",
                  {
                    "bg-white text-bricky-brick": isSelected,
                    "border border-white/30 hover:border-bricky-brick-light/80 text-white": !isSelected,
                  }
                )}
                aria-label={`Select ${option.label}`}
                type='button'
              >
                <div className='w-6 h-6 mb-2 flex items-center justify-center'>
                  <IconHome fill={isSelected ? "#8B2635" : "#fff"} />
                </div>
                <span className='text-sm font-medium tracking-wide'>{option.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }
)

DropdownMenuCheckboxesResidences.displayName = "DropdownMenuCheckboxesResidences"
