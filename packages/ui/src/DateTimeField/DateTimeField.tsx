import { FC, useRef, useState } from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { DateTimeFieldProvider } from './contexts';
import { CalendarDatesDisabled } from '../Calendar';
import { parseISODateTime, getDateTimeTemplate } from '@vega-ui/utils';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';

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
   * Time format pattern used for time input masking and parsing, in the
   * notation of `dateFormat` (Unicode date patterns).
   * Defines which time segments are available in the input.
   *
   * Examples:
   * - "HH:mm" — hours and minutes.
   * - "HH:mm:ss" — hours, minutes, and seconds.
   */
  timeFormat?: 'HH:mm' | 'HH:mm:ss'
  
  /**
   * Step of ArrowUp / ArrowDown on the minutes or seconds under the caret,
   * wrapping around the segment's range. Like a native `datetime-local`
   * input with `step`, the hours always move by one. `0` turns arrow
   * stepping off. Typed values are not snapped to the step.
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
   * - ","
   * - "-"
   */
  dateSeparator?: string
  
  /**
   * Minimum allowed date–time as a `YYYY-MM-DDTHH:mm[:ss]` string.
   * Dates earlier than this value cannot be selected
   * and will be clamped or rejected during input parsing.
   */
  min?: string
  
  /**
   * Maximum allowed date–time as a `YYYY-MM-DDTHH:mm[:ss]` string.
   * Dates later than this value cannot be selected
   * and will be clamped or rejected during input parsing.
   */
  max?: string
  
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
  
  /**
   * Calendar system the date is typed and picked in. The value stays a
   * `YYYY-MM-DDTHH:mm[:ss]` string.
   * Defaults to the Gregorian calendar.
   */
  calendar?: CalendarSystem
  
  /**
   * BCP 47 locale of the calendar popup (month and day names, first day of
   * the week), e.g. `de-DE`. The typed format still comes from `format`.
   * Defaults to the locale of the runtime, like `Intl`.
   */
  locale?: string
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
  timeFormat = 'HH:mm',
  separator = ', ',
  timeStep = 1,
  max: _max,
  min: _min,
  disabledDates,
  dateSeparator = '.',
  disabled,
  calendar = gregorianCalendar,
  locale,
  ...props
}) => {
  const min = parseISODateTime(_min) ? _min : undefined
  const max = parseISODateTime(_max) ? _max : undefined
  const [date, setDate] = useState<string | undefined>(undefined)
  const [time, setTime] = useState<string>('00:00:00');
  
  const inputInnerRef = useRef<HTMLInputElement>(null)
  
  const template = getDateTimeTemplate({ dateFormat, dateSeparator, separator, timeFormat })
  
  return (
    <DateTimeFieldProvider
      max={max}
      min={min}
      date={date}
      time={time}
      timeStep={timeStep}
      disabled={disabled}
      disabledDates={disabledDates}
      inputRef={inputInnerRef}
      changeDate={setDate}
      changeTime={setTime}
      template={template}
      calendar={calendar}
      locale={locale}
    >
      <TextField {...props} />
    </DateTimeFieldProvider>
  )
}