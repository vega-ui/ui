import { describe, it, expect } from 'vitest'
import { getNextMonth } from '../../date'

describe('getNextMonth', () => {
  it('returns next month in same year', () => {
    const result = getNextMonth(2025, 5)
    expect(result).toEqual({ year: 2025, month: 6 })
  })
  
  it('returns January of next year when month is December', () => {
    const result = getNextMonth(2025, 11)
    expect(result).toEqual({ year: 2026, month: 0 })
  })
  
  it('handles edge case for January correctly', () => {
    const result = getNextMonth(2025, 0)
    expect(result).toEqual({ year: 2025, month: 1 })
  })
  
  it('handles year transition correctly for 1999', () => {
    const result = getNextMonth(1999, 11)
    expect(result).toEqual({ year: 2000, month: 0 })
  })
})
