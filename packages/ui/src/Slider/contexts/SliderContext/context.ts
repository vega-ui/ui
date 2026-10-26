'use client';

import { createContext } from '@vega-ui/react-context';
import { SliderOrientation } from '../../types';

export interface SliderContextState {
  min: number
  max: number
  step: number | 'any'
  gap: number
  orientation: SliderOrientation
  disabled?: boolean
  name?: string
  values: number[]
  /**
   * Sets the value of the thumb at `index`, kept between its neighbours.
   */
  changeThumb(index: number, value: number): void
}

export const [SliderProvider, useSliderContext] = createContext<SliderContextState>('SliderContext', {
  min: 0,
  max: 100,
  step: 1,
  gap: 0,
  orientation: 'horizontal',
  values: [],
  changeThumb() {},
})
