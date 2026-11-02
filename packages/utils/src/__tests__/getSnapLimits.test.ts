import { describe, expect, it } from 'vitest'
import { getSnapLimits } from '../getSnapLimits'

describe('getSnapLimits', () => {
  it('returns the outermost stops', () => {
    expect(getSnapLimits([300, 0, 150], 300)).toEqual([0, 300])
  })

  it('returns the stops next to the current one when stepped', () => {
    expect(getSnapLimits([300, 0, 150], 300, true)).toEqual([150, 300])
    expect(getSnapLimits([300, 0, 150], 150, true)).toEqual([0, 300])
    expect(getSnapLimits([300, 0, 150], 0, true)).toEqual([0, 150])
  })

  it('skips the stops that share the current position when stepped', () => {
    expect(getSnapLimits([50, 0, 0], 0, true)).toEqual([0, 50])
  })
})
