'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { ModalContext, ModalContextState } from './context.ts';

export type ModalProvider = ModalContextState

export const ModalProvider: FC<PropsWithChildren<ModalProvider>> = ({
  open,
  changeOpen,
  contentProps,
  triggerProps,
  context,
  contentRef,
  triggerRef,
  children
}) => {
  const value = useMemo(() => ({
    open,
    changeOpen,
    triggerProps,
    contentProps,
    contentRef,
    triggerRef,
    context,
  }), [open, changeOpen, triggerProps, contentProps, contentProps, triggerProps, context])

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}