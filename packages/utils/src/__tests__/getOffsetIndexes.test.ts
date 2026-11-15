import { describe, it, expect } from 'vitest'
import { getOffsetIndexes } from '../getOffsetIndexes'

describe('getOffsetIndexes', () => {
  it('respects start value with positive dir', () => {
    const res = getOffsetIndexes(10, 1, 4)
    expect(res).toEqual([10, 11, 12, 13])
  })
  
  it('respects start value with negative dir', () => {
    const res = getOffsetIndexes(10, -1, 4)
    expect(res).toEqual([7, 8, 9, 10])
  })
  
  it('works when size = 1 (dir = -1)', () => {
    const res = getOffsetIndexes(5, -1, 1)
    expect(res).toEqual([5])
  })
  
  it('size = 0 returns empty array', () => {
    const res = getOffsetIndexes(5, 1, 0)
    expect(res).toEqual([])
  })
})
