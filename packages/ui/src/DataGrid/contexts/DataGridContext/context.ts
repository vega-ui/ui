'use client';

import { createContext } from '@vega-ui/react-context';
import { DataGridCoordinates, DataGridCellKey, DataGridScope } from '../../types';
import { Grid } from '@vega-ui/utils';

export interface DataGridContextState {
  grid: Grid<HTMLDivElement, DataGridCellKey>,
  active: DataGridCellKey
  scopes: Map<DataGridScope, DataGridCellKey[]>
  changeActive(active: DataGridCellKey): void
  excluded(key?: DataGridCellKey): boolean
  setItemRef(position: DataGridCoordinates, key?: DataGridCellKey, scope?: DataGridScope): (element: HTMLDivElement) => void
  removeItemRef(position: DataGridCoordinates, key?: DataGridCellKey, scope?: DataGridScope): void
}

export const [DataGridProvider, useDataGridContext] = createContext<DataGridContextState>('DataGridContext', {
  active: '',
  grid: new Grid(),
  scopes: new Map(),
  changeActive() {},
  excluded() {
    return false
  },
  setItemRef() {
    return () => {}
  },
  removeItemRef() {}
})