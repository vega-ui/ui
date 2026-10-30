import { describe, expect, it } from 'vitest'
import { rubberBand } from '../rubberBand'

describe('rubberBand', () => {
  it('returns 0 for no overshoot', () => {
    expect(rubberBand(0, 800)).toBe(0)
  })

  it('moves less than the overshoot', () => {
    expect(rubberBand(100, 800)).toBeLessThan(100)
    expect(rubberBand(100, 800)).toBeGreaterThan(0)
  })

  it('grows with the overshoot but never reaches the dimension', () => {
    expect(rubberBand(400, 800)).toBeGreaterThan(rubberBand(100, 800))
    expect(rubberBand(100000, 800)).toBeLessThan(800)
  })

  it('keeps the sign of the overshoot', () => {
    expect(rubberBand(-100, 800)).toBe(-rubberBand(100, 800))
  })
})
