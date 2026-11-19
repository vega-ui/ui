'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { ToolbarItemData, toolbarShape, toolbarWidget } from '@vega-ui/widgets/toolbar';

export type ToolbarHandle = WidgetHandle<typeof toolbarShape, ToolbarItemData>

export interface ToolbarContextState {
  handle: ToolbarHandle
  inside: boolean
}

export const [ToolbarProvider, useToolbarContext] = createContext<ToolbarContextState>('ToolbarContext', {
  handle: createHandle(toolbarWidget, { items: [], orientation: 'horizontal' }, { id: 'toolbar' }),
  inside: false,
})
