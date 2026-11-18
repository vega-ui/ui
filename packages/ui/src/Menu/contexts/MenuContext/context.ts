'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { MenuItemData, menuShape, menuWidget } from '@vega-ui/widgets/menu';
import { MenuSize } from '../../types';

export type MenuHandle = WidgetHandle<typeof menuShape, MenuItemData>

export interface MenuContextState {
  handle: MenuHandle
  size?: MenuSize
  side?: string
  align?: string
  anchorName?: string
  parent?: MenuContextState
}

export const [MenuProvider, useMenuContext] = createContext<MenuContextState>('MenuContext', {
  handle: createHandle(menuWidget, { items: [] }, { id: 'menu' }),
  size: 'md',
  side: 'bottom',
  align: 'start',
})
