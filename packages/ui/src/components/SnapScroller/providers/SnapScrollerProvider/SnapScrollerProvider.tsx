'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { SnapScrollerContext, SnapScrollerContextState } from './context';

type LoopScrollProviderProps = SnapScrollerContextState

export const SnapScrollerProvider: FC<PropsWithChildren<LoopScrollProviderProps>> = ({
  itemRef,
  children
}) => {
  const value = useMemo(() => ({
    itemRef,
  }), [itemRef])

  return (
    <SnapScrollerContext.Provider value={value}>
      {children}
    </SnapScrollerContext.Provider>
  )
}