export const getMonthIndex = (
  baseYear: number,
  baseMonth: number,
  year: number,
  month: number
): number => {
  return (year * 12 + month) - (baseYear * 12 + baseMonth);
};