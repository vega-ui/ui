import { FC, useRef, useState } from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { DateTimeFieldProvider } from './contexts';
import { CalendarDatesDisabled } from '../Calendar';
import { MaskitoDateMode } from '@maskito/kit';

export interface DateTimeFieldProps extends TextFieldProps {
  /**
   * Date format pattern used for input masking and parsing.
   * Defines the order of date segments.
   *
   * Examples:
   * - "dd.MM.yyyy"
   * - "MM/dd/yyyy"
   * - "yyyy-MM-dd"
   */
  dateFormat: string
  
  /**
   * Time format pattern used for time input masking and parsing.
   * Defines which time segments are available in the input.
   *
   * Examples:
   * - "HH:MM" — hours and minutes.
   * - "HH:MM:SS" — hours, minutes, and seconds.
   */
  timeFormat?: 'HH:MM' | 'HH:MM:SS'
  
  /**
   * Step increment for time segments.
   * Controls the granularity of time changes when typing or using the picker.
   *
   * For example:
   * - `0` — disallow any value.
   * - `1` — allows any value.
   * - `5` — minutes/seconds can be changed in 5-unit increments.
   * - `15` — common for quarter-hour selection.
   *
   * The step is applied according to the active `timeFormat`.
   */
  timeStep?: number
  
  /**
   * Character used to separate segments (date and time) in the input.
   *
   * Examples:
   * - ", "
   * - "- "
   */
  separator?: string
  
  /**
   * Character used to separate date segments in the input.
   *
   * Examples:
   * - ", "
   * - "- "
   */
  dateSeparator?: string
  
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
 * DateTimeField — a high-level input component for selecting and editing
 * combined date and time values.
 *
 * Purpose:
 * Provides a unified interface that combines a masked text input and an
 * optional calendar picker to work with date–time values.
 *
 * Features:
 * - Supports configurable date and time formats.
 * - Allows step-based time input for controlled increments.
 * - Shares a native input ref between input and calendar components to enable imperative updates and proper DOM event dispatching.
 *
 * This component acts as the orchestration layer, coordinating formatting,
 * parsing, validation, and synchronization between all DateTimeField parts.
 */
export const DateTimeField: FC<DateTimeFieldProps> = ({
  dateFormat,
  timeFormat = 'HH:MM',
  separator = ', ',
  timeStep = 1,
  max,
  min,
  disabledDates,
  dateSeparator = '.',
  disabled,
  ...props
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string>('00:00:00');
  
  const lastStringified = useRef<string>('')
  
  const inputInnerRef = useRef<HTMLInputElement>(null)
  
  const normalizedFormat = dateFormat.toLowerCase()
    .replace(/[^a-z/]/g, '/')
    .replace(/\/+/g, '/')
    .replace(/\/$/, '') as MaskitoDateMode
  
  return (
    <DateTimeFieldProvider
      max={max}
      min={min}
      date={date}
      time={time}
      timeStep={timeStep}
      disabled={disabled}
      dateSeparator={dateSeparator}
      disabledDates={disabledDates}
      inputRef={inputInnerRef}
      changeDate={setDate}
      changeTime={setTime}
      lastStringified={lastStringified}
      dateFormat={normalizedFormat}
      timeFormat={timeFormat}
      separator={separator}
    >
      <TextField {...props} />
    </DateTimeFieldProvider>
  )
}