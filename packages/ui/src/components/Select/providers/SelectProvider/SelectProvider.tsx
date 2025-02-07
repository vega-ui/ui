'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { SelectContext, SelectContextState } from './context.ts';

type Value = string | number | undefined

export interface SelectProviderProps {
  value: Value
  activeIndex: number | undefined | null
  onSelect: (value: Value) => void
  getItemProps: SelectContextState['getItemProps']
  size: 'small' | 'medium' | 'large'
}

export const SelectProvider: FC<PropsWithChildren<SelectProviderProps>> = ({ value, activeIndex, onSelect, getItemProps, size, children }) => {
  const providerValue = useMemo(() => ({
    value,
    activeIndex,
    onSelect,
    getItemProps,
    size
  }), [value, onSelect, getItemProps, activeIndex, size])

  return (
    <SelectContext.Provider value={providerValue}>
      {children}
    </SelectContext.Provider>
  )
}