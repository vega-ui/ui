export const getIndexByDate = (anchor: Date, year: number, month: number) => {
  const anchorYear = anchor.getFullYear()
  const anchorMonth = anchor.getMonth()
  
  return (year - anchorYear) * 12 + (month - anchorMonth)
}