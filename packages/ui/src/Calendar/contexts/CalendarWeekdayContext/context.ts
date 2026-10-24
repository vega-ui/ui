'use client';

import { createContext } from '@vega-ui/react-context';

export interface CalendarWeekdayContextData {
  /**
   * Column index within the row of weekdays.
   */
  col: number

  /**
   * Day of the week as in `Date#getDay()`: 0 is Sunday, 6 is Saturday.
   */
  weekday: number

  /**
   * Weekday name in the locale of the `Calendar`.
   */
  label: string
}

/**
 * The weekday of the surrounding `CalendarWeekday` template: its column, day
 * of the week and the formatted name.
 */
export const [CalendarWeekdayProvider, useCalendarWeekdayContext] = createContext<CalendarWeekdayContextData>('CalendarWeekdayContext', {
  col: 0,
  weekday: 0,
  label: '',
})
