import { describe, it, expect } from 'vitest'
import { getLastDayOfMonth } from '../../date'

describe('getLastDayOfMonth', () => {
  it('should return the last day of January (31)', () => {
    const result = getLastDayOfMonth(2025, 0)
    expect(result.getFullYear()).toBe(2025)
    expect(result.getMonth()).toBe(0)
    expect(result.getDate()).toBe(31)
  })
  
  it('should return the last day of a leap year February (29)', () => {
    const result = getLastDayOfMonth(2024, 1)
    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(1)
    expect(result.getDate()).toBe(29)
  })
  
  it('should return the last day of a non-leap year February (28)', () => {
    const result = getLastDayOfMonth(2025, 1)
    expect(result.getFullYear()).toBe(2025)
    expect(result.getMonth()).toBe(1)
    expect(result.getDate()).toBe(28)
  })
  
  it('should return the last day of December (31)', () => {
    const result = getLastDayOfMonth(2023, 11)
    expect(result.getFullYear()).toBe(2023)
    expect(result.getMonth()).toBe(11)
    expect(result.getDate()).toBe(31)
  })
  
  it('should set time to midnight (00:00:00.000)', () => {
    const result = getLastDayOfMonth(2025, 6)
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
    expect(result.getMilliseconds()).toBe(0)
  })
})
