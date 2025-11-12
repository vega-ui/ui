'use client';

import { createContext } from 'react';
import { DataGridSelection } from '../../types.ts';
import { DataGridCellKey } from '../../../DataGrid/types.ts';

export interface DataGridSelectableContextState {
  selection?: DataGridSelection
  onSelect?(key: DataGridCellKey): void
  isSelected?(key: DataGridCellKey): boolean
  isDisabled?(key: DataGridCellKey): boolean
  selected?: Array<DataGridCellKey> | DataGridCellKey
  equals(a: DataGridCellKey, b: DataGridCellKey): boolean
  compare(a: DataGridCellKey, b: DataGridCellKey): -1 | 0 | 1
}

export const defaultDataGridSelectableContext: DataGridSelectableContextState = {
  compare() {
    return 0
  },
  equals() {
    return true
  },
}

export const DataGridSelectableContext = createContext<DataGridSelectableContextState>(defaultDataGridSelectableContext)