export const getYearsBetween = (start: number, end: number): number[] => {
  const from = Math.min(start, end)
  const to = Math.max(start, end)
  const years: number[] = []
  
  for (let y = from; y <= to; y++) {
    years.push(y)
  }
  
  return years
}
