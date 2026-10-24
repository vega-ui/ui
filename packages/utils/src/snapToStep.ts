import { clamp } from './clamp'
import { countDecimals } from './countDecimals'

export interface SnapToStepOptions {
  min: number
  max: number
  step: number | 'any'
}

/**
 * Snaps `value` to the step grid of `<input type="range">`: steps count from
 * `min`, the result stays within `min` and the last step that fits in `max`,
 * and it is rounded to the decimals of `min` and `step`, so `0.1 + 0.2` gives
 * `0.3`. With `step: 'any'` the value is only clamped.
 */
export const snapToStep = (value: number, { min, max, step }: SnapToStepOptions) => {
  if (step === 'any' || step <= 0) return clamp(min, value, max)

  const steps = Math.round((clamp(min, value, max) - min) / step)
  const lastStep = Math.floor(Number(((max - min) / step).toPrecision(12)))

  return Number((min + Math.min(steps, lastStep) * step).toFixed(Math.max(countDecimals(min), countDecimals(step))))
}
