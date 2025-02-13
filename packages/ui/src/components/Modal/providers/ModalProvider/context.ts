'use client';

import { Context, createContext } from 'react';

export interface ModalContextState {
  open: boolean
  changeOpen: (value: boolean) => void
}

export const defaultModalContext: ModalContextState = {
  open: false,
  changeOpen: () => undefined,
}

export const ModalContext: Context<ModalContextState> = createContext(defaultModalContext)