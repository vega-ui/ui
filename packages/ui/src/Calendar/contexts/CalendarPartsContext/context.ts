'use client';

import { createContext } from '../../../internals/context';
import { CalendarSelection } from '../../types';
import { DayPickerProps } from '../../../DayPicker';
import { MonthPickerProps } from '../../../MonthPicker';
import { YearPickerProps } from '../../../YearPicker';

export interface CalendarPartsContextState {
  days: DayPickerProps<CalendarSelection>
  months: MonthPickerProps
  years: YearPickerProps
}

export const [CalendarPartsProvider, useCalendarPartsContext] = createContext<CalendarPartsContextState>('CalendarPartsContext', {
  days: {},
  months: {},
  years: {},
})
