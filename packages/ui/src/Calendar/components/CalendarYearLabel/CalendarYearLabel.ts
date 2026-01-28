import { FC } from 'react';
import { useCalendarContext } from '../../contexts';
import { formatYear } from '@vega-ui/utils';

export interface CalendarYearLabelProps {
  /**
   * Locale(s) used to format the year label.
   * Accepts any value supported by the Intl API:
   * - BCP 47 string (e.g. "en-US", "de-DE")
   * - Array of locales (e.g. ["en-GB", "en-US"])
   *
   * If not provided, the browser locale is used.
   */
  locale?: Intl.LocalesArgument
  
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
 * the `Intl.DateTimeFormat` API via the `formatYear` utility.
 *
 * This component is purely visual and contains no calendar logic,
 * navigation, or state management.
 */
export const CalendarYearLabel: FC<CalendarYearLabelProps> = ({ locale, format = 'numeric' }) => {
  const { year } = useCalendarContext()
  return formatYear(year, locale ?? navigator.language, format)
}