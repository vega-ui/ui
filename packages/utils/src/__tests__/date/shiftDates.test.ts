import { describe, it, expect } from 'vitest'
import { shiftDays } from '../../date'

describe('shiftDays', () => {
  it('returns same civil day at local midnight when shift is 0 (and normalizes input time)', () => {
    const d = new Date(2025, 0, 15, 13, 37, 59, 987)
    const res = shiftDays(d, 0)
    expect(res.getFullYear()).toBe(2025)
    expect(res.getMonth()).toBe(0)
    expect(res.getDate()).toBe(15)
    expect(res.getHours()).toBe(0)
    expect(res.getMinutes()).toBe(0)
    expect(res.getSeconds()).toBe(0)
    expect(res.getMilliseconds()).toBe(0)
  })
  
  it('shifts forward by N whole days (positive integer)', () => {
    const d = new Date(2024, 9, 10, 22, 10, 5, 1) // Oct 10, 2024
    const res = shiftDays(d, 3)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(9)
    expect(res.getDate()).toBe(13)
    expect(res.getHours()).toBe(0)
  })
  
  it('shifts backward by N whole days (negative integer)', () => {
    const d = new Date(2024, 9, 10, 22, 10, 5, 1) // Oct 10, 2024
    const res = shiftDays(d, -5)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(9)
    expect(res.getDate()).toBe(5)
  })
  
  it('truncates fractional positive shifts toward zero', () => {
    const d = new Date(2024, 6, 1, 8, 0, 0, 0) // Jul 1, 2024
    const res = shiftDays(d, 2.9)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(6)
    expect(res.getDate()).toBe(3)
  })
  
  it('truncates fractional negative shifts toward zero', () => {
    const d = new Date(2024, 6, 10, 8, 0, 0, 0) // Jul 10, 2024
    const res = shiftDays(d, -2.9)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(6)
    expect(res.getDate()).toBe(8)
  })
  
  it('treats non-finite shifts (NaN, ±Infinity) as 0', () => {
    const base = new Date(2025, 3, 20, 12, 0, 0, 0)
    const a = shiftDays(base, Number.NaN as unknown as number)
    const b = shiftDays(base, Number.POSITIVE_INFINITY as unknown as number)
    const c = shiftDays(base, Number.NEGATIVE_INFINITY as unknown as number)
    for (const res of [a, b, c]) {
      expect(res.getFullYear()).toBe(2025)
      expect(res.getMonth()).toBe(3)
      expect(res.getDate()).toBe(20)
      expect(res.getHours()).toBe(0)
      expect(res.getMinutes()).toBe(0)
      expect(res.getSeconds()).toBe(0)
      expect(res.getMilliseconds()).toBe(0)
    }
  })
  
  it('crosses month boundary correctly (end → next month)', () => {
    const d = new Date(2024, 0, 31, 23, 59, 59, 999) // Jan 31, 2024
    const res = shiftDays(d, 1)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(1) // Feb
    expect(res.getDate()).toBe(1)
  })
  
  it('crosses year boundary correctly (Dec → Jan)', () => {
    const d = new Date(2024, 11, 31, 15, 0, 0, 0) // Dec 31, 2024
    const res = shiftDays(d, 1)
    expect(res.getFullYear()).toBe(2025)
    expect(res.getMonth()).toBe(0) // Jan
    expect(res.getDate()).toBe(1)
  })
  
  it('handles leap day forward (Feb 28, 2024 + 1 → Feb 29, 2024)', () => {
    const d = new Date(2024, 1, 28, 10, 0, 0, 0)
    const res = shiftDays(d, 1)
    expect(res.getFullYear()).toBe(2024)
    expect(res.getMonth()).toBe(1) // Feb
    expect(res.getDate()).toBe(29)
  })
  
  it('handles non-leap year forward (Feb 28, 2025 + 1 → Mar 1, 2025)', () => {
    const d = new Date(2025, 1, 28, 10, 0, 0, 0)
    const res = shiftDays(d, 1)
    expect(res.getFullYear()).toBe(2025)
    expect(res.getMonth()).toBe(2) // Mar
    expect(res.getDate()).toBe(1)
  })
  
  it('does not mutate the input date and returns a new instance', () => {
    const d = new Date(2025, 4, 10, 18, 30, 0, 123)
    const copyTime = d.getTime()
    const res = shiftDays(d, 2)
    expect(d.getTime()).toBe(copyTime)
    expect(res === d).toBe(false)
  })
})
