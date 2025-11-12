'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { DataGridRowContext, DataGridRowContextState } from './context.ts';

type DataGridRowProviderProps = DataGridRowContextState

export const DataGridRowProvider: FC<PropsWithChildren<DataGridRowProviderProps>> = ({
  row,
  children
}) => {
  const value = useMemo(() => ({
    row
  }), [row])

  return (
    <DataGridRowContext.Provider value={value}>
      {children}
    </DataGridRowContext.Provider>
  )
}