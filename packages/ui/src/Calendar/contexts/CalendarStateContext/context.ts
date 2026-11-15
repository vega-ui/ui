'use client';

import { createContext } from '../../../internals/context';

export interface CalendarStateContextState {
  month?: string
}

export const [CalendarStateProvider, useCalendarStateContext] = createContext<CalendarStateContextState>('CalendarStateContext', {})
