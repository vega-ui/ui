'use client';

import { createContext } from 'react';
import { DataGridSelection } from '../../types.ts';
import { DataGridCellKey } from '../../../DataGrid';

export interface DataGridSelectableContextState<K = DataGridCellKey> {
  selection?: DataGridSelection
  onSelect?(key: K): void
  isSelected(key: K | undefined): boolean
  isDisabled(key: K | undefined): boolean
  selected?: K[] | K
  equals(a: K, b: K): boolean
  compare(a: K, b: K): -1 | 0 | 1
}

export const defaultDataGridSelectableContext: DataGridSelectableContextState = {
  isSelected() {
    return false
  },
  isDisabled() {
    return false
  },
  compare() {
    return 0
  },
  equals() {
    return true
  },
}

export const DataGridSelectableContext = createContext<DataGridSelectableContextState>(defaultDataGridSelectableContext)