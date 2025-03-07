'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { CheckboxCardContext } from './context.ts';

export interface CheckboxCardProviderProps {
  size: 'small' | 'medium' | 'large'
}

export const CheckboxCardProvider: FC<PropsWithChildren<CheckboxCardProviderProps>> = ({ size, children }) => {
  const providerValue = useMemo(() => ({
    size
  }), [size])

  return (
    <CheckboxCardContext.Provider value={providerValue}>
      {children}
    </CheckboxCardContext.Provider>
  )
}