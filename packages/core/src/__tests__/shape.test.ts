import { describe, expect, it } from 'vitest'
import { idOf } from '../state'
import { fruits, shape } from './fixtures/listbox'


describe('Critical User Paths', () => {
  it('takes the initial value from the option, then from its default, then from the fallback', () => {
    expect(shape.create({ items: fruits, mode: 'single', active: 'fig', defaultActive: 'apple' }, 'w').active).toBe('fig')
    expect(shape.create({ items: fruits, mode: 'single', defaultActive: 'apple' }, 'w').active).toBe('apple')
    expect(shape.create({ items: fruits, mode: 'single' }, 'w').active).toBeNull()
  })

  it('returns the same snapshot when a field is set to the value it already holds', () => {
    const snapshot = shape.create({ items: fruits, mode: 'single', defaultActive: 'apple' }, 'w')

    expect(shape.active.set(snapshot, 'apple')).toBe(snapshot)
    expect(shape.active.set(snapshot, 'fig')).not.toBe(snapshot)
  })
})

describe('Edge Cases', () => {
  it('tells a value the parent controls from one only its default sets', () => {
    expect(shape.active.controlled(shape.create({ items: fruits, mode: 'single', active: 'fig' }, 'w'))).toBe(true)
    expect(shape.active.controlled(shape.create({ items: fruits, mode: 'single', defaultActive: 'fig' }, 'w'))).toBe(false)
  })
})

describe('Accessibility', () => {
  it('builds a valid id for any key and a different one for every key', () => {
    const snapshot = shape.create({ items: fruits, mode: 'single' }, 'w')

    expect(idOf(snapshot, 'option', 'New York.NY 100% (it\'s!) ~*')).toMatch(/^w-option-[A-Za-z0-9_-]+$/)
    expect(idOf(snapshot, 'option', 'a b')).not.toBe(idOf(snapshot, 'option', 'a%20b'))
    expect(idOf(snapshot, 'option', 'a.b')).not.toBe(idOf(snapshot, 'option', 'a_b'))
    expect(idOf(snapshot, 'option', 'a.b')).not.toBe(idOf(snapshot, 'option', 'a_2e_b'))
    expect(idOf(snapshot, 'option', 1)).not.toBe(idOf(snapshot, 'option', '1'))
    expect(idOf(snapshot, 'option', 1.5)).not.toBe(idOf(snapshot, 'option', '_1_2e_5'))
    expect(idOf(snapshot, 'option', -1)).toMatch(/^w-option-[A-Za-z0-9_-]+$/)
  })
})
