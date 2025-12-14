'use client';

import { RefObject } from 'react';
import { CalendarPicker, CalendarSelection } from '../../types.ts';
import { DataGridApiRef } from '../../../DataGrid';
import { IndexedSnapScrollerApiRef } from '../../../IndexedSnapScroller/types.ts';
import { createContext } from '@vega-ui/react-context';

export interface CalendarContextState {
  to?: Date
  from?: Date
  year: number
  month: number
  activeYear: number
  activeMonth: number
  activeDay: number
  picker: CalendarPicker
  selection: CalendarSelection
  value?: Date | [Date, Date] | Date[]
  scrollerApiRef: RefObject<IndexedSnapScrollerApiRef | null>
  yearPickerApiRef: RefObject<DataGridApiRef<number> | null>
  dayPickerApiRef: RefObject<DataGridApiRef<number> | null>
  monthPickerApiRef: RefObject<DataGridApiRef<number> | null>
  changePicker(picker: CalendarPicker): void
  changeActiveYear(year: number): void
  changeActiveMonth(month: number): void
  changeActiveDay(day: number): void
  closeYearPicker?(): void
  closeMonthPicker?(): void
  onSelectYear?(year: number): void
  onSelectMonth?(month: number): void
  onSelectDay?(day: number | number[]): void
  onSnap?(index: number): void
  onMonthPickerClick?(): void
  onYearPickerClick?(): void
  prev?(): void
  next?(): void
}

export const [CalendarProvider, useCalendarContext] = createContext<CalendarContextState>('CalendarContext', {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  activeDay: new Date().getDate(),
  activeMonth: new Date().getMonth(),
  activeYear: new Date().getFullYear(),
  dayPickerApiRef: { current: null },
  monthPickerApiRef: { current: null },
  yearPickerApiRef: { current: null },
  scrollerApiRef: { current: null },
  changePicker() {},
  changeActiveDay() {},
  changeActiveYear() {},
  changeActiveMonth() {},
  selection: 'single',
  picker: 'day',
})