import { describe, it, expect, afterEach, vi } from 'vitest'
import { getWeekDayNames } from '..'

describe('getWeekDayNames', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns Monday-first order with explicit firstDayOfWeek=1 (en-US, short)', () => {
    const days = getWeekDayNames('en-US', 'short', 1)
    expect(days).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  })

  it('returns Sunday-first order with explicit firstDayOfWeek=0 (en-US, short)', () => {
    const days = getWeekDayNames('en-US', 'short', 0)
    expect(days).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
  })

  it('starts from the first day of week of the locale by default', () => {
    class MockLocale {
      weekInfo = { firstDay: 3 }
    }

    vi.stubGlobal('Intl', Object.create(Intl, { Locale: { value: MockLocale } }))

    expect(getWeekDayNames('en-US', 'short')).toEqual(['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'])
  })
})
