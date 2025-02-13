'use client';

import { Context, createContext, HTMLProps } from 'react';

type Value = string | number | undefined

export interface SelectContextState {
  value: Value
  activeIndex: number | undefined | null
  onSelect: (value: Value) => void
  getItemProps?: (props?: (Omit<HTMLProps<HTMLElement>, 'selected' | 'active'>)) => Record<string, unknown>
  size?: 'small' | 'medium' | 'large'
}

export const defaultSelectContext: SelectContextState = {
  value: undefined,
  activeIndex: undefined,
  onSelect: () => undefined,
  getItemProps: () => ({}),
  size: 'medium'
}

export const SelectContext: Context<SelectContextState> = createContext(defaultSelectContext)