'use client';

import { createContext } from '@vega-ui/react-context';

export interface RangeSliderThumbContextState {
  value: number
  max: number
  min: number
  index: number
}

export const [RangeSliderThumbProvider, useRangeSliderThumbContext] = createContext<RangeSliderThumbContextState>('RangeSliderThumbContext', {
  value: 0,
  min: 0,
  max: 100,
  index: -1,
})