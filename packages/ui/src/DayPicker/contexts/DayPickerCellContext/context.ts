'use client';

import { createContext } from '@vega-ui/react-context';
import { CalendarDateFields } from '@vega-ui/i18n';

export interface DayPickerCellContextData {
  /**
   * Column index within the row.
   */
  col: number

  /**
   * The day as a `YYYY-MM-DD` string, or `undefined` for an empty overflow cell.
   */
  date?: string

  /**
   * Fields of the day in the calendar system of the picker.
   */
  fields?: CalendarDateFields

  /**
   * Formatted label in the locale and calendar system of the picker.
   */
  label: string

  /**
   * Whether the day belongs to the rendered month; overflow days are not.
   */
  inMonth: boolean
}

export const [DayPickerCellProvider, useDayPickerCellContext] = createContext<DayPickerCellContextData>('DayPickerCell', {
  col: 0,
  label: '',
  inMonth: false,
})
