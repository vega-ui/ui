'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { PaginationContext, PaginationContextState } from './context.ts';

export type PaginationProvider = PaginationContextState

export const PaginationProvider: FC<PropsWithChildren<PaginationProvider>> = ({
  size,
  variant,
  children
}) => {
  const value = useMemo(() => ({
    size,
    variant
  }), [size, variant])

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  )
}