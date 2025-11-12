import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { isCurrentDate } from '../../date'

describe('isCurrentDate (no mocks)', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  
  afterEach(() => {
    vi.useRealTimers()
  })
  
  it('returns false for null', () => {
    expect(isCurrentDate(null)).toBe(false)
  })
  
  it('returns true when date equals local midnight of current system date', () => {
    // 10 Oct 2024, 13:45:12.345 local time
    vi.setSystemTime(new Date(2024, 9, 10, 13, 45, 12, 345))
    
    const localMidnight = new Date(2024, 9, 10, 0, 0, 0, 0)
    expect(isCurrentDate(localMidnight)).toBe(true)
  })
  
  it('returns false for same calendar day but different time (not midnight)', () => {
    vi.setSystemTime(new Date(2024, 9, 10, 8, 0, 0, 0))
    
    const sameDayDifferentTime = new Date(2024, 9, 10, 14, 30, 0, 0)
    expect(isCurrentDate(sameDayDifferentTime)).toBe(false)
  })
  
  it('returns false for previous day', () => {
    vi.setSystemTime(new Date(2025, 0, 1, 9, 0, 0, 0))
    
    const prevDayMidnight = new Date(2024, 11, 31, 0, 0, 0, 0)
    expect(isCurrentDate(prevDayMidnight)).toBe(false)
  })
  
  it('returns false for next day', () => {
    vi.setSystemTime(new Date(2025, 0, 1, 9, 0, 0, 0))
    
    const nextDayMidnight = new Date(2025, 0, 2, 0, 0, 0, 0)
    expect(isCurrentDate(nextDayMidnight)).toBe(false)
  })
  
  it('handles leap day correctly (Feb 29, 2024)', () => {
    vi.setSystemTime(new Date(2024, 1, 29, 17, 20, 0, 0))
    
    const leapDayMidnight = new Date(2024, 1, 29, 0, 0, 0, 0)
    expect(isCurrentDate(leapDayMidnight)).toBe(true)
    
    const leapDayNonMidnight = new Date(2024, 1, 29, 12, 0, 0, 0)
    expect(isCurrentDate(leapDayNonMidnight)).toBe(false)
  })
  
  it('is idempotent for the same system time (multiple calls yield same result)', () => {
    vi.setSystemTime(new Date(2024, 6, 15, 9, 30, 0, 0))
    
    const midnight = new Date(2024, 6, 15, 0, 0, 0, 0)
    expect(isCurrentDate(midnight)).toBe(true)
    expect(isCurrentDate(midnight)).toBe(true)
  })
})
