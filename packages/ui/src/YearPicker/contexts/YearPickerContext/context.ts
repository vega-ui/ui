'use client';

import { createContext } from '@vega-ui/react-context';
import { getCurrentDate } from '@vega-ui/utils';

export interface YearPickerContextData {
  year: number
}

export const [YearPickerProvider, useYearPickerContext] = createContext<YearPickerContextData>('YearPickerContext', {
  year: getCurrentDate().getFullYear()
})