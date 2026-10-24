import { countDecimals } from './countDecimals'

/**
 * Adds `delta` to `value` and rounds the sum to the larger number of decimals
 * of the two, so stepping by `0.1` gives `0.8` after `0.7`, not
 * `0.7999999999999999`.
 */
export const addWithPrecision = (value: number, delta: number) => {
  const decimals = Math.max(countDecimals(value), countDecimals(delta))

  return Number((value + delta).toFixed(decimals))
}
