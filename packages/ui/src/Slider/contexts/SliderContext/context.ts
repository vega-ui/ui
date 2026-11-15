'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { SliderOrientation } from '../../types';
import { sliderShape, sliderWidget } from '@vega-ui/widgets/slider';

export interface SliderContextState {
  min: number
  max: number
  step: number | 'any'
  gap: number
  orientation: SliderOrientation
  disabled?: boolean
  name?: string
  values: number[]
  handle: WidgetHandle<typeof sliderShape>
}

export const [SliderProvider, useSliderContext] = createContext<SliderContextState>('SliderContext', {
  min: 0,
  max: 100,
  step: 1,
  gap: 0,
  orientation: 'horizontal',
  values: [],
  handle: createHandle(sliderWidget, { min: 0, max: 100, step: 1, gap: 0, orientation: 'horizontal' }, { id: 'slider' }),
})
