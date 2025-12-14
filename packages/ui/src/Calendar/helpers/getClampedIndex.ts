import { getMonthIndex } from './getMonthIndex.ts'

export interface GetClampedIndexOptions {
  year: number
  baseYear: number
  month: number
  baseMonth: number
  from?: Date,
  to?: Date
}

export const getClampedIndex = (index: number, options: GetClampedIndexOptions): number => {
  const { from, to, year, month, baseYear, baseMonth } = options ?? {}
  
  if (to && new Date(year, month) > to) return getMonthIndex(baseYear, baseMonth, to.getFullYear(), to.getMonth())
  if (from && new Date(year, month) < from) return getMonthIndex(baseYear, baseMonth, from.getFullYear(), from.getMonth())
  
  return index
}