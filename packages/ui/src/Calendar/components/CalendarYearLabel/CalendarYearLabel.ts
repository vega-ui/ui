import { FC } from 'react';
import { useCalendarContext } from '../../contexts';
import { formatCalendarDate } from '@vega-ui/i18n';

export interface CalendarYearLabelProps {
  /**
   * Format of the displayed year (from `Intl.DateTimeFormatOptions`).
   *
   * Possible values:
   * - "numeric" → 2026
   * - "2-digit" → 26
   *
   * Default is typically `"numeric"`.
   */
  format?: Intl.DateTimeFormatOptions['year']
}

/**
 * CalendarYearLabel
 *
 * A presentational component that renders the current calendar year
 * as a localized string.
 *
 * The year value is obtained from `CalendarContext` and formatted using
 * the `Intl.DateTimeFormat` API in the locale and calendar system of the `Calendar`.
 *
 * This component is purely visual and contains no calendar logic,
 * navigation, or state management.
 */
export const CalendarYearLabel: FC<CalendarYearLabelProps> = ({ format = 'numeric' }) => {
  const { month, calendar, locale } = useCalendarContext()
  
  return formatCalendarDate(calendar, month, locale, { year: format })
}