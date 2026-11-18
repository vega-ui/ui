'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { MenuRadioData, menuRadioGroupShape, menuRadioGroupWidget } from '@vega-ui/widgets/menu';

export interface MenuRadioGroupContextState {
  handle: WidgetHandle<typeof menuRadioGroupShape, MenuRadioData>
}

export const [MenuRadioGroupProvider, useMenuRadioGroupContext] = createContext<MenuRadioGroupContextState>('MenuRadioGroupContext', {
  handle: createHandle(menuRadioGroupWidget, { items: [] }, { id: 'menu-radio-group' }),
})
