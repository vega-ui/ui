'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { collapsibleShape, collapsibleWidget } from '@vega-ui/widgets/collapsible';

export interface CollapsibleContextState {
  handle: WidgetHandle<typeof collapsibleShape>
}

export const [CollapsibleProvider, useCollapsibleContext] = createContext<CollapsibleContextState>('CollapsibleContext', {
  handle: createHandle(collapsibleWidget, { contentId: undefined, onChangeHidden: undefined }, { id: 'collapsible' }),
})
