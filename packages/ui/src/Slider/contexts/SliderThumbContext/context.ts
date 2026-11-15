'use client';

import { createContext } from '../../../internals/context';

export interface SliderThumbContextState {
  index: number
  low: number
  high: number
}

export const [SliderThumbProvider, useSliderThumbContext] = createContext<SliderThumbContextState>('SliderThumbContext', {
  index: 0,
  low: 0,
  high: 100,
})
