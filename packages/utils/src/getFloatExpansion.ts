import { clamp } from './clamp'

/**
 * Returns how far a floating panel has expanded towards the top of its
 * viewport, from 0 at `lowestTop` to 1 at the top. A panel that cannot rest
 * below the top is always expanded.
 */
export const getFloatExpansion = (top: number, lowestTop: number) => {
  if (lowestTop <= 0) return 1

  return clamp(0, 1 - top / lowestTop, 1)
}
