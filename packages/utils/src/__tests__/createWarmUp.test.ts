import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createWarmUp } from '../createWarmUp'

describe('createWarmUp', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('is cold until warmed up', () => {
    expect(createWarmUp(500).isWarm()).toBe(false)
  })

  it('stays warm for the duration after warming up', () => {
    const warmUp = createWarmUp(500)

    warmUp.warm()
    vi.advanceTimersByTime(499)

    expect(warmUp.isWarm()).toBe(true)
  })

  it('cools down once the duration passes', () => {
    const warmUp = createWarmUp(500)

    warmUp.warm()
    vi.advanceTimersByTime(501)

    expect(warmUp.isWarm()).toBe(false)
  })
})
