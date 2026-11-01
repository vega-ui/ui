'use client';

import { CSSProperties } from 'react';
import { createContext } from '@vega-ui/react-context';
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
  setFloating?(element: HTMLElement | null): void
  isSelected(v: Value): boolean
}

export const [SelectProvider, useSelectContext] = createContext<SelectContextState>('SelectContext', {
  selected: undefined,
  isSelected() {
    return false
  },
  comboboxProps: {},
  listboxStyles: {},
  size: 'md',
})
