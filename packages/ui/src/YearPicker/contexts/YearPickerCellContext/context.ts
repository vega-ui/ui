'use client';

import { createContext } from '@vega-ui/react-context';
import { CalendarDateFields } from '@vega-ui/i18n';

export interface YearPickerCellContextData {
  /**
   * Column index within the row.
   */
  col: number

  /**
   * The first day of the year as a `YYYY-MM-DD` string.
   */
  date: string

  /**
   * Fields of the year in the calendar system of the picker.
   */
  fields?: CalendarDateFields

  /**
   * Formatted label in the locale and calendar system of the picker.
   */
  label: string
}

export const [YearPickerCellProvider, useYearPickerCellContext] = createContext<YearPickerCellContextData>('YearPickerCell', {
  col: 0,
  date: '',
  label: '',
})
