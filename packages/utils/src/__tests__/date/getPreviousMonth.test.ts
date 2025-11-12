import { describe, it, expect } from 'vitest'
import { getPreviousMonth } from '../../date'

describe('getPrevMonth', () => {
  it('returns previous month in same year', () => {
    const result = getPreviousMonth(2025, 6)
    expect(result).toEqual({ year: 2025, month: 5 })
  })
  
  it('returns December of previous year when month is January', () => {
    const result = getPreviousMonth(2025, 0)
    expect(result).toEqual({ year: 2024, month: 11 })
  })
  
  it('handles February correctly', () => {
    const result = getPreviousMonth(2025, 1)
    expect(result).toEqual({ year: 2025, month: 0 })
  })
  
  it('handles edge case for year 2000 January correctly', () => {
    const result = getPreviousMonth(2000, 0)
    expect(result).toEqual({ year: 1999, month: 11 })
  })
})
