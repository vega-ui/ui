'use client';

import { RefObject } from 'react'
import { createContext } from '@vega-ui/react-context';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { CalendarDatesDisabled } from '../../../Calendar';

export interface DateRangeFieldContextState {
  date: [start: string, end: string]
  template: string
  calendar: CalendarSystem
  locale?: string
  rangeSeparator: string
  disabled?: boolean
  changeDate(date: [start: string, end: string]): void
  disabledDates?: CalendarDatesDisabled
  inputRef?: RefObject<HTMLInputElement | null>
  min?: string
  max?: string
}

export const [DateRangeFieldProvider, useDateRangeFieldContext] = createContext<DateRangeFieldContextState>('DateRangeFieldContext', {
  template: 'dd.mm.yyyy',
  calendar: gregorianCalendar,
  rangeSeparator: ' – ',
  date: ['', ''],
  changeDate() {}
})