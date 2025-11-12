import { describe, it, expect } from 'vitest'
import { getNextDate } from '../../date'

describe('getNextDate', () => {
  it('defaults to shifting forward by 1 day and normalizes to local midnight', () => {
    const base = new Date(2025, 0, 15, 13, 37, 59, 987)
    const res = getNextDate(base)
    expect(res.getFullYear()).toBe(2025)
    expect(res.getMonth()).toBe(0)
    expect(res.getDate()).toBe(16)
    expect(res.getHours()).toBe(0)
    expect(res.getMinutes()).toBe(0)
    expect(res.getSeconds()).toBe(0)
    expect(res.getMilliseconds()).toBe(0)
  })
  
  it('shifts forward by N whole days (positive integer)', () => {
    const base = new Date(2024, 9, 10, 22, 10, 5, 1) // Oct 10, 2024
    const res = getNextDate(base, 5)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(9)
    expect(res.getDate()).toBe(15)
  })
  
  it('supports negative shifts (moving backward)', () => {
    const base = new Date(2024, 9, 10, 22, 10, 5, 1) // Oct 10, 2024
    const res = getNextDate(base, -3)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(9)
    expect(res.getDate()).toBe(7)
  })
  
  it('truncates fractional positive shifts toward zero (2.9 -> 2)', () => {
    const base = new Date(2024, 6, 1, 8, 0, 0, 0) // Jul 1, 2024
    const res = getNextDate(base, 2.9)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(6)
    expect(res.getDate()).toBe(3)
  })
  
  it('truncates fractional negative shifts toward zero (-2.9 -> -2)', () => {
    const base = new Date(2024, 6, 10, 8, 0, 0, 0) // Jul 10, 2024
    const res = getNextDate(base, -2.9)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(6)
    expect(res.getDate()).toBe(8)
  })
  
  it('treats non-finite shifts (NaN, ±Infinity) as 0 via shiftDays safeguard', () => {
    const base = new Date(2025, 3, 20, 12, 0, 0, 0)
    const a = getNextDate(base, Number.NaN as unknown as number)
    const b = getNextDate(base, Number.POSITIVE_INFINITY as unknown as number)
    const c = getNextDate(base, Number.NEGATIVE_INFINITY as unknown as number)
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
  
  it('crosses month boundary correctly (end of month -> next month)', () => {
    const base = new Date(2024, 0, 31, 23, 59, 59, 999) // Jan 31, 2024
    const res = getNextDate(base, 1)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(1) // Feb
    expect(res.getDate()).toBe(1)
  })
  
  it('crosses year boundary correctly (Dec -> Jan)', () => {
    const base = new Date(2024, 11, 31, 15, 0, 0, 0) // Dec 31, 2024
    const res = getNextDate(base, 1)
    expect(res.getFullYear()).toBe(2025)
    expect(res.getMonth()).toBe(0) // Jan
    expect(res.getDate()).toBe(1)
  })
  
  it('handles leap year forward (Feb 28, 2024 + 1 -> Feb 29, 2024)', () => {
    const base = new Date(2024, 1, 28, 10, 0, 0, 0)
    const res = getNextDate(base, 1)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(1) // Feb
    expect(res.getDate()).toBe(29)
  })
  
  it('does not mutate the input date and returns a new instance', () => {
    const base = new Date(2025, 4, 10, 18, 30, 0, 123)
    const before = base.getTime()
    const res = getNextDate(base, 2)
    expect(base.getTime()).toBe(before)
    expect(res === base).toBe(false)
  })
})
