'use client';

import { createContext } from '../../../internals/context';

export interface GridRowContextState {
  row: number;
}

export const [GridRowProvider, useGridRowContext] = createContext<GridRowContextState>('GridRowContext', {
  row: 0
})