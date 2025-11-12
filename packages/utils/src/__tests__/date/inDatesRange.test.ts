import { describe, it, expect } from 'vitest'
import { inDatesRange } from '../../date'

describe('inDatesRange', () => {
  it('should return true when the value date exists in the range', () => {
    const range: [Date, Date] = [
      new Date(2025, 0, 1),
      new Date(2025, 0, 3),
    ]
    const value = new Date(2025, 0, 2)
    expect(inDatesRange(range, value)).toBe(true)
  })
  
  it('should return false when the value date does not exist in the range', () => {
    const range: [Date, Date] = [
      new Date(2025, 0, 1),
      new Date(2025, 0, 3)
    ]
    const value = new Date(2025, 0, 4)
    expect(inDatesRange(range, value)).toBe(false)
  })
  
  it('should return false for an empty range', () => {
    const range = [] as unknown as [Date, Date]
    const value = new Date(2025, 0, 1)
    expect(inDatesRange(range, value)).toBe(false)
  })
})
