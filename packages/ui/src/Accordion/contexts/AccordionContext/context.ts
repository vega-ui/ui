'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { accordionShape, accordionWidget } from '@vega-ui/widgets/accordion';
import { AccordionSize } from '../../types';

export interface AccordionContextState {
  handle: WidgetHandle<typeof accordionShape>
  size?: AccordionSize
}

export const [AccordionProvider, useAccordionContext] = createContext<AccordionContextState>('AccordionContext', {
  handle: createHandle(accordionWidget, { multiple: false }, { id: 'accordion' }),
  size: 'md',
})
