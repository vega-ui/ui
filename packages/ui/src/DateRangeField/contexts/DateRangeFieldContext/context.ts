'use client';

import { RefObject } from 'react'
import { createContext } from '@vega-ui/react-context';
import { MaskitoDateMode } from '@maskito/kit';
import { CalendarDatesDisabled } from '../../../Calendar';

export interface DateRangeFieldContextState {
  date: [Date?, Date?]
  format: MaskitoDateMode
  separator: string
  rangeSeparator?: string
  disabled?: boolean
  changeDate(date: [Date?, Date?]): void
  disabledDates?: CalendarDatesDisabled
  inputRef?: RefObject<HTMLInputElement | null>
  lastStringified: RefObject<string>
  min?: Date
  max?: Date
}

export const [DateRangeFieldProvider, useDateRangeFieldContext] = createContext<DateRangeFieldContextState>('DateRangeFieldContext', {
  format: 'dd/mm/yyyy',
  separator: '',
  date: [],
  lastStringified: { current: '' },
  changeDate() {}
})