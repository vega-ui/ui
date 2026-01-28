'use client';

import { RefObject } from 'react'
import { createContext } from '@vega-ui/react-context';
import { MaskitoDateMode, MaskitoTimeMode } from '@maskito/kit';
import { CalendarDatesDisabled } from '../../../Calendar';

export interface DateTimeFieldContextState {
  date?: Date
  time: string
  timeStep?: number
  dateFormat: MaskitoDateMode
  timeFormat: MaskitoTimeMode
  separator: string
  disabled?: boolean
  changeTime(time: string): void
  changeDate(date: Date | undefined): void
  dateSeparator: string
  disabledDates?: CalendarDatesDisabled
  inputRef?: RefObject<HTMLInputElement | null>
  lastStringified: RefObject<string>
  min?: Date
  max?: Date
}

export const [DateTimeFieldProvider, useDateTimeFieldContext] = createContext<DateTimeFieldContextState>('DateTimeFieldContext', {
  time: '',
  timeStep: 1,
  dateFormat: 'dd/mm/yyyy',
  timeFormat: 'HH:MM',
  separator: ', ',
  lastStringified: { current: '' },
  dateSeparator: '.',
  changeDate() {},
  changeTime() {}
})