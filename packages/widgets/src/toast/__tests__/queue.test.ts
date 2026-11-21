import { describe, expect, it, vi } from 'vitest'
import { createToastQueue } from '../queue'

describe('Critical User Paths', () => {
  it('puts a new toast first with its timeout and tells the subscribers', () => {
    const queue = createToastQueue<string>()
    const listener = vi.fn()
    queue.subscribe(listener)

    const first = queue.add('Saved', { timeout: 4000 })
    const second = queue.add('Copied')

    expect(queue.toasts).toEqual([{ key: second, content: 'Copied', timeout: undefined }, { key: first, content: 'Saved', timeout: 4000 }])
    expect(listener).toHaveBeenCalledTimes(2)
  })

  it('drops a closed toast and tells the subscribers once', () => {
    const queue = createToastQueue<string>()
    const key = queue.add('Saved')
    const listener = vi.fn()
    queue.subscribe(listener)

    queue.close(key)
    queue.close(key)

    expect(queue.toasts).toEqual([])
    expect(listener).toHaveBeenCalledTimes(1)
  })
})

describe('Edge Cases', () => {
  it('keeps the toasts of two queues apart', () => {
    const first = createToastQueue<string>()
    const second = createToastQueue<string>()

    first.add('Saved')

    expect(second.toasts).toEqual([])
  })

  it('stops telling a listener that unsubscribed', () => {
    const queue = createToastQueue<string>()
    const listener = vi.fn()
    const unsubscribe = queue.subscribe(listener)

    unsubscribe()
    queue.add('Saved')

    expect(listener).not.toHaveBeenCalled()
  })
})
