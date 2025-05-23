'use client';

import { Context, createContext } from 'react';

export interface RangeSliderContextState {
  min: number
  max: number
  value: readonly [number, number]
  step: number | 'any'
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  minRange?: number
}

export const defaultRangeSliderContext: RangeSliderContextState = {
  min: 0,
  max: 100,
  value: [0, 100],
  step: 1,
  orientation: 'horizontal',
}

export const RangeSliderContext: Context<RangeSliderContextState> = createContext(defaultRangeSliderContext)