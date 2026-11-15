import { describe, expect, it } from 'vitest'
import { getReleaseDuration } from '../getReleaseDuration'

describe('getReleaseDuration', () => {
  it('starts at the speed of the pointer', () => {
    expect(getReleaseDuration(400, 3000)).toBe(300)
    expect(getReleaseDuration(-400, -3000)).toBe(300)
  })

  it('keeps within the limits', () => {
    expect(getReleaseDuration(100, 5000)).toBe(200)
    expect(getReleaseDuration(400, 500)).toBe(500)
    expect(getReleaseDuration(100, 5000, { max: 1000 })).toBe(400)
  })

  it('takes the longest duration for a pointer at rest or moving away from the target', () => {
    expect(getReleaseDuration(400, 0)).toBe(500)
    expect(getReleaseDuration(400, -3000)).toBe(500)
    expect(getReleaseDuration(0, 3000)).toBe(500)
  })
})
