import { describe, expect, it } from 'vitest'
import { projectMomentum } from '../projectMomentum'

describe('projectMomentum', () => {
  it('returns 0 without velocity', () => {
    expect(projectMomentum(0)).toBe(0)
  })

  it('projects the distance a flick travels with the default deceleration', () => {
    expect(projectMomentum(1000)).toBeCloseTo(499)
  })

  it('keeps the direction of the velocity', () => {
    expect(projectMomentum(-1000)).toBeCloseTo(-499)
  })

  it('travels less with a faster deceleration', () => {
    expect(projectMomentum(1000, 0.99)).toBeLessThan(projectMomentum(1000))
  })
})
