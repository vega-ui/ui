export const getDateByIndex = (index: number, baseYear: number, baseMonth: number) => {
  const total = baseYear * 12 + baseMonth + index
  const year = Math.floor(total / 12)
  const month = (total % 12 + 12) % 12
  
  return { year, month }
}