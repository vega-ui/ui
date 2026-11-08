'use client';

import { createContext } from '@vega-ui/react-kit/context';
import { CalendarBaseSize, CalendarBaseVariant } from '../../types';

export interface CalendarBaseContextState {
  size: CalendarBaseSize
  variant: CalendarBaseVariant
}

export const [CalendarBaseProvider, useCalendarBaseContext] = createContext<CalendarBaseContextState>('CalendarBaseContext', {
  variant: 'secondary',
  size: 'xs',
})