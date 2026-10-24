'use client';

import { createContext } from '@vega-ui/react-context';
import { CalendarSystem, getDefaultLocale, gregorianCalendar } from '@vega-ui/i18n';

export interface MonthPickerContextData {
  year: string
  calendar: CalendarSystem
  locale: string
}

export const [MonthPickerProvider, useMonthPickerContext] = createContext<MonthPickerContextData>('MonthPickerContext', {
  year: '',
  calendar: gregorianCalendar,
  locale: getDefaultLocale(),
})
