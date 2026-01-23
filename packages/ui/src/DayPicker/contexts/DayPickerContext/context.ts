'use client';

import { createContext } from '@vega-ui/react-context';

export interface DayPickerContextData {
  year?: number
  month?: number
}

export const [DayPickerProvider, useDayPickerContext] = createContext<DayPickerContextData>('YearPickerContext', {
  year: undefined,
  month: undefined,
})