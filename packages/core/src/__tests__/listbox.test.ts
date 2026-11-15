import { describe, expect, it, vi } from 'vitest'
import { focus, key, mod, timer } from '../input'
import { TYPEAHEAD } from '../fragments'
import { simulate } from '../test'
import { fruits, listbox } from './fixtures/listbox'

describe('Critical User Paths', () => {
  it('moves the active option with the arrows, skips disabled options and asks to reveal the new one', () => {
    const widget = simulate(listbox, { items: fruits, mode: 'single' })

    widget.send(focus.enter)
    expect(widget.state.active).toBe('apple')

    widget.send(key.arrowDown).send(key.arrowDown)
    expect(widget.state.active).toBe('date')
    expect(widget.actions).toEqual([{ type: 'reveal', key: 'date' }])

    widget.send(key.end)
    expect(widget.state.active).toBe('fig')
    expect(widget.answer).toBe('handled')

    widget.send(key.home).send(key.pageDown)
    expect(widget.state.active).toBe('date')

    widget.send(key.pageUp)
    expect(widget.state.active).toBe('banana')
  })

  it('toggles while moving with Shift+Arrow and selects the range from the last selected option with Shift+Space', () => {
    const widget = simulate(listbox, { items: fruits, mode: 'multiple', defaultActive: 'apple' })

    widget.send(key.with(key.arrowDown, mod.shift)).send(key.with(key.arrowDown, mod.shift))
    expect(widget.state.value).toEqual(['banana', 'date'])
    expect(widget.state.anchor).toBe('date')

    widget.send(key.with(key.arrowUp, mod.shift))
    expect(widget.state.value).toEqual(['date'])

    widget.send(key.space).send(key.end).send(key.with(key.space, mod.shift))
    expect(widget.state.value).toEqual(['date', 'banana', 'fig'])

    widget.send(key.with(key.home, mod.shift, mod.mod))
    expect(widget.state.value).toEqual(['date', 'banana', 'fig', 'apple'])
    expect(widget.state.active).toBe('apple')

    const onChangeValue = vi.fn()
    widget.setOptions({ items: fruits, mode: 'multiple', value: ['fig'], onChangeValue }).send(key.with(key.arrowDown, mod.shift))
    expect(onChangeValue).toHaveBeenCalledExactlyOnceWith(['fig', 'banana'])
    expect(widget.state.value).toEqual(['fig', 'banana'])

    widget.setOptions({ items: fruits, mode: 'multiple', value: ['fig'], onChangeValue })
    expect(widget.state.value).toEqual(['fig'])
  })

  it('forgets the typed letters when the focus leaves', () => {
    const widget = simulate(listbox, { items: fruits, mode: 'single' })

    widget.type('b').send(focus.leave)

    expect(widget.state.typed).toBe('')
    expect(widget.actions).toEqual([{ type: 'cancelTimer', name: TYPEAHEAD }])
    expect(widget.answer).toBe('keep')
  })

  it('selects a pressed option in single mode and toggles it in multiple mode', () => {
    const single = simulate(listbox, { items: fruits, mode: 'single' })
    single.pressAt('banana')
    expect(single.state.value).toEqual(['banana'])
    expect(single.state.active).toBe('banana')

    const multiple = simulate(listbox, { items: fruits, mode: 'multiple', defaultValue: ['apple'] })
    multiple.pressAt('banana').pressAt('apple')
    expect(multiple.state.value).toEqual(['banana'])
  })

  it('finds an option by typed letters, keeps the buffer while the timer runs and clears it when the timer fires', () => {
    const widget = simulate(listbox, { items: fruits, mode: 'single' })

    widget.type('d')
    expect(widget.state.active).toBe('date')
    expect(widget.actions).toContainEqual({ type: 'timer', name: TYPEAHEAD, ms: 500 })

    widget.type('a')
    expect(widget.state.typed).toBe('da')
    expect(widget.state.active).toBe('date')

    widget.send(timer(TYPEAHEAD))
    expect(widget.state.typed).toBe('')
    expect(widget.state.timers.has(TYPEAHEAD)).toBe(false)
  })

  it('selects every selectable option with Mod+A', () => {
    const widget = simulate(listbox, { items: fruits, mode: 'multiple' })

    widget.send(key.with(key.a, mod.mod))

    expect(widget.state.value).toEqual(['apple', 'banana', 'date', 'fig'])
  })
})

describe('Edge Cases', () => {
  it('maps the arrows along the axis of the widget, mirrored in RTL', () => {
    const widget = simulate(listbox, { items: fruits, mode: 'single', defaultActive: 'banana' }, { orientation: 'horizontal', rtl: true })

    widget.send(key.arrowLeft)
    expect(widget.state.active).toBe('date')

    expect(() => widget.send(key.arrowDown)).toThrow(/does not listen to key ArrowDown/)
    expect(widget.state.active).toBe('date')
  })

  it('does not go past the last option and still reports the key as handled', () => {
    const widget = simulate(listbox, { items: fruits, mode: 'single', defaultActive: 'fig' })

    widget.send(key.arrowDown)

    expect(widget.state.active).toBe('fig')
    expect(widget.answer).toBe('handled')
    expect(widget.actions).toEqual([])
  })

  it('does not report picking what is already selected, like a native select', () => {
    const onChangeValue = vi.fn()

    simulate(listbox, { items: fruits, mode: 'single', defaultValue: ['apple'], onChangeValue }).pressAt('apple')
    simulate(listbox, { items: fruits, mode: 'range', defaultValue: ['apple'], onChangeValue }).pressAt('apple')
    simulate(listbox, { items: fruits, mode: 'multiple', defaultValue: ['fig', 'date', 'banana', 'apple'], onChangeValue }).send(key.with(key.a, mod.mod))

    expect(onChangeValue).not.toHaveBeenCalled()
  })

  it('leaves the keys it does not know to the browser', () => {
    const widget = simulate(listbox, { items: fruits, mode: 'single', defaultActive: 'apple' })

    expect(() => widget.send(key.tab)).toThrow(/does not listen to key Tab/)
  })
})
