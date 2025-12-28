'use client';

import { createContext } from '@vega-ui/react-context';

export interface MeterStackContextState {
  min: number
  max: number
}

export const [MeterStackProvider, useMeterStackContext] = createContext<MeterStackContextState>('ProgressContext', {
  min: 0,
  max: 100,
})