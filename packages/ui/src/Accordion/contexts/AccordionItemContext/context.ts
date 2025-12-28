'use client';

import { createContext } from '@vega-ui/react-context';
import { AccordionSize } from '../../types';

export interface AccordionItemContextState {
  size: AccordionSize
}

export const [AccordionItemProvider, useAccordionItemContext] = createContext<AccordionItemContextState>('AccordionItemContext', {
  size: 'md'
})