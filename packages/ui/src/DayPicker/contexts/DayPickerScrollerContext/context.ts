'use client';

import { createContext } from '@vega-ui/react-kit/context';

export interface DayPickerScrollerContextData {
  referenceMonth: string
}

export const [DayPickerScrollerProvider, useDayPickerScrollerContext] = createContext<DayPickerScrollerContextData>('DayPickerScrollerContext', {
  referenceMonth: '',
})
