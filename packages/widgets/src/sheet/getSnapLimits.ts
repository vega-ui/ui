/**
 * Returns the lowest and the highest position a drag from `current` moves
 * freely between: the outermost stops or, when `stepped`, the stops next to it.
 */
export const getSnapLimits = (stops: readonly number[], current: number, stepped = false): [number, number] => {
  const lowest = Math.min(...stops)
  const highest = Math.max(...stops)

  if (!stepped) return [lowest, highest]

  return [
    Math.max(lowest, ...stops.filter((stop) => stop < current)),
    Math.min(highest, ...stops.filter((stop) => stop > current)),
  ]
}
