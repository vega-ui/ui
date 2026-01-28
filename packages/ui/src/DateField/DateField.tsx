import { FC, useRef, useState } from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { DateFieldProvider } from './contexts';
import { CalendarDatesDisabled } from '../Calendar';
import { MaskitoDateMode } from '@maskito/kit';

export interface DateFieldProps extends TextFieldProps {
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
 * DateField — a high-level date input component that combines a masked text
 * input with a calendar picker under a single TextField interface.
 *
 * Purpose:
 * Provides a user-friendly way to enter dates either by typing or by selecting
 * from a calendar, while keeping both representations synchronized.
 *
 * This component acts as the coordination layer between the visual TextField,
 * date parsing/formatting logic, and the interactive calendar UI.
 */
export const DateField: FC<DateFieldProps> = ({ format, separator, max, min, disabledDates, disabled, ...props }) => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const lastStringified = useRef<string>('')
  
  const inputInnerRef = useRef<HTMLInputElement>(null)
  
  const normalizedFormat = format.toLowerCase()
    .replace(/[^a-z/]/g, '/')
    .replace(/\/+/g, '/')
    .replace(/\/$/, '') as MaskitoDateMode
  
  return (
    <DateFieldProvider
      max={max}
      min={min}
      date={date}
      disabled={disabled}
      disabledDates={disabledDates}
      inputRef={inputInnerRef}
      changeDate={setDate}
      lastStringified={lastStringified}
      format={normalizedFormat}
      separator={separator}
    >
      <TextField {...props} />
    </DateFieldProvider>
  )
}