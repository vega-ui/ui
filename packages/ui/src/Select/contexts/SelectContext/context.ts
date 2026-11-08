'use client';

import { CSSProperties } from 'react';
import { createContext } from '@vega-ui/react-kit/context';
import { SelectSize, SelectVariant } from '../../types';

type Value = string | number | null | undefined

export interface SelectContextState {
  size?: SelectSize
  variant?: SelectVariant
  selected: Value
  open?: boolean
  changeOpen?(open: boolean): void
  disabled?: boolean
  readOnly?: boolean
  comboboxProps: Record<string, unknown>
  listboxStyles: CSSProperties
  valueElement?: HTMLSpanElement | null
  setValueElement?(element: HTMLSpanElement | null): void
  setReference?(element: HTMLElement | null): void
  focusCombobox?(): void
  setFloating?(element: HTMLElement | null): void
}

export const [SelectProvider, useSelectContext] = createContext<SelectContextState>('SelectContext', {
  selected: undefined,
  comboboxProps: {},
  listboxStyles: {},
  size: 'md',
})
