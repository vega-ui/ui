'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { SheetSelectContext } from './context.ts';
import { SelectEvent } from '@vega-ui/react';

type Value = string | number | undefined

export interface SheetSelectProviderProps {
  value: Value
  onSelect: (e: SelectEvent, value: Value) => void
  size: 'small' | 'medium' | 'large'
}

export const SheetSelectProvider: FC<PropsWithChildren<SheetSelectProviderProps>> = ({ value, onSelect, size, children }) => {
  const providerValue = useMemo(() => ({
    value,
    onSelect,
    size
  }), [value, onSelect, size])

  return (
    <SheetSelectContext.Provider value={providerValue}>
      {children}
    </SheetSelectContext.Provider>
  )
}