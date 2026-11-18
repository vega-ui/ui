'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { Placement } from '../../../internals/anchor';
import { MenuItemData, menuShape, menuWidget } from '@vega-ui/widgets/menu';
import { MenuSize } from '../../types';

export type MenuHandle = WidgetHandle<typeof menuShape, MenuItemData>

export interface MenuContextState {
  handle: MenuHandle
  size?: MenuSize
  placement?: Placement
  anchorName?: string
}

export const [MenuProvider, useMenuContext] = createContext<MenuContextState>('MenuContext', {
  handle: createHandle(menuWidget, { items: [] }, { id: 'menu' }),
  size: 'md',
  placement: 'bottom-start',
})
