import { describe, expect, it } from 'vitest'
import { clamp } from '../clamp'

describe('clamp', () => {
  it('returns the value when within bounds', () => {
    expect(clamp(0, 5, 10)).toBe(5)
  })

  it('clamps to min when below min', () => {
    expect(clamp(0, -3, 10)).toBe(0)
  })

  it('clamps to max when above max', () => {
    expect(clamp(0, 15, 10)).toBe(10)
  })

  it('returns max when min > max', () => {
    expect(clamp(10, 5, 0)).toBe(0)
  })
})
