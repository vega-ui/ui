'use client';

import { CSSProperties, HTMLProps, RefObject } from 'react';
import { createContext } from '@vega-ui/react-context';
import { SelectSize, SelectVariant } from '../../types.ts';
import { FloatingContext } from '@floating-ui/react';

type Value = string | number | undefined

export interface SelectContextState {
  size?: SelectSize
  variant?: SelectVariant
  selected: Value
  open?: boolean
  disabled?: boolean
  readOnly?: boolean
  status?: 'unmounted' | 'initial' | 'open' | 'close'
  activeIndex: number | undefined | null
  selectedIndex: number | undefined | null
  onSelect(index: number, value: number | string): void
  elementsRef: RefObject<(HTMLElement | null)[]>
  labelsRef: RefObject<(string | null)[]>
  itemProps(props: Omit<HTMLProps<HTMLElement>, 'selected' | 'active' | 'size'>): Record<string, unknown>
  listboxProps: Record<string, unknown>
  comboboxProps: Record<string, unknown>
  listboxStyles: CSSProperties
  valueRef?: RefObject<HTMLSpanElement | null>
  selectRef?: RefObject<HTMLDivElement | null>
  context: FloatingContext
  hasValueChildren: boolean
  onHasValueChildrenChange(value: boolean): void
  isSelected(v: Value): boolean
}

export const [SelectProvider, useSelectContext] = createContext<SelectContextState>('SelectContext', {
  selected: undefined,
  isSelected() {
    return false
  },
  activeIndex: undefined,
  selectedIndex: undefined,
  hasValueChildren: false,
  onSelect() {},
  itemProps() {
    return {}
  },
  elementsRef: {} as RefObject<HTMLElement[]>,
  labelsRef: {} as RefObject<string[]>,
  onHasValueChildrenChange() {},
  listboxProps: {},
  comboboxProps: {},
  listboxStyles: {},
  size: 'md',
  context: {} as FloatingContext,
})