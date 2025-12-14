'use client';

import { ChangeEvent } from 'react';
import { createContext } from '@vega-ui/react-context';
import { SegmentedControlSize } from '../../types.ts';

export interface SegmentedControlContextState {
  value: string | number | undefined
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  size?: SegmentedControlSize
  disabled?: boolean
  name?: string
  variant?: 'primary' | 'secondary' | string
}

export const [SegmentedControlProvider, useSegmentedControlContext] = createContext<SegmentedControlContextState>('SegmentedControlContext', {
  value: undefined,
  onChange: () => undefined,
  size: undefined,
  disabled: undefined,
  name: undefined
})