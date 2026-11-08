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

  it('stays warm while held', () => {
    const warmUp = createWarmUp(500)

    warmUp.hold()
    vi.advanceTimersByTime(1000)

    expect(warmUp.isWarm()).toBe(true)
  })

  it('stays warm for the duration after the last hold is released', () => {
    const warmUp = createWarmUp(500)
    const releaseFirst = warmUp.hold()
    const releaseSecond = warmUp.hold()

    releaseFirst()
    vi.advanceTimersByTime(1000)
    expect(warmUp.isWarm()).toBe(true)

    releaseSecond()
    vi.advanceTimersByTime(499)
    expect(warmUp.isWarm()).toBe(true)
  })

  it('cools down once the duration passes', () => {
    const warmUp = createWarmUp(500)

    warmUp.hold()()
    vi.advanceTimersByTime(501)

    expect(warmUp.isWarm()).toBe(false)
  })
})
