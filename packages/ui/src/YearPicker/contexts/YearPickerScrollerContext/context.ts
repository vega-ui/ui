'use client';

import { createContext } from '@vega-ui/react-kit/context';

export interface YearPickerScrollerContextData {
  referenceYear: string
}

export const [YearPickerScrollerProvider, useYearPickerScrollerContext] = createContext<YearPickerScrollerContextData>('YearPickerScrollerContext', {
  referenceYear: ''
})
