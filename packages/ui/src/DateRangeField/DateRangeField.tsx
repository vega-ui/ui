import { FC, useRef, useState } from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { DateRangeFieldProvider } from './contexts';
import { CalendarDatesDisabled } from '../Calendar';
import { useControlledState, useFormReset } from '@vega-ui/hooks';
import { formatTemplateRange, parseISODate, parseTemplateRange, getDateTemplate } from '@vega-ui/utils';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';

export interface DateRangeFieldProps extends Omit<TextFieldProps, 'defaultValue'> {
  /**
   * Controlled range as a `[start, end]` tuple of `YYYY-MM-DD` strings.
   * A bound is `''` while it is not complete; without a start the range is
   * empty.
   */
  value?: [start: string, end: string]

  /**
   * Initial range for uncontrolled usage, like `value`.
   * Defaults to `['', '']`, an empty field.
   */
  defaultValue?: [start: string, end: string]

  /**
   * Called with the range when it changes.
   */
  onChangeValue?(value: [start: string, end: string]): void

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
   * Separator used between the start and end dates in the range input, by default an en dash between non-breaking spaces (`'\u00A0–\u00A0'`).
   *
   * Defines how two dates are visually and logically separated when entering
   * or displaying a date range.
   *
   * Examples:
   * - " – "  → "01.01.2024 – 31.01.2024"
   * - " - "  → "01.01.2024 - 31.01.2024"
   * - " to " → "01.01.2024 to 31.01.2024"
   *
   * If not provided, an en dash between non-breaking spaces (U+00A0) is used,
   * so the range does not wrap at the separator.
   *
   * @default '\u00A0–\u00A0'
   */
  rangeSeparator?: string
  
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
   * Prevents user input and interaction, and applies the disabled visual state.
   */
  disabled?: boolean
  
  /**
   * Calendar system the dates are typed and picked in. The values stay
   * `YYYY-MM-DD` days.
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
 * DateRangeField — a high-level date range input component that combines a
 * masked text input with a range-enabled calendar picker under a single
 * TextField interface.
 *
 * Purpose:
 * Provides a unified way to enter a start and end date either by typing a
 * formatted range or by selecting dates from a calendar, while keeping both
 * representations synchronized.
 */
export const DateRangeField: FC<DateRangeFieldProps> = ({
  format,
  disabled,
  separator,
  max: _max,
  min: _min,
  disabledDates,
  rangeSeparator = ' – ',
  calendar = gregorianCalendar,
  locale,
  value,
  defaultValue = ['', ''],
  onChangeValue,
  ...props
}) => {
  const min = parseISODate(_min) ? _min : undefined
  const max = parseISODate(_max) ? _max : undefined
  const [range, setRange] = useControlledState(value, defaultValue, onChangeValue)
  const [text, setText] = useState('')
  
  const inputInnerRef = useRef<HTMLInputElement>(null)
  
  const template = getDateTemplate(format, separator)

  const textRange = parseTemplateRange(calendar, text, template, rangeSeparator)
  const isTextShown = textRange[0] === range[0] && textRange[1] === range[1]
  const shownText = isTextShown ? text : formatTemplateRange(calendar, range, template, rangeSeparator)

  const changeText = (text: string) => {
    setText(text)

    const [start, end] = parseTemplateRange(calendar, text, template, rangeSeparator)
    if (start !== range[0] || end !== range[1]) setRange([start, end])
  }

  useFormReset(inputInnerRef, () => {
    if (value !== undefined) return

    setText(formatTemplateRange(calendar, defaultValue, template, rangeSeparator))
    setRange(defaultValue)
  })
  
  return (
    <DateRangeFieldProvider
      max={max}
      min={min}
      date={range}
      text={shownText}
      changeText={changeText}
      disabledDates={disabledDates}
      disabled={disabled}
      inputRef={inputInnerRef}
      template={template}
      calendar={calendar}
      locale={locale}
      rangeSeparator={rangeSeparator}
    >
      <TextField {...props} />
    </DateRangeFieldProvider>
  )
}