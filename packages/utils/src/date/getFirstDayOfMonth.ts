export const getFirstDayOfMonth = (year: number, month: number): Date => {
  return new Date(year, month, 1, 0, 0, 0, 0);
}