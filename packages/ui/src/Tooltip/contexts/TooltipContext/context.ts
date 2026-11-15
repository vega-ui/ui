'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { Placement } from '../../../internals/anchor';
import { tooltipShape, tooltipWidget } from '@vega-ui/widgets/tooltip';

export interface TooltipContextState {
  handle: WidgetHandle<typeof tooltipShape>
  contentId?: string
  placement?: Placement
  anchorName?: string
  setContent?: (element: HTMLElement | null) => void
}

export const [TooltipProvider, useTooltipContext] = createContext<TooltipContextState>('TooltipContext', {
  handle: createHandle(tooltipWidget, { delayOpen: 500, delayClose: 250, group: undefined }, { id: 'tooltip' }),
})
