import { describe, expect, it } from 'vitest'
import { resolveSnapStop } from '../resolveSnapStop'

describe('resolveSnapStop', () => {
  it('returns the stop nearest to where the drag is released', () => {
    expect(resolveSnapStop([0, 200, 400], 400, 260)).toBe(200)
  })

  it('accepts stops in any order', () => {
    expect(resolveSnapStop([400, 0, 200], 400, 60)).toBe(0)
  })

  it('returns the first or last stop for a release past the ends', () => {
    expect(resolveSnapStop([0, 200, 400], 200, -150)).toBe(0)
    expect(resolveSnapStop([0, 200, 400], 200, 900)).toBe(400)
  })

  it('moves one stop at most when stepped', () => {
    expect(resolveSnapStop([0, 200, 400, 600], 600, -100, true)).toBe(400)
    expect(resolveSnapStop([0, 200, 400, 600], 0, 900, true)).toBe(200)
  })

  it('stays at the current stop when stepped and released close to it', () => {
    expect(resolveSnapStop([0, 200, 400], 200, 230, true)).toBe(200)
  })
})
