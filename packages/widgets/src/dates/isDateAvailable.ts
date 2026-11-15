export interface DateAvailability {
  from?: string
  to?: string
  isDisabled(date: string): boolean
}

export const isDateAvailable = (date: string, { from, to, isDisabled }: DateAvailability) => {
  if (from && date < from) return false
  if (to && date > to) return false

  return !isDisabled(date)
}
