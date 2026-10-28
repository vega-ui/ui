'use client';

import { RefObject } from 'react'
import { createContext } from '@vega-ui/react-context';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { CalendarDatesDisabled } from '../../../Calendar';

export interface DateTimeFieldContextState {
  date?: string
  text?: string
  time: string
  timeStep?: number
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

export const [DateTimeFieldProvider, useDateTimeFieldContext] = createContext<DateTimeFieldContextState>('DateTimeFieldContext', {
  time: '',
  timeStep: 1,
  template: 'dd.mm.yyyy, HH:MM',
  calendar: gregorianCalendar,
})