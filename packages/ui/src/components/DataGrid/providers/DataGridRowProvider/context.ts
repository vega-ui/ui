'use client';

import { createContext } from 'react';

export interface DataGridRowContextState {
  row: number;
}

export const defaultDataGridRowContext: DataGridRowContextState = {
  row: 0
}

export const DataGridRowContext = createContext<DataGridRowContextState>(defaultDataGridRowContext)