'use client';

import { createContext } from '@vega-ui/react-context';
import { CalendarBaseSize, CalendarBaseVariant } from '../../types.ts';

export interface CalendarBaseContextState {
  size: CalendarBaseSize
  variant: CalendarBaseVariant
}

export const [CalendarBaseProvider, useCalendarBaseContext] = createContext<CalendarBaseContextState>('CalendarBaseContext', {
  variant: 'secondary',
  size: 'xs',
})