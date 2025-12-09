'use client';

import { createContext } from 'react';
import { BaseCalendarSize, BaseCalendarVariant } from '../../types.ts';

export interface BaseCalendarContextState {
  size: BaseCalendarSize
  variant: BaseCalendarVariant
}

export const defaultBaseCalendarContext: BaseCalendarContextState = {
  variant: 'secondary',
  size: 'xs',
}

export const BaseCalendarContext = createContext<BaseCalendarContextState>(defaultBaseCalendarContext)