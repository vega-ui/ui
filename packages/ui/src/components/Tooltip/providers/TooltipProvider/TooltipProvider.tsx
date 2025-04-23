'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { TooltipContext, TooltipContextState } from './context.ts';

export type TooltipProvider = TooltipContextState

export const TooltipProvider: FC<PropsWithChildren<TooltipProvider>> = ({
  open,
  changeOpen,
  contentProps,
  triggerProps,
  context,
  contentRef,
  triggerRef,
  contentStyle,
  arrowRef,
  children
}) => {
  const value = useMemo(() => ({
    open,
    changeOpen,
    contentProps,
    triggerProps,
    context,
    contentRef,
    triggerRef,
    contentStyle,
    arrowRef,
  }), [
    open,
    changeOpen,
    contentProps,
    triggerProps,
    context,
    contentRef,
    triggerRef,
    contentStyle,
    arrowRef,
  ])

  return (
    <TooltipContext.Provider value={value}>
      {children}
    </TooltipContext.Provider>
  )
}