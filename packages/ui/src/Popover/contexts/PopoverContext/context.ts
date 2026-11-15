'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { Placement } from '../../../internals/anchor';
import { popoverShape, popoverWidget } from '@vega-ui/widgets/popover';

export interface PopoverContextState {
  handle: WidgetHandle<typeof popoverShape>
  close: () => void
  contentId?: string
  placement?: Placement
  role?: 'listbox' | 'dialog'
  anchorName?: string
  anchored?: boolean
  setAnchor?: (element: Element | null) => void
  setContent?: (element: HTMLElement | null) => void
}

export const [PopoverProvider, usePopoverContext] = createContext<PopoverContextState>('PopoverContext', {
  handle: createHandle(popoverWidget, { role: undefined }, { id: 'popover' }),
  close: () => undefined,
  placement: 'bottom',
})
