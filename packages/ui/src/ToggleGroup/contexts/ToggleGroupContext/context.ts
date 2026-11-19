'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { ToggleGroupItemData, toggleGroupShape, toggleGroupWidget } from '@vega-ui/widgets/toggle-group';
import { ButtonSize } from '../../../Button';

export type ToggleGroupHandle = WidgetHandle<typeof toggleGroupShape, ToggleGroupItemData>

export interface ToggleGroupContextState {
  handle: ToggleGroupHandle
  size?: ButtonSize
  disabled?: boolean
}

export const [ToggleGroupProvider, useToggleGroupContext] = createContext<ToggleGroupContextState>('ToggleGroupContext', {
  handle: createHandle(toggleGroupWidget, { items: [], multiple: false, rovingFocus: true }, { id: 'toggle-group' }),
})
