import { describe, expect, it } from 'vitest'
import { resolveLength } from '../resolveLength'

describe('resolveLength', () => {
  it('takes a fraction of the total', () => {
    expect(resolveLength(0.5, 800)).toBe(400)
  })

  it('takes pixels as they are', () => {
    expect(resolveLength('120px', 800)).toBe(120)
  })

  it('never exceeds the total', () => {
    expect(resolveLength('1000px', 800)).toBe(800)
    expect(resolveLength(2, 800)).toBe(800)
  })
})
