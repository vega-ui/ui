import { normalizeDate } from './normalizaDate';

export const shiftDays = (d: Date, daysShift: number = 0): Date => {
  const n = normalizeDate(d)
  const delta = Number.isFinite(daysShift) ? Math.trunc(daysShift) : 0
  return new Date(n.getFullYear(), n.getMonth(), n.getDate() + delta, 0, 0, 0, 0)
}