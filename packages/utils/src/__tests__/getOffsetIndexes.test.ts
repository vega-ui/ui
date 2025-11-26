import { describe, it, expect } from 'vitest'
import { getOffsetIndexes } from '../getOffsetIndexes'

describe('getOffsetIndexes', () => {
  it('generates ascending offsets when dir = 1', () => {
    const res = getOffsetIndexes(0, 1, 5)
    expect(res).toEqual([0, 1, 2, 3, 4])
  })
  
  it('generates descending offsets when dir = -1, but returns them in ascending order', () => {
    const res = getOffsetIndexes(0, -1, 5)
    expect(res).toEqual([-4, -3, -2, -1, 0])
  })
  
  it('respects start value with positive dir', () => {
    const res = getOffsetIndexes(10, 1, 4)
    expect(res).toEqual([10, 11, 12, 13])
  })
  
  it('respects start value with negative dir', () => {
    const res = getOffsetIndexes(10, -1, 4)
    expect(res).toEqual([7, 8, 9, 10])
  })
  
  it('works when size = 1 (dir = 1)', () => {
    const res = getOffsetIndexes(5, 1, 1)
    expect(res).toEqual([5])
  })
  
  it('works when size = 1 (dir = -1)', () => {
    const res = getOffsetIndexes(5, -1, 1)
    expect(res).toEqual([5])
  })
  
  it('handles negative start', () => {
    const res = getOffsetIndexes(-3, 1, 4)
    expect(res).toEqual([-3, -2, -1, 0])
  })
  
  it('handles negative start with dir = -1', () => {
    const res = getOffsetIndexes(-3, -1, 4)
    expect(res).toEqual([-6, -5, -4, -3])
  })
  
  it('size = 0 returns empty array', () => {
    const res = getOffsetIndexes(5, 1, 0)
    expect(res).toEqual([])
  })
})
