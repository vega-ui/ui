'use client';
import { FC, PropsWithChildren, useMemo, ChangeEvent } from 'react';
import { SegmentedControlContext } from './context.ts';

export interface SegmentedControlProviderProps {
  value: string | number | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  size: 'small' | 'medium' | 'large'
  disabled?: boolean
  name?: string
  variant?: 'primary' | 'secondary'
}

export const SegmentedControlProvider: FC<PropsWithChildren<SegmentedControlProviderProps>> = ({ value, variant, onChange, size, name, disabled, children }) => {
  const providerValue = useMemo(() => ({
    value,
    onChange,
    size,
    name,
    disabled,
    variant
  }), [value, onChange, size, name, variant, disabled])

  return (
    <SegmentedControlContext.Provider value={providerValue}>
      {children}
    </SegmentedControlContext.Provider>
  )
}