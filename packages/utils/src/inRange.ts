export const inRange = (value: number, range: readonly [number, number] | readonly []) => {
  if (range.length === 0) return false

  const [start, end] = range

  return value >= Math.min(start, end) && value <= Math.max(start, end)
}