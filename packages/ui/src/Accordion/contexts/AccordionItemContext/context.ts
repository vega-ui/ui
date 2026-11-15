'use client';

import { createContext } from '../../../internals/context';
import { AccordionSize } from '../../types';

export interface AccordionItemContextState {
  size: AccordionSize
}

export const [AccordionItemProvider, useAccordionItemContext] = createContext<AccordionItemContextState>('AccordionItemContext', {
  size: 'md'
})