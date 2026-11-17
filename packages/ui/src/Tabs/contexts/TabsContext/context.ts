'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { TabsSize } from '../../types';
import { TabsItemData, tabsShape, tabsWidget } from '@vega-ui/widgets/tabs';

export type TabsHandle = WidgetHandle<typeof tabsShape, TabsItemData>

export interface TabsContextState {
  handle: TabsHandle
  size?: TabsSize
}

export const [TabsProvider, useTabsContext] = createContext<TabsContextState>('TabsContext', {
  handle: createHandle(tabsWidget, { items: [], activation: 'automatic', orientation: 'horizontal' }, { id: 'tabs' }),
  size: 'md',
})
