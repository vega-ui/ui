'use client';

import { createContext } from 'react';
import { AccordionSize } from '../../types.ts';

export interface AccordionItemContextState {
  size: AccordionSize
}

export const defaultAccordionItemContext: AccordionItemContextState = {
  size: 'medium'
}

export const AccordionItemContext = createContext<AccordionItemContextState>(defaultAccordionItemContext)