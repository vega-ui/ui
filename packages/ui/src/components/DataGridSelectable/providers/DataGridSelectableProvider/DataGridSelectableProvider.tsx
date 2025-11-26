'use client';
import { PropsWithChildren, useMemo } from 'react';
import {
  DataGridSelectableContext,
  DataGridSelectableContextState
} from './context';
import { DataGridCellKey } from '../../../DataGrid';

type DataGridSelectableProviderProps<K = DataGridCellKey> = DataGridSelectableContextState<K>

export const DataGridSelectableProvider = <K = DataGridCellKey>({
  onSelect,
  isSelected,
  isDisabled,
  selected,
  selection,
  equals,
  compare,
  children
}: PropsWithChildren<DataGridSelectableProviderProps<K>>) => {
  const value = useMemo(() => ({
    isSelected,
    isDisabled,
    selection,
    onSelect,
    selected,
    equals,
    compare,
  }), [
    selection,
    isSelected,
    isDisabled,
    onSelect,
    selected,
    equals,
    compare,
  ])

  return (
    <DataGridSelectableContext.Provider value={value as DataGridSelectableContextState}>
      {children}
    </DataGridSelectableContext.Provider>
  )
}