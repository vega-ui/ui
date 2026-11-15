import { FC } from 'react';
import { useWidget, widgetEnvironment } from '../internals/widget';
import { TextField, TextFieldProps } from '../TextField';
import { DateRangeFieldProvider } from './contexts';
import { CalendarDatesDisabled } from '../Calendar';
import { parseISODate } from '@vega-ui/utils';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { useToday } from '../internals/calendar';
import { dateRangeFieldWidget } from '@vega-ui/widgets/date-range-field';

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
   * If not provided, an en dash between non-breaking spaces (U+00A0) is used,
   * so the range does not wrap at the separator.
   *
   * @default '\u00A0–\u00A0'
   */
  rangeSeparator?: string
  
  /**
   * Minimum allowed date as a `YYYY-MM-DD` string.
   * Dates earlier than this value cannot be selected
   * in the calendar and make a typed value invalid, like a native input.
   */
  min?: string
  
  /**
   * Maximum allowed date as a `YYYY-MM-DD` string.
   * Dates later than this value cannot be selected
   * in the calendar and make a typed value invalid, like a native input.
   */
  max?: string
  
  /**
   * Rules for disabling specific dates in the calendar.
   * Can be used to block ranges, weekdays, or custom conditions.
   */
  disabledDates?: CalendarDatesDisabled
  
  /**
   * Disables the field like a native `disabled` input: the input and the
   * trigger are disabled, and the dates are not submitted.
   */
  disabled?: boolean

  /**
   * Makes the field read-only like a native `readonly` input: the input is
   * `readonly`, the calendar still opens to show the range, and picking days
   * does not change it. The dates are still submitted.
   */
  readOnly?: boolean

  /**
   * Today as a `YYYY-MM-DD` string, passed to `DateRangeFieldCalendar` and
   * used to read a two-digit year (`yy`) of `format`: within 80 years before
   * and 19 years after the year of today. Defaults to the date of the device,
   * read after hydration and followed when the day or the time zone changes.
   */
  today?: string
  
  /**
   * Calendar system the dates are typed and picked in. The values stay
   * `YYYY-MM-DD` days.
   * Defaults to the Gregorian calendar.
   */
  calendar?: CalendarSystem
  
  /**
   * BCP 47 locale of the calendar popup (month and day names, first day of
   * the week), e.g. `de-DE`. The typed format still comes from `format`.
   * @default "en-US"
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
  readOnly,
  calendar = gregorianCalendar,
  locale,
  today: _today,
  value,
  defaultValue = ['', ''],
  onChangeValue,
  children,
  ...props
}) => {
  const today = useToday(_today)
  const min = parseISODate(_min) ? _min : undefined
  const max = parseISODate(_max) ? _max : undefined
  const handle = useWidget(dateRangeFieldWidget, {
    format,
    separator,
    rangeSeparator,
    calendar,
    today,
    min,
    max,
    disabledDates,
    value,
    defaultValue,
    onChangeValue,
  }, widgetEnvironment)

  return (
    <DateRangeFieldProvider
      handle={handle}
      max={max}
      min={min}
      disabled={disabled}
      readOnly={readOnly}
      disabledDates={disabledDates}
      calendar={calendar}
      locale={locale}
      today={today}
    >
      <TextField {...props}>
        {children}
      </TextField>
    </DateRangeFieldProvider>
  )
}