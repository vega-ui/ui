'use client';

import { createContext } from '../../../internals/context';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { GridItemSize, GridItemVariant } from '../../../Grid';

export interface DayPickerContextData {
  /**
   * First day of the month of the focused day, `undefined` until the focused
   * day is known (on the server without `today`).
   */
  month?: string
  /**
   * First day of the month the scroller pages are counted from: the month of
   * the first focused day.
   */
  anchor?: string
  calendar: CalendarSystem
  size: GridItemSize
  variant: GridItemVariant
  locale: string
  today?: string
  show(date: string, page: HTMLElement): void
}

export const [DayPickerProvider, useDayPickerContext] = createContext<DayPickerContextData>('DayPickerContext', {
  calendar: gregorianCalendar,
  size: 'xs',
  variant: 'secondary',
  locale: 'en-US',
  show() {},
})
