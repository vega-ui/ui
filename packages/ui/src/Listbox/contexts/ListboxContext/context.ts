'use client';

import { createContext } from '@vega-ui/react-kit/context';
import { OptionSize } from '../../../Option';
import { createListboxStore, ListboxStore } from '../../../internals/listbox';

type Value = string | number

export interface ListboxContextState {
  id?: string
  size?: OptionSize
  disabled?: boolean
  store: ListboxStore
  isSelected(value: Value): boolean
  onSelect(value: Value): void
}

export const [ListboxProvider, useListboxContext] = createContext<ListboxContextState>('ListboxContext', {
  store: createListboxStore(),
  isSelected() {
    return false
  },
  onSelect() {},
})
