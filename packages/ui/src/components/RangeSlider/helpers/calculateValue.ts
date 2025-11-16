import { MouseEvent, PointerEvent } from 'react';
import { clamp } from '@vega-ui/utils';
import { RangeSliderOrientation, RangeSliderStep } from '../types';

export interface CalculateValueOptions {
  min: number
  max: number
  step: RangeSliderStep
  orientation: RangeSliderOrientation
}

export const calculateValue = (track: HTMLElement | null, event: PointerEvent | MouseEvent, options: CalculateValueOptions) => {
  const { min, max, step, orientation } = options;
  
  if (!track) return min
  
  const rect = track.getBoundingClientRect()
  
  const percent = orientation === 'horizontal'
    ? (event.clientX - rect.left) / rect.width
    : 1 - (event.clientY - rect.top) / rect.height
  
  const raw = min + (max - min) * percent
  
  if (step === 'any') return clamp(min, raw, max)
  
  const snapped = Math.round(raw / step) * step
  return clamp(min, snapped, max)
}