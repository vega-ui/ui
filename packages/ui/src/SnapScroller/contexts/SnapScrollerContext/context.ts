'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { snapScrollerShape, snapScrollerWidget } from '@vega-ui/widgets/snap-scroller';

export interface SnapScrollerContextState {
  handle: WidgetHandle<typeof snapScrollerShape>
}

export const [SnapScrollerProvider, useSnapScrollerContext] = createContext<SnapScrollerContextState>('SnapScrollerContext', {
  handle: createHandle(snapScrollerWidget, { items: [], defaultIndex: undefined, pages: undefined, index: undefined, preserveScroll: true, onSnapChanging: undefined, onSnapChange: undefined, onOffset: undefined }, { id: 'snap-scroller' }),
})
