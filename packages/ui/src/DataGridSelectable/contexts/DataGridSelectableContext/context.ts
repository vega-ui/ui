'use client';

import { createContext } from '@vega-ui/react-context';
import { DataGridSelection } from '../../types';
import { DataGridCellKey } from '../../../DataGrid';

export interface DataGridSelectableContextState<K> {
  selection?: DataGridSelection
  onSelect?(key: K): void
  isSelected(key: K | undefined): boolean
  isDisabled(key: K | undefined): boolean
  selected?: K[] | K
  equals(a: K, b: K): boolean
  compare(a: K, b: K): -1 | 0 | 1
}

export const [DataGridSelectableProvider, useDataGridSelectableContext] = createContext<DataGridSelectableContextState<DataGridCellKey>>('DataGridSelectableContext', {
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
})