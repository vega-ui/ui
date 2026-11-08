import { describe, it, expect } from 'vitest'
import { getNextDate } from '../../date'

describe('getNextDate', () => {
  it('defaults to shifting forward by 1 day and normalizes to local midnight', () => {
    const base = new Date(2025, 0, 15, 13, 37, 59, 987)
    const res = getNextDate(base)
    expect(res.getFullYear()).toBe(2025)
    expect(res.getMonth()).toBe(0)
    expect(res.getDate()).toBe(16)
    expect(res.getHours()).toBe(0)
    expect(res.getMinutes()).toBe(0)
    expect(res.getSeconds()).toBe(0)
    expect(res.getMilliseconds()).toBe(0)
  })
})
