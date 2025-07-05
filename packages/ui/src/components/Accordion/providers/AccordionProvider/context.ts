'use client';

import { createContext } from 'react';
import { AccordionSize } from '../../types.ts';

export interface AccordionContextState {
  opened: string[],
  onChangeOpened: (value: string, state: boolean) => void
  size?: AccordionSize
  separated?: boolean
}

export const defaultAccordionContext: AccordionContextState = {
  opened: [],
  onChangeOpened: () => undefined,
  size: 'medium',
  separated: false,
}

export const AccordionContext = createContext<AccordionContextState>(defaultAccordionContext)