import { FC } from 'react';
import { useCalendarContext } from '../../contexts';
import { formatCalendarDate } from '@vega-ui/i18n';

export interface CalendarMonthLabelProps {
  /**
   * Month display format (from `Intl.DateTimeFormatOptions`).
   * Defines how the month name should appear.
   *
   * Possible values:
   * - "long"   → January (default)
   * - "short"  → Jan
   * - "narrow" → J
   */
  format?: Intl.DateTimeFormatOptions['month']
}

/**
 * CalendarMonthLabel
 *
 * A presentational component that displays the current calendar month
 * as a localized string.
 *
 * The month date is retrieved from `CalendarContext` and formatted using
 * the `Intl.DateTimeFormat` API in the locale and calendar system of the `Calendar`.
 *
 * This component is purely visual and does not contain calendar logic,
 * navigation, or state handling.
 */
export const CalendarMonthLabel: FC<CalendarMonthLabelProps> = ({ format = 'long' }) => {
  const { month, calendar, locale } = useCalendarContext()
  
  return formatCalendarDate(calendar, month, locale, { month: format })
}