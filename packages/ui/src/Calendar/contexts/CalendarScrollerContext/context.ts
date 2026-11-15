'use client';

import { createContext } from '../../../internals/context';

export interface CalendarScrollerContextData {
  inScroller: boolean
}

export const [CalendarScrollerProvider, useCalendarScrollerContext] = createContext<CalendarScrollerContextData>('CalendarScrollerContext', {
  inScroller: false,
})
