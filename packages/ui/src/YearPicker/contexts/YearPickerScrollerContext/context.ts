'use client';

import { createContext } from '@vega-ui/react-context';

export interface YearPickerScrollerContextData {
  referenceYear: string
}

export const [YearPickerScrollerProvider, useYearPickerScrollerContext] = createContext<YearPickerScrollerContextData>('YearPickerScrollerContext', {
  referenceYear: ''
})
