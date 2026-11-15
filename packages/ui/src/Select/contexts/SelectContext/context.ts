'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { ListboxItemData, ListboxValue } from '@vega-ui/widgets/listbox';
import { selectShape, selectWidget } from '@vega-ui/widgets/select';
import { SelectSize, SelectVariant } from '../../types';

export type SelectHandle = WidgetHandle<typeof selectShape, ListboxItemData>

export interface SelectContextState {
  handle: SelectHandle
  size?: SelectSize
  variant?: SelectVariant
  selected: ListboxValue | null
  open: boolean
  disabled?: boolean
  readOnly?: boolean
  valueElement?: HTMLSpanElement | null
  setValueElement?(element: HTMLSpanElement | null): void
  anchorName?: string
  focusCombobox?(): void
}

export const [SelectProvider, useSelectContext] = createContext<SelectContextState>('SelectContext', {
  handle: createHandle(selectWidget, { items: [], disabled: false, readOnly: false, typeahead: true }, { id: 'select' }),
  selected: null,
  open: false,
  size: 'md',
})
