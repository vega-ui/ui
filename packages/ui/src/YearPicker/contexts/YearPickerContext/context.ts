'use client';

import { createContext } from '../../../internals/context';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { GridItemSize, GridItemVariant } from '../../../Grid';

export interface YearPickerContextData {
  /**
   * First day of the focused year, `undefined` until the focused year is known
   * (on the server without `today`).
   */
  year?: string

  /**
   * First day of the year the pages are aligned to: the first focused year.
   */
  anchor?: string
  calendar: CalendarSystem
  size: GridItemSize
  variant: GridItemVariant
  locale: string
  show(date: string, page: HTMLElement): void

  /**
   * Number of years on a page of the scroller.
   */
  period: number

  /**
   * Ref of the scroller element, so the picker knows it is paged.
   */
  pages(element: Element | null): void
}

export const [YearPickerProvider, useYearPickerContext] = createContext<YearPickerContextData>('YearPickerContext', {
  calendar: gregorianCalendar,
  size: 'xs',
  variant: 'secondary',
  locale: 'en-US',
  show() {},
  period: 12,
  pages() {},
})
