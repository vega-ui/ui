'use client';

import { createContext } from '@vega-ui/react-context';

export interface DataGridRowContextState {
  row: number;
}

export const [DataGridRowProvider, useDataGridRowContext] = createContext<DataGridRowContextState>('DataGridRowContext', {
  row: 0
})