'use client';

import { createContext } from '@vega-ui/react-context';
import { MaskitoTimeMode } from '@maskito/kit';

export interface TimeFieldContextState {
  format: MaskitoTimeMode
  min?: `${string}:${string}` | `${string}:${string}:${string}`
  max?: `${string}:${string}` | `${string}:${string}:${string}`
  step?: number
}

export const [TimeFieldProvider, useTimeFieldContext] = createContext<TimeFieldContextState>('TimeFieldContext', {
  format: 'HH:MM'
})