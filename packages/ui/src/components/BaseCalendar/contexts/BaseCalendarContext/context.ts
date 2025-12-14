'use client';

import { BaseCalendarSize, BaseCalendarVariant } from '../../types.ts';
import { createContext } from '@vega-ui/react-context';

export interface BaseCalendarContextState {
  size: BaseCalendarSize
  variant: BaseCalendarVariant
}

export const [BaseCalendarProvider, useBaseCalendarContext] = createContext<BaseCalendarContextState>('BaseCalendarContext', {
  variant: 'secondary',
  size: 'xs',
})