'use client';

import { HTMLProps, MouseEvent, KeyboardEvent } from 'react';
import { createContext } from '@vega-ui/react-context';
import { SelectSize } from '../../types.ts';

type Value = string | number | undefined

export interface SelectContextState {
  value: Value
  activeIndex: number | undefined | null
  onSelect: (e: MouseEvent | KeyboardEvent, value: Value) => void
  getItemProps?: (props?: (Omit<HTMLProps<HTMLElement>, 'selected' | 'active'>)) => Record<string, unknown>
  size?: SelectSize
}

export const [SelectProvider, useSelectContext] = createContext<SelectContextState>('SelectContext', {
  value: undefined,
  activeIndex: undefined,
  onSelect: () => undefined,
  getItemProps: () => ({}),
  size: 'medium'
})