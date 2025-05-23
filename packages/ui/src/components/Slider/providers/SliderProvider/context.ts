'use client';

import { Context, createContext } from 'react';

export interface SliderContextState {
  min: number
  max: number
  value: number
  step: number | 'any'
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
}

export const defaultSliderContext: SliderContextState = {
  min: 0,
  max: 100,
  value: 0,
  step: 1,
  orientation: 'horizontal'
}

export const SliderContext: Context<SliderContextState> = createContext(defaultSliderContext)