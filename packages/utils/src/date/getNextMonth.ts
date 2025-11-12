export const getNextMonth = (year: number, month: number): { year: number; month: number } => {
  if (month === 11) {
    return { year: year + 1, month: 0 }
  }
  
  return { year, month: month + 1 }
}
