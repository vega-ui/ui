'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { CheckboxCardContext } from './context.ts';
import { CheckboxCardSize } from '../../types.ts';

export interface CheckboxCardProviderProps {
  size: CheckboxCardSize
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