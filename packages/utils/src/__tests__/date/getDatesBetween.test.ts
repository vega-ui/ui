import { describe, it, expect } from 'vitest'
import { getDatesBetween } from '../../date'

const mapDays = (dates: Date[]) => dates.map(d => d.getDate())

describe('getDatesBetween', () => {
  it('returns all dates between two dates inclusively', () => {
    const start = new Date(2025, 9, 10)
    const end = new Date(2025, 9, 15)
    const result = getDatesBetween(start, end)
    expect(mapDays(result)).toEqual([10, 11, 12, 13, 14, 15])
  })
  
  it('returns a single date if start and end are equal', () => {
    const d = new Date(2025, 9, 12)
    const result = getDatesBetween(d, d)
    expect(result).toHaveLength(1)
    expect(result[0].getDate()).toBe(12)
  })
  
  it('automatically swaps start and end when in reverse order', () => {
    const start = new Date(2025, 9, 15)
    const end = new Date(2025, 9, 10)
    const result = getDatesBetween(start, end)
    expect(mapDays(result)).toEqual([10, 11, 12, 13, 14, 15])
  })
  
  it('returns correct results across month boundaries', () => {
    const start = new Date(2025, 8, 29) // Sep 29
    const end = new Date(2025, 9, 2)   // Oct 2
    const result = getDatesBetween(start, end)
    expect(mapDays(result)).toEqual([29, 30, 1, 2])
  })
})
