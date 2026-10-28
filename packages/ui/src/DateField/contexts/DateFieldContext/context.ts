'use client';

import { RefObject } from 'react'
import { createContext } from '@vega-ui/react-context';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { CalendarDatesDisabled } from '../../../Calendar';

export interface DateFieldContextState {
  date: string
  text?: string
  template: string
  calendar: CalendarSystem
  locale?: string
  disabled?: boolean
  changeText?(text: string): void
  disabledDates?: CalendarDatesDisabled
  inputRef?: RefObject<HTMLInputElement | null>
  min?: string
  max?: string
}

export const [DateFieldProvider, useDateFieldContext] = createContext<DateFieldContextState>('DateFieldContext', {
  template: 'dd.mm.yyyy',
  calendar: gregorianCalendar,
  date: '',
})