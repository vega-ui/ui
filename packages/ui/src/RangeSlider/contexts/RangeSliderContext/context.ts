'use client';

import { createContext } from '@vega-ui/react-context';
import { RangeSliderSize } from '../../types.ts';

export interface RangeSliderContextState {
  min: number
  max: number
  value: readonly [number, number]
  step: number | 'any'
  orientation?: 'horizontal' | 'vertical'
  size?: RangeSliderSize
  minRange?: number
  disabled?: boolean
}

export const [RangeSliderProvider, useRangeSliderContext] = createContext<RangeSliderContextState>('RangeSliderContext', {
  min: 0,
  max: 100,
  value: [0, 100],
  step: 1,
  orientation: 'horizontal',
  disabled: false,
})