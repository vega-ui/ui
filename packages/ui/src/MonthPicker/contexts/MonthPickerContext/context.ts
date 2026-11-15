'use client';

import { createContext } from '../../../internals/context';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { GridItemSize, GridItemVariant } from '../../../Grid';

export interface MonthPickerContextData {
  /**
   * First day of the year of the focused month, `undefined` until the focused
   * month is known (on the server without `today`).
   */
  year?: string
  calendar: CalendarSystem
  size: GridItemSize
  variant: GridItemVariant
  locale: string
}

export const [MonthPickerProvider, useMonthPickerContext] = createContext<MonthPickerContextData>('MonthPickerContext', {
  calendar: gregorianCalendar,
  size: 'xs',
  variant: 'secondary',
  locale: 'en-US',
})
