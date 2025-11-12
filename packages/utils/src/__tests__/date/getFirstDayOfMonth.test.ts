import { describe, it, expect } from 'vitest'
import { getFirstDayOfMonth } from '../../date'

describe('getFirstDayOfMonth', () => {
  it('should return the first day of the given month and year', () => {
    const result = getFirstDayOfMonth(2025, 0)
    expect(result.getFullYear()).toBe(2025)
    expect(result.getMonth()).toBe(0)
    expect(result.getDate()).toBe(1)
  })
  
  it('should set time to midnight (00:00:00.000)', () => {
    const result = getFirstDayOfMonth(2025, 6)
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
    expect(result.getMilliseconds()).toBe(0)
  })
  
  it('should correctly handle December (month = 11)', () => {
    const result = getFirstDayOfMonth(2024, 11)
    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(11)
    expect(result.getDate()).toBe(1)
  })
  
  it('should correctly handle leap year February (month = 1)', () => {
    const result = getFirstDayOfMonth(2024, 1)
    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(1)
    expect(result.getDate()).toBe(1)
  })
  
  it('should return unique Date instances for different inputs', () => {
    const d1 = getFirstDayOfMonth(2025, 0)
    const d2 = getFirstDayOfMonth(2025, 1)
    expect(d1.getTime()).not.toBe(d2.getTime())
  })
})
