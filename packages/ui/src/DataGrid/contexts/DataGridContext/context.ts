'use client';

import { createContext } from '@vega-ui/react-context';
import { DataGridCoordinates, DataGridCellKey } from '../../types.ts';

export interface DataGridContextState {
  active: DataGridCellKey
  onChangeActive(active: DataGridCellKey): void
  excluded(key?: DataGridCellKey): boolean
  itemRef(position: DataGridCoordinates, key?: DataGridCellKey): (element: HTMLDivElement) => void
}

export const [DataGridProvider, useDataGridContext] = createContext<DataGridContextState>('DataGridContext', {
  active: '',
  onChangeActive() {},
  excluded() {
    return false
  },
  itemRef() {
    return () => {}
  }
})