import { describe, expect, it } from 'vitest'
import { getFloatExpansion } from '../getFloatExpansion'

describe('getFloatExpansion', () => {
  it('goes from 0 at the lowest top to 1 at the top', () => {
    expect(getFloatExpansion(200, 200)).toBe(0)
    expect(getFloatExpansion(100, 200)).toBe(0.5)
    expect(getFloatExpansion(0, 200)).toBe(1)
  })

  it('stays within 0 and 1 past its range', () => {
    expect(getFloatExpansion(300, 200)).toBe(0)
    expect(getFloatExpansion(-50, 200)).toBe(1)
  })

  it('is expanded when the panel cannot rest below the top', () => {
    expect(getFloatExpansion(0, 0)).toBe(1)
    expect(getFloatExpansion(100, -10)).toBe(1)
  })
})
