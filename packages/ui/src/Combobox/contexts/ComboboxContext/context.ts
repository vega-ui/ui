'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { ListboxItemData } from '@vega-ui/widgets/listbox';
import { comboboxShape, comboboxWidget } from '@vega-ui/widgets/combobox';

export type ComboboxHandle = WidgetHandle<typeof comboboxShape, ListboxItemData>

export interface ComboboxContextState {
  handle: ComboboxHandle
  anchorName?: string
}

export const [ComboboxProvider, useComboboxContext] = createContext<ComboboxContextState>('ComboboxContext', {
  handle: createHandle(comboboxWidget, { items: [], disabled: false, readOnly: false, autocomplete: 'list' }, { id: 'combobox' }),
})
