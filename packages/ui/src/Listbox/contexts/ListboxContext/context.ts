'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { OptionSize } from '../../../Option';
import { Part } from '@vega-ui/core';
import { ListboxItemData, ListboxShape, ListboxState } from '@vega-ui/widgets/listbox';
import { listboxWidget } from '@vega-ui/widgets/listbox';

export type ListboxHandle = WidgetHandle<ListboxShape, ListboxItemData>

export interface ListboxContextState {
  handle: ListboxHandle
  size?: OptionSize
  disabled?: boolean
  option?: Part<ListboxState, string>
}

export const [ListboxProvider, useListboxContext] = createContext<ListboxContextState>('ListboxContext', {
  handle: createHandle(listboxWidget, { items: [], mode: 'single', disabled: false, typeahead: true }, { id: 'listbox' }),
})
