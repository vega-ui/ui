'use client';

import { createContext } from 'react';
import { DataGridCoordinates, DataGridCellKey } from '../../types.ts';

export interface DataGridContextState {
  active: DataGridCellKey
  onChangeActive(active: DataGridCellKey): void
  excluded(key?: DataGridCellKey): boolean
  itemRef(position: DataGridCoordinates, key?: DataGridCellKey): (element: HTMLDivElement) => void
}

export const defaultDataGridContext: DataGridContextState = {
  active: '',
  onChangeActive() {},
  excluded() {
    return false
  },
  itemRef() {
    return () => {}
  }
}

export const DataGridContext = createContext<DataGridContextState>(defaultDataGridContext)