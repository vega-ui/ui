/**
 * First of the given `YYYY-MM-DD` dates that lies within `start` and `end`
 * (inclusive). Empty values are skipped; returns `undefined` when none fits.
 */
export const findISODateInRange = (dates: (string | null | undefined)[], start: string, end: string) => {
  for (const date of dates) {
    if (!date) continue
    if (date >= start && date <= end) return date
  }

  return undefined
}
