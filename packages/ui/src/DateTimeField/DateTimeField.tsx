import { FC } from 'react';
import { useWidget, widgetEnvironment } from '../internals/widget';
import { TextField, TextFieldProps } from '../TextField';
import { DateTimeFieldProvider } from './contexts';
import { CalendarDatesDisabled } from '../Calendar';
import { parseISODateTime } from '@vega-ui/utils';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { useToday } from '../internals/calendar';
import { dateTimeFieldWidget } from '@vega-ui/widgets/date-time-field';

export interface DateTimeFieldProps extends Omit<TextFieldProps, 'defaultValue'> {
  /**
   * Controlled date and time as a `YYYY-MM-DDTHH:mm` string (with `:ss` when
   * the format has seconds), `''` while the field has no complete value.
   */
  value?: string

  /**
   * Initial date and time for uncontrolled usage, like `value`.
   * Defaults to `''`, an empty field.
   */
  defaultValue?: string

  /**
   * Called with the date and time when they change, `''` when the text is
   * emptied or incomplete.
   */
  onChangeValue?(value: string): void

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
   * input with `step`, the hours always move by one. A step past `min` or
   * `max` stops at the bound. `0` turns arrow stepping off. Typed values are
   * not snapped to the step.
   */
  timeStep?: number
  
  /**
   * Character used to separate segments (date and time) in the input.
   *
   * Examples:
   * - ","
   * - "-"
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
   * in the calendar and make a typed value invalid, like a native input.
   */
  min?: string
  
  /**
   * Maximum allowed date–time as a `YYYY-MM-DDTHH:mm[:ss]` string.
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
   * Disables the field like a native `disabled` input: the input, the
   * trigger and the time wheels are disabled, and the value is not submitted.
   */
  disabled?: boolean

  /**
   * Makes the field read-only like a native `readonly` input: the input is
   * `readonly`, the calendar and the time wheels still open to show the
   * timestamp, and picking a day or turning a wheel does not change it. The
   * value is still submitted.
   */
  readOnly?: boolean

  /**
   * Today as a `YYYY-MM-DD` string, passed to `DateTimeFieldCalendar` and
   * used to read a two-digit year (`yy`) of `dateFormat`: within 80 years
   * before and 19 years after the year of today. Defaults to the date of the
   * device, read after hydration and followed when the day or the time zone
   * changes.
   */
  today?: string
  
  /**
   * Calendar system the date is typed and picked in. The value stays a
   * `YYYY-MM-DDTHH:mm[:ss]` string.
   * Defaults to the Gregorian calendar.
   */
  calendar?: CalendarSystem
  
  /**
   * BCP 47 locale of the calendar popup (month and day names, first day of
   * the week), e.g. `de-DE`. The typed format still comes from `dateFormat`.
   * @default "en-US"
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
  readOnly,
  calendar = gregorianCalendar,
  locale,
  today: _today,
  value,
  defaultValue = '',
  onChangeValue,
  children,
  ...props
}) => {
  const today = useToday(_today)
  const min = parseISODateTime(_min) ? _min : undefined
  const max = parseISODateTime(_max) ? _max : undefined
  const handle = useWidget(dateTimeFieldWidget, {
    dateFormat,
    dateSeparator,
    separator,
    timeFormat,
    timeStep,
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
    <DateTimeFieldProvider
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
    </DateTimeFieldProvider>
  )
}