'use client';

import { RefObject } from 'react';
import { CalendarDatesDisabled, CalendarPicker, CalendarSelection } from '../../types';
import { DataGridApiRef } from '../../../DataGrid';
import { IndexedSnapScrollerApiRef } from '../../../IndexedSnapScroller';
import { createContext } from '@vega-ui/react-context';

export interface CalendarContextState {
  to?: Date
  from?: Date
  year: number
  month: number
  referenceDate: Date
  activeDay: number
  picker: CalendarPicker
  selection: CalendarSelection
  value?: Date | [Date?, Date?] | Date[]
  defaultValue?: Date | [Date?, Date?] | Date[]
  disabled?: CalendarDatesDisabled
  scrollerApiRef: RefObject<IndexedSnapScrollerApiRef | null>
  scrollerYearApiRef: RefObject<IndexedSnapScrollerApiRef | null>
  yearPickerApiRef: RefObject<DataGridApiRef<number> | null>
  dayPickerApiRef: RefObject<DataGridApiRef<number> | null>
  monthPickerApiRef: RefObject<DataGridApiRef<number> | null>
  changePicker(picker: CalendarPicker): void
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
  dayPickerApiRef: { current: null },
  monthPickerApiRef: { current: null },
  yearPickerApiRef: { current: null },
  scrollerApiRef: { current: null },
  scrollerYearApiRef: { current: null },
  changePicker() {},
  changeActiveDay() {},
  selection: 'single',
  picker: 'day',
})