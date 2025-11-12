'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import {
  DataGridSelectableContext,
  DataGridSelectableContextState
} from './context';

type DataGridSelectableProviderProps = DataGridSelectableContextState

export const DataGridSelectableProvider: FC<PropsWithChildren<DataGridSelectableProviderProps>> = ({
  onSelect,
  isSelected,
  isDisabled,
  selected,
  selection,
  equals,
  compare,
  children
}) => {
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
    <DataGridSelectableContext.Provider value={value}>
      {children}
    </DataGridSelectableContext.Provider>
  )
}