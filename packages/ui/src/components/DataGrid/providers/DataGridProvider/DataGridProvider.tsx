'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { DataGridContext, DataGridContextState } from './context.ts';

type DataGridProviderProps = DataGridContextState

export const DataGridProvider: FC<PropsWithChildren<DataGridProviderProps>> = ({
  active,
  onChangeActive,
  itemRef,
  excluded,
  children
}) => {
  const value = useMemo(() => ({
    active,
    onChangeActive,
    itemRef,
    excluded,
  }), [
    active,
    onChangeActive,
    itemRef,
    excluded,
  ])

  return (
    <DataGridContext.Provider value={value}>
      {children}
    </DataGridContext.Provider>
  )
}