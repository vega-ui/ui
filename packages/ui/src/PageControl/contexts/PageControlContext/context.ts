'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { PageControlSize } from '../../types';
import { PageControlItemData, pageControlShape, pageControlWidget } from '@vega-ui/widgets/page-control';

export type PageControlHandle = WidgetHandle<typeof pageControlShape, PageControlItemData>

export interface PageControlContextState {
  handle: PageControlHandle
  active?: number
  size?: PageControlSize
}

export const [PageControlProvider, usePageControlContext] = createContext<PageControlContextState>('PageControlContext', {
  handle: createHandle(pageControlWidget, { items: [] }, { id: 'pagecontrol' }),
  active: undefined,
  size: 'md',
})
