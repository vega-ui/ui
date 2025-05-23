import { describe, expect, it } from 'vitest'
import { clamp } from '../clamp'

describe('clamp', () => {
  it('returns the value when within bounds', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })

  it('clamps to min when below min', () => {
    expect(clamp(-3, 0, 10)).toBe(0)
  })

  it('clamps to max when above max', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('returns min when value equals min', () => {
    expect(clamp(0, 0, 10)).toBe(0)
  })

  it('returns max when value equals max', () => {
    expect(clamp(10, 0, 10)).toBe(10)
  })

  it('handles negative ranges', () => {
    expect(clamp(-5, -10, -1)).toBe(-5)
    expect(clamp(-15, -10, -1)).toBe(-10)
    expect(clamp(0, -10, -1)).toBe(-1)
  })

  it('handles min > max (should behave like no clamp)', () => {
    expect(clamp(5, 10, 0)).toBe(0)
  })
})
