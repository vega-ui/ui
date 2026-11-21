'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { toastRegionShape, toastRegionWidget } from '@vega-ui/widgets/toast';

export type ToastRegionHandle = WidgetHandle<typeof toastRegionShape>

export interface ToastRegionContextState {
  handle: ToastRegionHandle
}

export const [ToastRegionProvider, useToastRegionContext] = createContext<ToastRegionContextState>('ToastRegionContext', {
  handle: createHandle(toastRegionWidget, { toasts: [], limit: 3, placement: 'top-end', swipeDirections: undefined, onClose: undefined }, { id: 'toast-region' }),
})
