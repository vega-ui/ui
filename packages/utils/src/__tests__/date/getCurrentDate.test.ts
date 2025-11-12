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
  
  it('returns local midnight when current time is exactly midnight', () => {
    // 1 Jan 2025, 00:00:00.000 (local time)
    const systemNow = new Date(2025, 0, 1, 0, 0, 0, 0)
    vi.setSystemTime(systemNow)
    
    const result = getCurrentDate()
    
    expect(result.getFullYear()).toBe(2025)
    expect(result.getMonth()).toBe(0) // January
    expect(result.getDate()).toBe(1)
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
    expect(result.getMilliseconds()).toBe(0)
  })
  
  it('returns local midnight even when current time is end of day', () => {
    // 28 Feb 2025, 23:59:59.999 (local time)
    const systemNow = new Date(2025, 1, 28, 23, 59, 59, 999)
    vi.setSystemTime(systemNow)
    
    const result = getCurrentDate()
    
    expect(result.getFullYear()).toBe(2025)
    expect(result.getMonth()).toBe(1) // February
    expect(result.getDate()).toBe(28)
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
    expect(result.getMilliseconds()).toBe(0)
  })
  
  it('handles leap day correctly (Feb 29, 2024)', () => {
    // 29 Feb 2024, 17:20:00.000 (local time; 2024 is leap year)
    const systemNow = new Date(2024, 1, 29, 17, 20, 0, 0)
    vi.setSystemTime(systemNow)
    
    const result = getCurrentDate()
    
    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(1)
    expect(result.getDate()).toBe(29)
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
    expect(result.getMilliseconds()).toBe(0)
  })
  
  it('returns a new Date instance each call (idempotent for the same system time)', () => {
    const systemNow = new Date(2024, 6, 15, 9, 30, 0, 123)
    vi.setSystemTime(systemNow)
    
    const a = getCurrentDate()
    const b = getCurrentDate()
    
    expect(a === b).toBe(false)
    expect(a.getTime()).toBe(b.getTime())
  })
})
