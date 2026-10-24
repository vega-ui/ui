'use client';

import { createContext } from '@vega-ui/react-context';
import { CalendarSystem, getDefaultLocale, gregorianCalendar } from '@vega-ui/i18n';

export interface DayPickerContextData {
  month: string
  calendar: CalendarSystem
  locale: string
}

export const [DayPickerProvider, useDayPickerContext] = createContext<DayPickerContextData>('DayPickerContext', {
  month: '',
  calendar: gregorianCalendar,
  locale: getDefaultLocale(),
})
