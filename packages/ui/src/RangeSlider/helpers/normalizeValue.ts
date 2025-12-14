export const normalizeValue = (
  index: number,
  val: number,
  [low, high]: [number, number]
): [number, number] => {
  const isLower = index === 0
  
  if (isLower) {
    return val > high
      ? [high, val]
      : [val, high]
  }
  
  return val < low
    ? [val, low]
    : [low, val]
}