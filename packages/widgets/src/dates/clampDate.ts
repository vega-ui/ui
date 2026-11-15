export const clampDate = (date: string, from?: string, to?: string) => {
  if (from && date < from) return from
  if (to && date > to) return to

  return date
}
