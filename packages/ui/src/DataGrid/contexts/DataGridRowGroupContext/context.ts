'use client';

import { createContext } from '@vega-ui/react-kit/context';

export interface DataGridRowGroupContextState {
  scope?: string | number;
}

export const [DataGridRowGroupProvider, useDataGridRowGroupContext] = createContext<DataGridRowGroupContextState>('DataGridRowGroupContext', {})