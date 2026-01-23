'use client';

import { createContext } from '@vega-ui/react-context';

export interface DayPickerScrollerContextData {
  referenceDate: Date
}

export const [DayPickerScrollerProvider, useDayPickerScrollerContext] = createContext<DayPickerScrollerContextData>('YearPickerScrollerContext', {
  referenceDate: new Date(1970, 0, 1),
})