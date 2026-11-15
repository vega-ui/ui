import { addWithPrecision } from '@vega-ui/utils';

interface GetThumbBoundsOptions {
  min: number
  max: number
  gap: number
}

/**
 * Lowest and highest values the thumb at `index` may take: `gap` away from
 * its neighbours, or `min` and `max` at the ends.
 */
export const getThumbBounds = (values: number[], index: number, { min, max, gap }: GetThumbBoundsOptions) => {
  const previous = values[index - 1]
  const next = values[index + 1]

  const low = previous === undefined ? min : addWithPrecision(previous, gap)
  const high = next === undefined ? max : addWithPrecision(next, -gap)

  return [low, high] as const
}
