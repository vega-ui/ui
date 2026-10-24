'use client';

import { createContext } from '@vega-ui/react-context';
import { CalendarDateFields } from '@vega-ui/i18n';

export interface MonthPickerCellContextData {
  /**
   * Column index within the row.
   */
  col: number

  /**
   * The first day of the month as a `YYYY-MM-DD` string.
   */
  date: string

  /**
   * Fields of the month in the calendar system of the picker.
   */
  fields?: CalendarDateFields

  /**
   * Formatted label in the locale and calendar system of the picker.
   */
  label: string
}

export const [MonthPickerCellProvider, useMonthPickerCellContext] = createContext<MonthPickerCellContextData>('MonthPickerCell', {
  col: 0,
  date: '',
  label: '',
})
