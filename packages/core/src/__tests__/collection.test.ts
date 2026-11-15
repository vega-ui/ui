import { describe, expect, it } from 'vitest'
import { collection, source } from '../collection'
import { Fruit, fruits } from './fixtures/listbox'

const items = source({ key: (fruit: Fruit) => fruit.id, disabled: (fruit) => fruit.disabled ?? false, label: (fruit) => fruit.label })
const fruitCollection = items.of(fruits)

describe('Critical User Paths', () => {
  it('walks over disabled items and stops at the edges', () => {
    expect(collection.next(fruitCollection, 'banana')).toBe('date')
    expect(collection.previous(fruitCollection, 'date')).toBe('banana')
    expect(collection.next(fruitCollection, 'fig')).toBeNull()
    expect(collection.next(fruitCollection, null)).toBe('apple')
  })

  it('leaves disabled items out of a range', () => {
    expect(collection.between(fruitCollection, 'fig', 'apple')).toEqual(['apple', 'banana', 'date', 'fig'])
  })

  it('finds the next label after the active one and wraps around', () => {
    expect(collection.findByLabel(fruitCollection, 'f', 'fig')).toBe('fig')
    expect(collection.findByLabel(fruitCollection, 'a', 'fig')).toBe('apple')
    expect(collection.findByLabel(fruitCollection, 'c', null)).toBeNull()
  })
})

describe('Performance', () => {
  it('reuses the collection built for the same items array', () => {
    expect(items.of(fruits)).toBe(fruitCollection)
    expect(items.of([...fruits])).not.toBe(fruitCollection)
  })
})
