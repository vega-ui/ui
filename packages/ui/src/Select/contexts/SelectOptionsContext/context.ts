'use client';

import { createContext } from '@vega-ui/react-context';
import { SelectNativeOption } from '../../types';

export interface SelectOptionsContextState<V> {
  options: Array<SelectNativeOption<V>>
  addOption(option: SelectNativeOption<V>): void
  removeOption(option: SelectNativeOption<V>): void
}

export const [SelectOptionsProvider, useSelectOptionsContext] = createContext<SelectOptionsContextState<string | number>>('SelectContext', {
  options: [],
  addOption() {},
  removeOption() {},
})