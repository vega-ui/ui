export const getDateByIndex = (index: number, anchor: Date, monthsInYear = 12) => {
  const total = anchor.getFullYear() * monthsInYear + anchor.getMonth() + index
  const year = Math.floor(total / monthsInYear)
  const month = (total % monthsInYear + monthsInYear) % monthsInYear
  
  return { year, month }
}