import { describe, expect, test, vi } from 'vitest'
import { mergeEventHandlers } from '../mergeEventHandlers'
import type { SyntheticEvent } from 'react';

describe('mergeEventsHandlers', () => {
  test('calls all handlers in order', () => {
    const calls: string[] = []
    
    const handler = mergeEventHandlers(
      () => calls.push('first'),
      () => calls.push('second'),
      () => calls.push('third')
    )
    
    handler({} as SyntheticEvent)
    expect(calls).toEqual(['first', 'second', 'third'])
  })
  
  test('skips undefined handlers without error', () => {
    const calls: string[] = []
    
    const handler = mergeEventHandlers(
      undefined,
      () => calls.push('called'),
      undefined
    )
    
    handler({} as SyntheticEvent)
    expect(calls).toEqual(['called'])
  })
  
  test('returns a no-op handler if all are undefined', () => {
    const handler = mergeEventHandlers(undefined, undefined)
    expect(() => handler({} as SyntheticEvent)).not.toThrow()
  })
  
  test('preserves event object through all handlers', () => {
    const spy = vi.fn()
    const handler = mergeEventHandlers(spy, spy, spy)
    
    const event = { type: 'click' } as unknown as SyntheticEvent
    handler(event)
    
    expect(spy).toHaveBeenCalledTimes(3)
    expect(spy).toHaveBeenCalledWith(event)
  })
})
