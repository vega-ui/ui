import { addWithPrecision, clamp } from '@vega-ui/utils';

interface OrderValuesOptions {
  min: number
  max: number
  gap: number
}

/**
 * Sorts the values and keeps them `gap` apart within `min` and `max`, so
 * every native input gets a value between its neighbours.
 */
export const orderValues = (values: number[], { min, max, gap }: OrderValuesOptions) => {
  const sorted = [...values].sort((a, b) => a - b)
  const result: number[] = []

  sorted.forEach((value, index) => {
    const previous = result[index - 1]
    const next = sorted[index + 1]

    const low = previous === undefined ? min : addWithPrecision(previous, gap)
    const high = next === undefined ? max : addWithPrecision(next, -gap)

    if (high < low) {
      result.push(low)
      return
    }

    result.push(clamp(low, value, high))
  })

  return result
}
