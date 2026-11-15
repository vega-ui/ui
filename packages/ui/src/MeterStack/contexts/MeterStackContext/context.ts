'use client';

import { createContext } from '../../../internals/context';

export interface MeterStackContextState {
  min: number
  max: number
}

export const [MeterStackProvider, useMeterStackContext] = createContext<MeterStackContextState>('ProgressContext', {
  min: 0,
  max: 1,
})