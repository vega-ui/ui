'use client';

import { createContext } from '../../../internals/context';
import { Part } from '@vega-ui/core';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { MenuItemData, menuShape, menuWidget } from '@vega-ui/widgets/menu';
import { MenuSize } from '../../types';

export type MenuHandle = WidgetHandle<typeof menuShape, MenuItemData>

export type MenuPart = Part<typeof menuShape.__snapshot, string>

export interface MenuContextState {
  handle: MenuHandle
  size?: MenuSize
  side?: string
  align?: string
  anchorName?: string
  parent?: MenuContextState
  content?: MenuPart
}

export const [MenuProvider, useMenuContext] = createContext<MenuContextState>('MenuContext', {
  handle: createHandle(menuWidget, { items: [] }, { id: 'menu' }),
  size: 'md',
  side: 'bottom',
  align: 'start',
})
