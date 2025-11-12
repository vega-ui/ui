import { describe, it, expect } from 'vitest'
import { getAllDaysOfMonth } from '../../date'

describe('getAllDaysOfMonth', () => {
  it('returns all days for a month with 31 days', () => {
    const days = getAllDaysOfMonth(2025, 10) // October 2025
    expect(days).toHaveLength(31)
    expect(days[0].getDate()).toBe(1)
    expect(days[30].getDate()).toBe(31)
    expect(days[0].getMonth()).toBe(9)
  })
  
  it('returns all days for a month with 30 days', () => {
    const days = getAllDaysOfMonth(2025, 9) // September 2025
    expect(days).toHaveLength(30)
    expect(days[0].getDate()).toBe(1)
    expect(days[29].getDate()).toBe(30)
  })
  
  it('handles February in a leap year (29 days)', () => {
    const days = getAllDaysOfMonth(2024, 2)
    expect(days).toHaveLength(29)
    expect(days[0].getDate()).toBe(1)
    expect(days[28].getDate()).toBe(29)
  })
  
  it('handles February in a non-leap year (28 days)', () => {
    const days = getAllDaysOfMonth(2025, 2)
    expect(days).toHaveLength(28)
    expect(days[0].getDate()).toBe(1)
    expect(days[27].getDate()).toBe(28)
  })
  
  it('produces Date objects with correct year and month', () => {
    const days = getAllDaysOfMonth(2025, 5)
    expect(days[0]).toBeInstanceOf(Date)
    expect(days[0].getFullYear()).toBe(2025)
    expect(days[0].getMonth()).toBe(4)
  })
})
