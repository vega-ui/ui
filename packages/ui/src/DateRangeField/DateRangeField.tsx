import { FC, useRef, useState } from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { DateRangeFieldProvider } from './contexts';
import { CalendarDatesDisabled } from '../Calendar';
import { MaskitoDateMode } from '@maskito/kit';

export interface DateRangeFieldProps extends TextFieldProps {
  /**
   * Date format pattern used for input masking and parsing.
   * Defines the order of date segments.
   *
   * Examples:
   * - "dd.MM.yyyy"
   * - "MM/dd/yyyy"
   * - "yyyy-MM-dd"
   */
  format: string
  
  /**
   * Character used to separate date segments in the input.
   *
   * Examples:
   * - "."
   * - "/"
   * - "-"
   */
  separator: string
  
  /**
   * Separator used between the start and end dates in the range input.
   *
   * Defines how two dates are visually and logically separated when entering
   * or displaying a date range.
   *
   * Examples:
   * - " – "  → "01.01.2024 – 31.01.2024"
   * - " - "  → "01.01.2024 - 31.01.2024"
   * - " to " → "01.01.2024 to 31.01.2024"
   *
   * If not provided, a default range separator is used.
   */
  rangeSeparator?: string
  
  /**
   * Minimum allowed date.
   * Dates earlier than this value cannot be selected
   * and will be clamped or rejected during input parsing.
   */
  min?: Date
  
  /**
   * Maximum allowed date.
   * Dates later than this value cannot be selected
   * and will be clamped or rejected during input parsing.
   */
  max?: Date
  
  /**
   * Rules for disabling specific dates in the calendar.
   * Can be used to block ranges, weekdays, or custom conditions.
   */
  disabledDates?: CalendarDatesDisabled
  
  /**
   * Disables the field.
   * Prevents user input and interaction, and applies the disabled visual state.
   */
  disabled?: boolean
}

/**
 * DateRangeField — a high-level date range input component that combines a
 * masked text input with a range-enabled calendar picker under a single
 * TextField interface.
 *
 * Purpose:
 * Provides a unified way to enter a start and end date either by typing a
 * formatted range or by selecting dates from a calendar, while keeping both
 * representations synchronized.
 */
export const DateRangeField: FC<DateRangeFieldProps> = ({ format, disabled, separator, max, min, disabledDates, rangeSeparator = ' – ', ...props }) => {
  const [date, setDate] = useState<[Date?, Date?]>([])
  const lastStringified = useRef<string>('')
  
  const inputInnerRef = useRef<HTMLInputElement>(null)
  
  const normalizedFormat = format.toLowerCase()
    .replace(/[^a-z/]/g, '/')
    .replace(/\/+/g, '/')
    .replace(/\/$/, '') as MaskitoDateMode
  
  return (
    <DateRangeFieldProvider
      max={max}
      min={min}
      date={date}
      lastStringified={lastStringified}
      disabledDates={disabledDates}
      disabled={disabled}
      inputRef={inputInnerRef}
      changeDate={setDate}
      format={normalizedFormat}
      separator={separator}
      rangeSeparator={rangeSeparator}
    >
      <TextField {...props} />
    </DateRangeFieldProvider>
  )
}