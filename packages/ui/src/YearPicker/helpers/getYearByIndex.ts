export const getYearByIndex = (year: number, referenceYear: number, period = 12) => {
  return Math.floor((year - referenceYear) / period)
}