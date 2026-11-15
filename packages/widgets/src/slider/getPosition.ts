import { clamp } from '@vega-ui/utils';

/**
 * Position of `value` on the track from `0` (at `min`) to `1` (at `max`).
 */
export const getPosition = (value: number, min: number, max: number) => {
  if (max <= min) return 0

  return clamp(0, (value - min) / (max - min), 1)
}
