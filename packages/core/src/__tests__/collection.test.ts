import { describe, expect, it } from 'vitest'
import { collection, source } from '../collection'
import { Fruit, fruits } from './fixtures/listbox'

const items = source({ key: (fruit: Fruit) => fruit.id, disabled: (fruit) => fruit.disabled ?? false, label: (fruit) => fruit.label })
const c = items.of(fruits)

describe('Critical User Paths', () => {
  it('walks over disabled items and stops at the edges', () => {
    expect(collection.next(c, 'banana')).toBe('date')
    expect(collection.previous(c, 'date')).toBe('banana')
    expect(collection.next(c, 'fig')).toBeNull()
    expect(collection.next(c, null)).toBe('apple')
  })

  it('leaves disabled items out of a range', () => {
    expect(collection.between(c, 'fig', 'apple')).toEqual(['apple', 'banana', 'date', 'fig'])
  })

  it('finds the next label after the active one and wraps around', () => {
    expect(collection.findByLabel(c, 'f', 'fig')).toBe('fig')
    expect(collection.findByLabel(c, 'a', 'fig')).toBe('apple')
    expect(collection.findByLabel(c, 'c', null)).toBeNull()
  })
})

describe('Performance', () => {
  it('reuses the collection built for the same items array', () => {
    expect(items.of(fruits)).toBe(c)
    expect(items.of([...fruits])).not.toBe(c)
  })
})
