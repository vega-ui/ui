'use client';

import { ChangeEvent, Context, createContext } from 'react';
import { SegmentedControlSize } from '../../types.ts';

export interface SegmentedControlContextState {
  value: string | number | undefined
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  size?: SegmentedControlSize
  disabled?: boolean
  name?: string
  variant?: 'primary' | 'secondary' | string
}

export const defaultSegmentedControlContext: SegmentedControlContextState = {
  value: undefined,
  onChange: () => undefined,
  size: undefined,
  disabled: undefined,
  name: undefined
}

export const SegmentedControlContext: Context<SegmentedControlContextState> = createContext(defaultSegmentedControlContext)