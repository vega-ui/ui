import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getCurrentDate } from '../../date'

describe('getCurrentDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  
  afterEach(() => {
    vi.useRealTimers()
  })
  
  it('returns local midnight for the current date (midday case)', () => {
    // 10 Oct 2024, 13:45:12.345 (local time)
    const systemNow = new Date(2024, 9, 10, 13, 45, 12, 345)
    vi.setSystemTime(systemNow)
    
    const result = getCurrentDate()
    
    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(9) // October
    expect(result.getDate()).toBe(10)
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
    expect(result.getMilliseconds()).toBe(0)
  })
})
