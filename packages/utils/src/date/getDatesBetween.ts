export const getDatesBetween = (start: Date, end: Date): Date[] => {
  const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate())
  
  if (startDate > endDate) {
    return getDatesBetween(endDate, startDate)
  }
  
  const dates: Date[] = []
  const current = new Date(startDate)
  
  while (current <= endDate) {
    dates.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  
  return dates
}