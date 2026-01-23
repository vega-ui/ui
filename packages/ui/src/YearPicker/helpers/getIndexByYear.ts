export const getIndexByYear = (year: number, anchor: number, period = 12) => {
  const yearOffset = year - anchor
  return Math.floor(yearOffset / period)
}