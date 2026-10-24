'use client';

import { RefObject } from 'react'
import { createContext } from '@vega-ui/react-context';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { CalendarDatesDisabled } from '../../../Calendar';

export interface DateFieldContextState {
  date?: string
  template: string
  calendar: CalendarSystem
  locale?: string
  disabled?: boolean
  changeDate(date: string | undefined): void
  disabledDates?: CalendarDatesDisabled
  inputRef?: RefObject<HTMLInputElement | null>
  min?: string
  max?: string
}

export const [DateFieldProvider, useDateFieldContext] = createContext<DateFieldContextState>('DateFieldContext', {
  template: 'dd.mm.yyyy',
  calendar: gregorianCalendar,
  changeDate() {}
})