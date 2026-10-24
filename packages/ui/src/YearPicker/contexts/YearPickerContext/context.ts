'use client';

import { createContext } from '@vega-ui/react-context';
import { CalendarSystem, getDefaultLocale, gregorianCalendar } from '@vega-ui/i18n';

export interface YearPickerContextData {
  year: string
  calendar: CalendarSystem
  locale: string
}

export const [YearPickerProvider, useYearPickerContext] = createContext<YearPickerContextData>('YearPickerContext', {
  year: '',
  calendar: gregorianCalendar,
  locale: getDefaultLocale(),
})
