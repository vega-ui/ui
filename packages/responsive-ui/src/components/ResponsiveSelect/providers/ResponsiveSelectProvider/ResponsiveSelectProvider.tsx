'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { ResponsiveSelectContext } from './context.ts';

export interface ResponsiveSelectProviderProps {
  isBreakpoint: boolean;
}

export const ResponsiveSelectProvider: FC<PropsWithChildren<ResponsiveSelectProviderProps>> = ({ isBreakpoint, children }) => {
  const providerValue = useMemo(() => ({
    isBreakpoint
  }), [isBreakpoint])

  return (
    <ResponsiveSelectContext.Provider value={providerValue}>
      {children}
    </ResponsiveSelectContext.Provider>
  )
}