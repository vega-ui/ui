import { describe, it, expect } from 'vitest'
import { getYearsBetween } from '../../date'

describe('getYearsBetween', () => {
  it('returns a range of years from smaller to larger', () => {
    expect(getYearsBetween(2020, 2023)).toEqual([2020, 2021, 2022, 2023])
  })
  
  it('returns a range of years even if start > end', () => {
    expect(getYearsBetween(2023, 2020)).toEqual([2020, 2021, 2022, 2023])
  })
  
  it('returns a single year when start === end', () => {
    expect(getYearsBetween(2025, 2025)).toEqual([2025])
  })
  
  it('handles negative years correctly', () => {
    expect(getYearsBetween(-2, 2)).toEqual([-2, -1, 0, 1, 2])
  })
  
  it('returns array when range is extremely large (performance sanity check)', () => {
    const result = getYearsBetween(0, 10000)
    expect(result.length).toBe(10001)
    expect(result[0]).toBe(0)
    expect(result[result.length - 1]).toBe(10000)
  })
})
