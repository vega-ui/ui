import { describe, it, expect } from 'vitest'
import { getDatesBetweenClamped } from '../../date'

const d = (y: number, m0: number, day: number, hh = 0, mm = 0, ss = 0, ms = 0) =>
  new Date(y, m0, day, hh, mm, ss, ms)

describe('getDatesBetweenClamped (no mocks)', () => {
  it('returns an inclusive day-by-day list between start and end with default min/max', () => {
    const start = d(2025, 0, 10, 0, 0, 0, 0)
    const end   = d(2025, 0, 13, 8, 30, 0, 0)
    
    const res = getDatesBetweenClamped(start, end)
    
    expect(res.map(x => x.toISOString())).toEqual([
      d(2025, 0, 10).toISOString(),
      d(2025, 0, 11).toISOString(),
      d(2025, 0, 12).toISOString(),
      d(2025, 0, 13).toISOString(),
    ])
  })
  
  it('honors clamping by min and max (both bounds included in iteration if reached)', () => {
    const start = d(2024, 9, 5, 12)   // Oct 5, 2024 12:00
    const end   = d(2024, 9, 12, 9)   // Oct 12, 2024 09:00
    const min   = d(2024, 9, 7, 0)    // Oct 7, 2024 00:00
    const max   = d(2024, 9, 10, 0)   // Oct 10, 2024 00:00
    
    const res = getDatesBetweenClamped(start, end, { min, max })
    
    // startDate -> 2024-10-05T00:00 < min => from = min (00:00 Oct 7)
    // endDate   -> 2024-10-12T00:00 > max => to   = max (00:00 Oct 10)
    // current = 7th 00:00; loop while current <= 10th 00:00 → 7,8,9,10 @ 00:00
    expect(res.map(x => x.toISOString())).toEqual([
      d(2024, 9, 7, 0).toISOString(),
      d(2024, 9, 8, 0).toISOString(),
      d(2024, 9, 9, 0).toISOString(),
      d(2024, 9, 10, 0).toISOString(),
    ])
  })
  
  it('excludes dates present in exclude (exact timestamps)', () => {
    const start = d(2024, 9, 7, 0)
    const end   = d(2024, 9, 10, 0)
    const exclude = [d(2024, 9, 8, 0), d(2024, 9, 10, 0)] // exclude two items
    
    const res = getDatesBetweenClamped(start, end, { exclude })
    
    expect(res.map(x => x.toISOString())).toEqual([
      d(2024, 9, 7, 0).toISOString(),
      d(2024, 9, 9, 0).toISOString(),
    ])
  })
  
  it('handles start > end by swapping internally (symmetric output)', () => {
    const a = d(2025, 0, 3)
    const b = d(2025, 0, 1)
    const forward  = getDatesBetweenClamped(b, a)
    const backward = getDatesBetweenClamped(a, b)
    expect(backward.map(x => x.getTime())).toEqual(forward.map(x => x.getTime()))
  })
  
  it('returns empty when clamped interval collapses (min beyond endDate or max before startDate)', () => {
    const start = d(2025, 2, 10) // Mar 10
    const end   = d(2025, 2, 12) // Mar 12
    
    expect(getDatesBetweenClamped(start, end, { min: d(2025, 2, 13) })).toEqual([])
    
    expect(getDatesBetweenClamped(start, end, { max: d(2025, 2, 9) })).toEqual([])
  })
  
  it('preserves the time component of `from` when min is used for clamping', () => {
    const start = d(2025, 5, 1, 15) // 15:00
    const end   = d(2025, 5, 3, 9)  // endDate -> 2025-06-03T00:00
    const min   = d(2025, 5, 2, 15) // clamp to 15:00 on the 2nd
    
    const res = getDatesBetweenClamped(start, end, { min })
    
    // current starts at min (2nd 15:00), then 3rd 15:00 is > to (3rd 00:00) → only 2nd 15:00 stays
    expect(res.map(x => x.toISOString())).toEqual([
      d(2025, 5, 2, 15).toISOString(),
    ])
  })
  
  it('does not mutate input dates', () => {
    const start = d(2024, 11, 31, 23, 59, 59, 999)
    const end   = d(2025, 0, 2, 12, 0, 0, 0)
    const sBefore = start.getTime()
    const eBefore = end.getTime()
    
    void getDatesBetweenClamped(start, end, {
      min: d(2024, 11, 30),
      max: d(2025, 0, 3),
      exclude: [d(2024, 11, 31), d(2025, 0, 1)],
    })
    
    expect(start.getTime()).toBe(sBefore)
    expect(end.getTime()).toBe(eBefore)
  })
  
  it('crosses month and year boundaries correctly', () => {
    const start = d(2024, 11, 30) // Dec 30, 2024
    const end   = d(2025, 0, 2)   // Jan 2, 2025
    
    const res = getDatesBetweenClamped(start, end)
    expect(res.map(x => x.toISOString())).toEqual([
      d(2024, 11, 30).toISOString(),
      d(2024, 11, 31).toISOString(),
      d(2025, 0, 1).toISOString(),
      d(2025, 0, 2).toISOString(),
    ])
  })
})
