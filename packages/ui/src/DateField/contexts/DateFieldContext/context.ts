'use client';

import { RefObject } from 'react'
import { createContext } from '@vega-ui/react-context';
import { MaskitoDateMode } from '@maskito/kit';
import { CalendarDatesDisabled } from '../../../Calendar';

export interface DateFieldContextState {
  date?: Date
  format: MaskitoDateMode
  separator: string
  disabled?: boolean
  changeDate(date: Date | undefined): void
  disabledDates?: CalendarDatesDisabled
  inputRef?: RefObject<HTMLInputElement | null>
  lastStringified: RefObject<string>
  min?: Date
  max?: Date
}

export const [DateFieldProvider, useDateFieldContext] = createContext<DateFieldContextState>('DateFieldContext', {
  format: 'dd/mm/yyyy',
  separator: '',
  lastStringified: { current: '' },
  changeDate() {}
})