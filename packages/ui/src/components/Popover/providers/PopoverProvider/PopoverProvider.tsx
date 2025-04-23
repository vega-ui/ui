'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { PopoverContext, PopoverContextState } from './context.ts';

export type PopoverProvider = PopoverContextState

export const PopoverProvider: FC<PropsWithChildren<PopoverProvider>> = ({
  open,
  changeOpen,
  role,
  context,
  contentRef,
  contentProps,
  triggerProps,
  triggerRef,
  placement,
  contentStyles,
  children
}) => {
  const value = useMemo(() => ({
    open,
    changeOpen,
    role,
    placement,
    context,
    contentRef,
    contentProps,
    triggerProps,
    triggerRef,
    contentStyles
  }), [open, changeOpen, placement, context, contentRef, contentProps, triggerProps, triggerRef, role, contentStyles])

  return (
    <PopoverContext.Provider value={value}>
      {children}
    </PopoverContext.Provider>
  )
}