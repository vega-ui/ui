'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { DataGridPickerContext, DataGridPickerContextState } from './context.ts';

type DataGridPickerProviderProps = DataGridPickerContextState

export const DataGridPickerProvider: FC<PropsWithChildren<DataGridPickerProviderProps>> = ({
  size,
  variant,
  children
}) => {
  const value = useMemo(() => ({ size, variant }), [size, variant])

  return (
    <DataGridPickerContext.Provider value={value}>
      {children}
    </DataGridPickerContext.Provider>
  )
}