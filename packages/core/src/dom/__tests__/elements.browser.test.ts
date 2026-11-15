import { describe, expect, it, vi } from 'vitest'
import { createElements } from '../elements'

const mount = () => {
  const root = document.createElement('ul')
  document.body.append(root)

  const items = ['a', 'b', 'c'].map((key) => {
    const li = document.createElement('li')
    li.textContent = key
    root.append(li)
    return { key, li }
  })

  const elements = createElements<string, { value: string }>()
  elements.setRoot(root)
  for (const { key, li } of items) elements.setItem(key, li, { value: key })

  return { root, items, elements }
}

const order = (elements: ReturnType<typeof mount>['elements']) => elements.entries().map((entry) => entry.key)

describe('Critical User Paths', () => {
  it('lists the items in DOM order and follows a reorder of the same elements', async () => {
    const { root, items, elements } = mount()
    const listener = vi.fn()
    elements.subscribe(listener)

    expect(order(elements)).toEqual(['a', 'b', 'c'])

    root.prepend(items[2].li)
    await Promise.resolve()

    expect(order(elements)).toEqual(['c', 'a', 'b'])
    expect(listener).toHaveBeenCalledOnce()
  })

  it('keeps a reorder that happened while the root ref was swapped', async () => {
    const { root, items, elements } = mount()

    root.prepend(items[2].li)
    elements.setRoot(null)
    elements.setRoot(root)
    await Promise.resolve()

    expect(order(elements)).toEqual(['c', 'a', 'b'])
  })
})

describe('Edge Cases', () => {
  it('does not notify when an item registers again with the same element and data', () => {
    const { items, elements } = mount()
    const listener = vi.fn()
    elements.subscribe(listener)
    const data = elements.entries()[0].data

    elements.setItem('a', items[0].li, data)

    expect(listener).not.toHaveBeenCalled()
  })

  it('ignores an unregister of an element that was replaced', () => {
    const { items, elements } = mount()
    const unregister = elements.setItem('a', items[0].li, { value: 'a' })
    const replacement = document.createElement('li')
    elements.setItem('a', replacement, { value: 'a' })

    unregister()

    expect(elements.item('a')).toBe(replacement)
    expect(elements.keyOf(items[0].li)).toBeUndefined()
  })
})
