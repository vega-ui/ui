'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { DrawerContext, DrawerContextState } from './context.ts';

export type DrawerProviderProps = DrawerContextState

export const DrawerProvider: FC<PropsWithChildren<DrawerProviderProps>> = ({
  open,
  onChangeOpen,
  context,
  contentRef,
  contentProps,
  triggerProps,
  triggerRef,
  isMounted,
  transitionStatus,
  position,
  children
}) => {
  const value = useMemo(() => ({
    open,
    onChangeOpen,
    context,
    contentRef,
    contentProps,
    triggerProps,
    triggerRef,
    isMounted,
    transitionStatus,
    position,
  }), [
    open,
    onChangeOpen,
    context,
    contentRef,
    contentProps,
    triggerProps,
    triggerRef,
    isMounted,
    transitionStatus,
    position,
  ])

  return (
    <DrawerContext.Provider value={value}>
      {children}
    </DrawerContext.Provider>
  )
}