import { describe, it, expect } from 'vitest'
import { isEqualDates } from '../../date'

describe('isEqualDates', () => {
  it('returns true for identical dates', () => {
    const a = new Date(2025, 9, 12, 10, 0, 0)
    const b = new Date(2025, 9, 12, 10, 0, 0)
    expect(isEqualDates(a, b)).toBe(true)
  })
  
  it('returns false for different times on the same day', () => {
    const a = new Date(2025, 9, 12, 10, 0, 0)
    const b = new Date(2025, 9, 12, 15, 0, 0)
    expect(isEqualDates(a, b)).toBe(false)
  })
  
  it('returns false for different days', () => {
    const a = new Date(2025, 9, 12)
    const b = new Date(2025, 9, 13)
    expect(isEqualDates(a, b)).toBe(false)
  })
})
