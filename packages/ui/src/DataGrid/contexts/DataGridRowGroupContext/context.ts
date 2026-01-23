'use client';

import { createContext } from '@vega-ui/react-context';

export interface DataGridRowGroupContextState {
  scope?: string | number;
}

export const [DataGridRowGroupProvider, useDataGridRowGroupContext] = createContext<DataGridRowGroupContextState>('DataGridRowGroupContext', {})