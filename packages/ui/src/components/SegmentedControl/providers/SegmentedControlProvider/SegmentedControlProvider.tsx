'use client';
import { FC, PropsWithChildren, useMemo, ChangeEvent } from 'react';
import { SegmentedControlContext } from './context.ts';

export interface SegmentedControlProviderProps {
  value: string | number | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  size: 'small' | 'medium' | 'large'
  disabled?: boolean
  name?: string
}

export const SegmentedControlProvider: FC<PropsWithChildren<SegmentedControlProviderProps>> = ({ value, onChange, size, name, disabled, children }) => {
  const providerValue = useMemo(() => ({
    value,
    onChange,
    size,
    name,
    disabled,
  }), [value, onChange, size, name, disabled])

  return (
    <SegmentedControlContext.Provider value={providerValue}>
      {children}
    </SegmentedControlContext.Provider>
  )
}