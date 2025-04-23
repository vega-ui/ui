'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { SheetContext, SheetContextState } from './context.ts';

export type SheetProvider = SheetContextState

export const SheetProvider: FC<PropsWithChildren<SheetProvider>> = ({
  open,
  changeOpen,
  context,
  contentRef,
  contentProps,
  triggerProps,
  triggerRef,
  isMounted,
  transitionStatus,
  onDrag,
  onPress,
  onRelease,
  onScrollCapture,
  offset,
  transforming,
  children
}) => {
  const value = useMemo(() => ({
    open,
    changeOpen,
    context,
    contentRef,
    contentProps,
    triggerProps,
    triggerRef,
    transitionStatus,
    onDrag,
    onPress,
    onRelease,
    onScrollCapture,
    isMounted,
    offset,
    transforming,
  }), [
    open,
    changeOpen,
    context,
    contentRef,
    contentProps,
    triggerProps,
    triggerRef,
    transitionStatus,
    onDrag,
    onPress,
    onRelease,
    onScrollCapture,
    isMounted,
    offset,
    transforming,
  ])

  return (
    <SheetContext.Provider value={value}>
      {children}
    </SheetContext.Provider>
  )
}