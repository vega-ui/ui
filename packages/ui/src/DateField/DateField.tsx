import { FC, useRef, useState } from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { DateFieldProvider } from './contexts';
import { CalendarDatesDisabled } from '../Calendar';
import { parseISODate, getDateTemplate } from '@vega-ui/utils';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';

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
   * Minimum allowed date as a `YYYY-MM-DD` string.
   * Dates earlier than this value cannot be selected
   * and will be clamped or rejected during input parsing.
   */
  min?: string
  
  /**
   * Maximum allowed date as a `YYYY-MM-DD` string.
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
   * Prevents user input and interaction and applies the disabled visual state.
   */
  disabled?: boolean
  
  /**
   * Calendar system the date is typed and picked in. The value stays a
   * `YYYY-MM-DD` day.
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
export const DateField: FC<DateFieldProps> = ({ format, separator, max: _max, min: _min, disabledDates, disabled, calendar = gregorianCalendar, locale, ...props }) => {
  const min = parseISODate(_min) ? _min : undefined
  const max = parseISODate(_max) ? _max : undefined
  const [date, setDate] = useState<string | undefined>(undefined)
  
  const inputInnerRef = useRef<HTMLInputElement>(null)
  
  const template = getDateTemplate(format, separator)
  
  return (
    <DateFieldProvider
      max={max}
      min={min}
      date={date}
      disabled={disabled}
      disabledDates={disabledDates}
      inputRef={inputInnerRef}
      changeDate={setDate}
      template={template}
      calendar={calendar}
      locale={locale}
    >
      <TextField {...props} />
    </DateFieldProvider>
  )
}