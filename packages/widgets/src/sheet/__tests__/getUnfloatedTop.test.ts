import { describe, expect, it } from 'vitest'
import { getFloatExpansion } from '../getFloatExpansion'
import { getUnfloatedTop } from '../getUnfloatedTop'

describe('getUnfloatedTop', () => {
  it('inverts the gap the panel is painted with', () => {
    const lowestTop = 200
    const inset = 16

    for (const paintedTop of [-20, 0, 40, 92, 184, 300]) {
      const top = getUnfloatedTop(paintedTop, lowestTop, inset)
      const gap = inset * (1 - getFloatExpansion(top, lowestTop))

      expect(top - gap).toBeCloseTo(paintedTop)
    }
  })

  it('has no gap when the panel cannot rest below its inset', () => {
    expect(getUnfloatedTop(50, 10, 16)).toBe(50)
  })
})
