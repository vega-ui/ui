'use client';

import { Context, createContext } from 'react';

export interface DrawerContextState {
  open: boolean
  onChangeOpen: (value: boolean) => void
}

export const defaultDrawerContext: DrawerContextState = {
  open: false,
  onChangeOpen: () => undefined,
}

export const DrawerContext: Context<DrawerContextState> = createContext(defaultDrawerContext)