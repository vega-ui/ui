export const getAllDaysOfMonth = (year: number, month: number): Date[] => {
  const days: Date[] = []
  
  const totalDays = new Date(year, month, 0).getDate()
  
  for (let day = 1; day <= totalDays; day++) {
    days.push(new Date(year, month - 1, day))
  }
  
  return days
}