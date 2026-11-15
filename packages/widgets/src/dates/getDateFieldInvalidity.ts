import { ValidationAttributes } from '@vega-ui/core'
import { createKeyMatcher, getISODatePart } from '@vega-ui/utils'
import { CalendarDatesDisabled } from './types'

export interface DateFieldConstraints {
  type?: 'date' | 'datetime-local' | 'time'
  min?: string
  max?: string
  disabledDates?: CalendarDatesDisabled
}

const MISMATCH: ValidationAttributes = { pattern: '\\d', value: '-' }

export const getDateFieldInvalidity = (text: string, values: string[], { type = 'date', min, max, disabledDates }: DateFieldConstraints): ValidationAttributes | undefined => {
  if (text === '') return undefined
  if (values.includes('')) return MISMATCH

  const isDisabled = createKeyMatcher(disabledDates)

  for (const value of values) {
    if (min && value < min) return { type, min, value }
    if (max && value > max) return { type, max, value }
    if (isDisabled(getISODatePart(value) ?? '')) return MISMATCH
  }

  return undefined
}
