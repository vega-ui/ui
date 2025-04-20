'use client';

import { ChangeEvent, Context, createContext } from 'react';

export interface SegmentedControlContextState {
  value: string | number | undefined
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  name?: string
  variant?: 'primary' | 'secondary'
}

export const defaultSegmentedControlContext: SegmentedControlContextState = {
  value: undefined,
  onChange: () => undefined,
  size: undefined,
  disabled: undefined,
  name: undefined
}

export const SegmentedControlContext: Context<SegmentedControlContextState> = createContext(defaultSegmentedControlContext)