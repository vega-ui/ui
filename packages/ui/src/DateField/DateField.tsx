import { FC } from 'react';
import { useWidget, widgetEnvironment } from '../internals/widget';
import { TextField, TextFieldProps } from '../TextField';
import { DateFieldProvider } from './contexts';
import { CalendarDatesDisabled } from '../Calendar';
import { parseISODate } from '@vega-ui/utils';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { useToday } from '../internals/calendar';
import { dateFieldWidget } from '@vega-ui/widgets/date-field';

export interface DateFieldProps extends Omit<TextFieldProps, 'defaultValue'> {
  /**
   * Controlled date as a `YYYY-MM-DD` string, `''` while the field has no
   * complete date.
   */
  value?: string

  /**
   * Initial date for uncontrolled usage as a `YYYY-MM-DD` string.
   * Defaults to `''`, an empty field.
   */
  defaultValue?: string

  /**
   * Called with the `YYYY-MM-DD` date when it changes, `''` when the text is
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
   * trigger are disabled, and the date is not submitted.
   */
  disabled?: boolean

  /**
   * Makes the field read-only like a native `readonly` input: the input is
   * `readonly`, the calendar still opens to show the date, and picking a day
   * does not change it. The date is still submitted.
   */
  readOnly?: boolean

  /**
   * Today as a `YYYY-MM-DD` string, passed to `DateFieldCalendar` and used to
   * read a two-digit year (`yy`) of `format`: within 80 years before and 19
   * years after the year of today. Defaults to the date of the device, read
   * after hydration and followed when the day or the time zone changes.
   */
  today?: string
  
  /**
   * Calendar system the date is typed and picked in. The value stays a
   * `YYYY-MM-DD` day.
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
export const DateField: FC<DateFieldProps> = ({
  format,
  separator,
  max: _max,
  min: _min,
  disabledDates,
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
  const min = parseISODate(_min) ? _min : undefined
  const max = parseISODate(_max) ? _max : undefined
  const handle = useWidget(dateFieldWidget, { format, separator, calendar, today, min, max, disabledDates, value, defaultValue, onChangeValue }, widgetEnvironment)

  return (
    <DateFieldProvider
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
    </DateFieldProvider>
  )
}