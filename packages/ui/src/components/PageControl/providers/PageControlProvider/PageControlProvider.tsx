'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { PageControlContext, PageControlContextState } from './context.ts';

export type PageControlProvider = PageControlContextState

export const PageControlProvider: FC<PropsWithChildren<PageControlProvider>> = ({
  active,
  variant,
  size,
  itemRef,
  children
}) => {
  const value = useMemo(() => ({
    active,
    variant,
    size,
    itemRef,
  }), [active, variant, size, itemRef])

  return (
    <PageControlContext.Provider value={value}>
      {children}
    </PageControlContext.Provider>
  )
}