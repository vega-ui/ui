export const getClosestIndex = (value: number, range: [number, number]) => {
  const lengths = [Math.abs(range[0] - value), Math.abs(range[1] - value)]
  
  if (lengths[0] < lengths[1]) return 0
  if (lengths[1] < lengths[0]) return 1
  if (lengths[0] === lengths[1]) {
    if (value < range[0]) return 0
    if (value > range[1]) return 1
  }
  
  return null
}