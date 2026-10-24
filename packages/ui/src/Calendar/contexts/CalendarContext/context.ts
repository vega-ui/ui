'use client';

import { RefObject } from 'react';
import { CalendarSystem, getDefaultLocale, gregorianCalendar } from '@vega-ui/i18n';
import { CalendarDatesDisabled, CalendarSelection, CalendarView } from '../../types';
import { DataGridApiRef } from '../../../DataGrid';
import { IndexedSnapScrollerApiRef } from '../../../IndexedSnapScroller';
import { createContext } from '@vega-ui/react-context';

export interface CalendarContextState {
  to?: string
  from?: string
  month: string
  calendar: CalendarSystem
  locale: string
  activeDay: string
  view: CalendarView
  selection: CalendarSelection
  value?: string | null | string[]
  defaultValue?: string | null | string[]
  disabled?: boolean
  disabledDates?: CalendarDatesDisabled
  scrollerApiRef: RefObject<IndexedSnapScrollerApiRef | null>
  scrollerYearApiRef: RefObject<IndexedSnapScrollerApiRef | null>
  yearPickerApiRef: RefObject<DataGridApiRef<string> | null>
  dayPickerApiRef: RefObject<DataGridApiRef<string> | null>
  monthPickerApiRef: RefObject<DataGridApiRef<string> | null>
  changeActiveDay(day: string): void
  closeView?(): void
  changePeriod?(month: string): void
  changeYear?(year: string): void
  changeMonth?(month: string): void
  onSelectDay?(day: string | string[]): void
  toggleView?(view: Exclude<CalendarView, 'day'>): void
  prev?(): void
  next?(): void
}

export const [CalendarProvider, useCalendarContext] = createContext<CalendarContextState>('CalendarContext', {
  month: '',
  calendar: gregorianCalendar,
  locale: getDefaultLocale(),
  activeDay: '',
  dayPickerApiRef: { current: null },
  monthPickerApiRef: { current: null },
  yearPickerApiRef: { current: null },
  scrollerApiRef: { current: null },
  scrollerYearApiRef: { current: null },
  changeActiveDay() {},
  selection: 'single',
  view: 'day',
})
