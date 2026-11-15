'use client';

import { createContext } from '../../../internals/context';

export interface DayPickerScrollerContextData {
  referenceMonth: string
}

export const [DayPickerScrollerProvider, useDayPickerScrollerContext] = createContext<DayPickerScrollerContextData>('DayPickerScrollerContext', {
  referenceMonth: '',
})
