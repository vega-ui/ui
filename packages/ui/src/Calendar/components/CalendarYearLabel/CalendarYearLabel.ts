import { FC } from 'react';
import { useCalendarInternalContext, useCalendarStateContext } from '../../contexts';
import { formatCalendarDate } from '@vega-ui/i18n';

export interface CalendarYearLabelProps {
  /**
   * Format of the displayed year (from `Intl.DateTimeFormatOptions`).
   *
   * Possible values:
   * - "numeric" → 2026
   * - "2-digit" → 26
   *
   * @default "numeric"
   */
  format?: Intl.DateTimeFormatOptions['year']
}

/**
 * CalendarYearLabel
 *
 * A presentational component that renders the current calendar year
 * as a localized string.
 *
 * The year is the year of the focused day of the `Calendar`, formatted using
 * the `Intl.DateTimeFormat` API in the locale and calendar system of the `Calendar`.
 *
 * This component is purely visual and contains no calendar logic,
 * navigation, or state management.
 */
export const CalendarYearLabel: FC<CalendarYearLabelProps> = ({ format = 'numeric' }) => {
  const { calendar, locale } = useCalendarInternalContext()
  const { month } = useCalendarStateContext()
  if (month === undefined) return null

  return formatCalendarDate(calendar, month, locale, { year: format })
}