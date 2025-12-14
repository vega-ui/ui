'use client';

import { createContext } from '@vega-ui/react-context';

export interface SliderContextState {
  min: number
  max: number
  value: number
  step: number | 'any'
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
}

export const [SliderProvider, useSliderContext] = createContext<SliderContextState>('SliderContext', {
  min: 0,
  max: 100,
  value: 0,
  step: 1,
  orientation: 'horizontal'
})