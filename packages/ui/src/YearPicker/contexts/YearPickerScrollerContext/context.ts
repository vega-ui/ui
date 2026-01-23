'use client';

import { createContext } from '@vega-ui/react-context';

export interface YearPickerScrollerContextData {
  referenceYear: number
}

export const [YearPickerScrollerProvider, useYearPickerScrollerContext] = createContext<YearPickerScrollerContextData>('YearPickerScrollerContext', {
  referenceYear: 1970
})