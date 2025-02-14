'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { ResponsiveModalContext } from './context.ts';

export interface ResponsiveModalProviderProps {
  isBreakpoint: boolean;
}

export const ResponsiveModalProvider: FC<PropsWithChildren<ResponsiveModalProviderProps>> = ({ isBreakpoint, children }) => {
  const providerValue = useMemo(() => ({
    isBreakpoint
  }), [isBreakpoint])

  return (
    <ResponsiveModalContext.Provider value={providerValue}>
      {children}
    </ResponsiveModalContext.Provider>
  )
}