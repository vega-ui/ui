import { describe, it, expect } from 'vitest'
import { getMonthWeeks } from '../../date'

const mapDays = (week: (Date | null)[]) => week.map(d => (d ? d.getDate() : null))
const mapMonths = (week: (Date | null)[]) => week.map(d => (d ? d.getMonth() : null))

describe('getMonthWeeks', () => {
  it('returns 5 weeks for October 2025 by default (Monday first, adjacent edge days included)', () => {
    const weeks = getMonthWeeks(2025, 9)
    expect(weeks).toHaveLength(5)
    weeks.forEach(w => expect(w).toHaveLength(7))
    expect(mapDays(weeks[0])).toEqual([29, 30, 1, 2, 3, 4, 5])
    expect(mapMonths(weeks[0])).toEqual([8, 8, 9, 9, 9, 9, 9])
    expect(mapDays(weeks[4])).toEqual([27, 28, 29, 30, 31, 1, 2])
    expect(mapMonths(weeks[4])).toEqual([9, 9, 9, 9, 9, 10, 10])
  })
  
  it('nulls only non-month cells on first and last week when includeAdjacentEdgeDays=false (Monday first)', () => {
    const weeks = getMonthWeeks(2025, 9, { includeAdjacentEdgeDays: false })
    expect(weeks).toHaveLength(5)
    expect(mapDays(weeks[0])).toEqual([null, null, 1, 2, 3, 4, 5])
    expect(mapMonths(weeks[0])).toEqual([null, null, 9, 9, 9, 9, 9])
    expect(mapDays(weeks[4])).toEqual([27, 28, 29, 30, 31, null, null])
    expect(mapMonths(weeks[4])).toEqual([9, 9, 9, 9, 9, null, null])
  })
  
  it('supports Sunday as first day of week and keeps a 5×7 grid for October 2025', () => {
    const weeks = getMonthWeeks(2025, 9, { firstDayOfWeek: 0 })
    expect(weeks).toHaveLength(5)
    expect(mapDays(weeks[0])).toEqual([28, 29, 30, 1, 2, 3, 4])
    expect(mapMonths(weeks[0])).toEqual([8, 8, 8, 9, 9, 9, 9])
    expect(mapDays(weeks[4])).toEqual([26, 27, 28, 29, 30, 31, 1])
    expect(mapMonths(weeks[4])).toEqual([9, 9, 9, 9, 9, 9, 10])
  })
  
  it('with Sunday first and includeAdjacentEdgeDays=false nulls only edge foreign cells', () => {
    const weeks = getMonthWeeks(2025, 9, { firstDayOfWeek: 0, includeAdjacentEdgeDays: false })
    expect(mapDays(weeks[0])).toEqual([null, null, null, 1, 2, 3, 4])
    expect(mapDays(weeks[4])).toEqual([26, 27, 28, 29, 30, 31, null])
  })
  
  it('handles February 2024 (leap year) with Monday first', () => {
    const weeks = getMonthWeeks(2024, 1, { firstDayOfWeek: 1 })
    expect(weeks).toHaveLength(5)
    expect(mapDays(weeks[0])).toEqual([29, 30, 31, 1, 2, 3, 4])
    expect(mapMonths(weeks[0])).toEqual([0, 0, 0, 1, 1, 1, 1])
    expect(mapDays(weeks[4])).toEqual([26, 27, 28, 29, 1, 2, 3])
    expect(mapMonths(weeks[4])).toEqual([1, 1, 1, 1, 2, 2, 2])
  })
  
  it('is deterministic for identical inputs', () => {
    const a = getMonthWeeks(2026, 1, { firstDayOfWeek: 1, includeAdjacentEdgeDays: false })
    const b = getMonthWeeks(2026, 1, { firstDayOfWeek: 1, includeAdjacentEdgeDays: false })
    expect(a.length).toBe(b.length)
    for (let i = 0; i < a.length; i++) {
      expect(mapDays(a[i])).toEqual(mapDays(b[i]))
      expect(mapMonths(a[i])).toEqual(mapMonths(b[i]))
    }
  })
})
