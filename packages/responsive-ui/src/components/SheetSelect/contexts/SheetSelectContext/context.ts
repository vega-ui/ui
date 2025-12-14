'use client';

import { SelectEvent } from '@vega-ui/react';
import { createContext } from '@vega-ui/react-context';

type Value = string | number | undefined

export interface SheetSelectContextState {
  value: Value
  onSelect: (e: SelectEvent, value: Value) => void
  size?: 'small' | 'medium' | 'large' | string
}

export const [SheetSelectProvider, useSheetSelectContext] = createContext<SheetSelectContextState>('SheetSelectContext', {
  value: undefined,
  onSelect: () => undefined,
  size: 'medium'
})