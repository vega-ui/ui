'use client';

import { RefObject } from 'react';
import { CalendarPicker, CalendarSelection } from '../../types';
import { DataGridApiRef } from '../../../DataGrid';
import { IndexedSnapScrollerApiRef } from '../../../IndexedSnapScroller/types';
import { createContext } from '@vega-ui/react-context';

export interface CalendarContextState {
  to?: Date
  from?: Date
  year: number
  month: number
  referenceDate: Date
  activeYear: number
  activeMonth: number
  activeDay: number
  picker: CalendarPicker
  selection: CalendarSelection
  value?: Date | [Date, Date] | Date[]
  defaultValue?: Date | [Date, Date] | Date[]
  scrollerApiRef: RefObject<IndexedSnapScrollerApiRef | null>
  scrollerYearApiRef: RefObject<IndexedSnapScrollerApiRef | null>
  yearPickerApiRef: RefObject<DataGridApiRef<number> | null>
  dayPickerApiRef: RefObject<DataGridApiRef<number> | null>
  monthPickerApiRef: RefObject<DataGridApiRef<number> | null>
  changePicker(picker: CalendarPicker): void
  changeActiveYear(year: number): void
  changeActiveMonth(month: number): void
  changeActiveDay(day: number): void
  closeYearPicker?(): void
  closeMonthPicker?(): void
  changePeriod?(year: number, month: number): void
  changeYear?(year: number): void
  changeMonth?(month: number): void
  onSelectDay?(day: number | number[]): void
  toggleMonthPicker?(): void
  toggleYearPicker?(): void
  prevPeriod?(): void
  nextPeriod?(): void
  nextYearGroup?(): void
  prevYearGroup?(): void
}

export const [CalendarProvider, useCalendarContext] = createContext<CalendarContextState>('CalendarContext', {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  referenceDate: new Date(),
  activeDay: new Date().getDate(),
  activeMonth: new Date().getMonth(),
  activeYear: new Date().getFullYear(),
  dayPickerApiRef: { current: null },
  monthPickerApiRef: { current: null },
  yearPickerApiRef: { current: null },
  scrollerApiRef: { current: null },
  scrollerYearApiRef: { current: null },
  changePicker() {},
  changeActiveDay() {},
  changeActiveYear() {},
  changeActiveMonth() {},
  selection: 'single',
  picker: 'day',
})