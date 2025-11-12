import { describe, it, expect } from 'vitest'
import { getPreviousDate } from '../../date'

describe('getPreviousDate', () => {
  it('defaults to shifting backward by 1 day and normalizes to local midnight', () => {
    const base = new Date(2025, 0, 15, 13, 37, 59, 987)
    const res = getPreviousDate(base)
    expect(res.getFullYear()).toBe(2025)
    expect(res.getMonth()).toBe(0)
    expect(res.getDate()).toBe(14)
    expect(res.getHours()).toBe(0)
    expect(res.getMinutes()).toBe(0)
    expect(res.getSeconds()).toBe(0)
    expect(res.getMilliseconds()).toBe(0)
  })
  
  it('shifts backward by N whole days (positive integer)', () => {
    const base = new Date(2024, 9, 10, 22, 10, 5, 1) // Oct 10, 2024
    const res = getPreviousDate(base, 5)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(9) // Oct
    expect(res.getDate()).toBe(5)
  })
  
  it('supports negative shifts (moving forward when daysShift < 0)', () => {
    const base = new Date(2024, 9, 10, 22, 10, 5, 1) // Oct 10, 2024
    const res = getPreviousDate(base, -3) // -(-3) => +3 forward
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(9)
    expect(res.getDate()).toBe(13)
  })
  
  it('truncates fractional positive shifts toward zero (2.9 -> 2) then applies minus', () => {
    const base = new Date(2024, 6, 10, 8, 0, 0, 0) // Jul 10, 2024
    const res = getPreviousDate(base, 2.9) // -> -2
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(6)
    expect(res.getDate()).toBe(8)
  })
  
  it('truncates fractional negative shifts toward zero (-2.9 -> -2) then applies minus (=> +2 forward)', () => {
    const base = new Date(2024, 6, 10, 8, 0, 0, 0) // Jul 10, 2024
    const res = getPreviousDate(base, -2.9) // -> +2
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(6)
    expect(res.getDate()).toBe(12)
  })
  
  it('treats non-finite shifts (NaN, ±Infinity) as 0 via shiftDays safeguard', () => {
    const base = new Date(2025, 3, 20, 12, 0, 0, 0)
    const a = getPreviousDate(base, Number.NaN as unknown as number)
    const b = getPreviousDate(base, Number.POSITIVE_INFINITY as unknown as number)
    const c = getPreviousDate(base, Number.NEGATIVE_INFINITY as unknown as number)
    for (const res of [a, b, c]) {
      expect(res.getFullYear()).toBe(2025)
      expect(res.getMonth()).toBe(3)
      expect(res.getDate()).toBe(20) // unchanged day; normalized to midnight
      expect(res.getHours()).toBe(0)
      expect(res.getMinutes()).toBe(0)
      expect(res.getSeconds()).toBe(0)
      expect(res.getMilliseconds()).toBe(0)
    }
  })
  
  it('crosses month boundary correctly (beginning -> previous month)', () => {
    const base = new Date(2024, 1, 1, 0, 0, 0, 0) // Feb 1, 2024
    const res = getPreviousDate(base, 1)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(0) // Jan
    expect(res.getDate()).toBe(31)
  })
  
  it('crosses year boundary correctly (Jan -> Dec of previous year)', () => {
    const base = new Date(2025, 0, 1, 15, 0, 0, 0) // Jan 1, 2025
    const res = getPreviousDate(base, 1)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(11) // Dec
    expect(res.getDate()).toBe(31)
  })
  
  it('handles leap year backward (Mar 1, 2024 - 1 -> Feb 29, 2024)', () => {
    const base = new Date(2024, 2, 1, 10, 0, 0, 0) // Mar 1, 2024
    const res = getPreviousDate(base, 1)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(1) // Feb
    expect(res.getDate()).toBe(29)
  })
  
  it('does not mutate the input date and returns a new instance', () => {
    const base = new Date(2025, 4, 10, 18, 30, 0, 123)
    const before = base.getTime()
    const res = getPreviousDate(base, 2)
    expect(base.getTime()).toBe(before)
    expect(res === base).toBe(false)
  })
})
