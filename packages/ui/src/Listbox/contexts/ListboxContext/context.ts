'use client';

import { createContext } from '@vega-ui/react-context';
import { OptionSize } from '../../../Option';

type Value = string | number

export interface ListboxContextState {
  id?: string
  size?: OptionSize
  disabled?: boolean
  activeId?: string
  getOptionId(value: Value): string
  isSelected(value: Value): boolean
  onSelect(value: Value): void
  setActiveId(id: string | undefined): void
  clearActive(id: string): void
}

export const [ListboxProvider, useListboxContext] = createContext<ListboxContextState>('ListboxContext', {
  getOptionId() {
    return ''
  },
  isSelected() {
    return false
  },
  onSelect() {},
  setActiveId() {},
  clearActive() {},
})
