import { FC } from 'react';
import { useCalendarContext } from '../../contexts';
import { formatMonth } from '@vega-ui/utils';

export interface CalendarMonthLabelProps {
  /**
   * Locale used to format the month name.
   * If not provided, the browser's locale (`navigator.language`) is used.
   * This controls the language of the displayed month.
   */
  locale?: Intl.LocalesArgument
  
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
 * the `Intl.DateTimeFormat` API via the `formatMonth` utility.
 *
 * This component is purely visual and does not contain calendar logic,
 * navigation, or state handling.
 */
export const CalendarMonthLabel: FC<CalendarMonthLabelProps> = ({ locale, format = 'long' }) => {
  const { month } = useCalendarContext()
  return formatMonth(month, locale ?? navigator.language, format)
}