'use client';

import { createContext } from '@vega-ui/react-context';
import { AccordionSize } from '../../types.ts';

export interface AccordionContextState {
  opened: string[],
  onChangeOpened: (value: string, state: boolean) => void
  size?: AccordionSize
  separated?: boolean
}

export const [AccordionProvider, useAccordionContext] = createContext<AccordionContextState>('AlertContext', {
  opened: [],
  onChangeOpened: () => undefined,
  size: 'md',
  separated: false,
})