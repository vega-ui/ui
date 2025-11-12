import { describe, it, expect } from 'vitest'
import { includeDate } from '../../date'

describe('includeDate', () => {
  it('returns false for empty list', () => {
    const res = includeDate([], new Date(2024, 9, 10))
    expect(res).toBe(false)
  })
  
  it('returns true when the exact same Date instance is present', () => {
    const target = new Date(2024, 9, 10, 12, 34, 56, 789)
    const dates = [new Date(2024, 9, 9), target, new Date(2024, 9, 11)]
    const res = includeDate(dates, target)
    expect(res).toBe(true)
  })
  
  it('returns true when equal by timestamp (different instances, same time)', () => {
    const a = new Date(2024, 9, 10, 0, 0, 0, 0)
    const b = new Date(2024, 9, 10, 0, 0, 0, 0)
    const dates = [new Date(2024, 9, 9), a, new Date(2024, 9, 11)]
    const res = includeDate(dates, b)
    expect(res).toBe(true)
  })
  
  it('returns false when date not found', () => {
    const dates = [new Date(2024, 9, 9), new Date(2024, 9, 11)]
    const query = new Date(2024, 9, 10)
    const res = includeDate(dates, query)
    expect(res).toBe(false)
  })
  
  it('handles duplicates (still true)', () => {
    const d1 = new Date(2024, 9, 10)
    const d2 = new Date(2024, 9, 10)
    const dates = [d1, d2]
    const res = includeDate(dates, new Date(2024, 9, 10))
    expect(res).toBe(true)
  })
  
  it('matches boundary elements (first and last)', () => {
    const first = new Date(2024, 9, 8)
    const last = new Date(2024, 9, 12)
    const dates = [first, new Date(2024, 9, 10), last]
    expect(includeDate(dates, first)).toBe(true)
    expect(includeDate(dates, last)).toBe(true)
  })
  
  it('does not treat same calendar day with different time as equal (by timestamp semantics)', () => {
    const stored = new Date(2024, 9, 10, 13, 0, 0, 0)
    const query = new Date(2024, 9, 10, 14, 0, 0, 0) // different time → different timestamp
    const dates = [stored]
    const res = includeDate(dates, query)
    expect(res).toBe(false)
  })
})
