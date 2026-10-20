export const createValidDate = (year: number, month: number, day: number, hours = 0, minutes = 0, seconds = 0) => {
  const date = new Date(year, month - 1, day, hours, minutes, seconds)
  date.setFullYear(year)

  const valid = date.getFullYear() === year
    && date.getMonth() === month - 1
    && date.getDate() === day
    && date.getHours() === hours
    && date.getMinutes() === minutes
    && date.getSeconds() === seconds

  return valid ? date : undefined
}
