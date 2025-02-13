'use client';

import { Context, createContext } from 'react';

type Value = string | number | undefined

export interface SheetSelectContextState {
  value: Value
  onSelect: (value: Value) => void
  size?: 'small' | 'medium' | 'large'
}

export const defaultSheetSelectContext: SheetSelectContextState = {
  value: undefined,
  onSelect: () => undefined,
  size: 'medium'
}

export const SheetSelectContext: Context<SheetSelectContextState> = createContext(defaultSheetSelectContext)