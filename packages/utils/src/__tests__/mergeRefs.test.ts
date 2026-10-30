import { describe, expect, test, vi } from 'vitest'
import { mergeRefs } from '../mergeRefs';

describe('mergeRefs', () => {
  test('calls callback refs with the value', () => {
    const first = vi.fn()
    const second = vi.fn()

    mergeRefs([first, second])('value')

    expect(first).toHaveBeenCalledExactlyOnceWith('value')
    expect(second).toHaveBeenCalledExactlyOnceWith('value')
  })

  test('sets object refs to the value', () => {
    const ref = { current: null as string | null }

    mergeRefs([ref])('value')

    expect(ref.current).toBe('value')
  })

  test('mixes callback and object refs', () => {
    const callback = vi.fn()
    const ref = { current: null as string | null }

    mergeRefs<string | null>([callback, ref])(null)

    expect(callback).toHaveBeenCalledExactlyOnceWith(null)
    expect(ref.current).toBeNull()
  })

  test('skips null and undefined refs', () => {
    const callback = vi.fn()

    expect(() => mergeRefs([null, undefined, callback])('value')).not.toThrow()
    expect(callback).toHaveBeenCalledExactlyOnceWith('value')
  })
})
