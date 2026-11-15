import { describe, expect, it, vi } from 'vitest'
import { act, browser, focus, key, lifecycle, mod, pointer, renderPart, timer, TYPEAHEAD } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { isSelected, ListboxEntry } from '../../listbox'
import { COMBOBOX, LISTBOX, selectWidget } from '../widget'

const letters: readonly ListboxEntry[] = [
  { key: 'a', data: { value: 'a', label: 'Alpha' } },
  { key: 'b', data: { value: 'b', label: 'Beta', disabled: true } },
  { key: 'c', data: { value: 'c', label: 'Gamma' } },
  { key: 'd', data: { value: 'd', label: 'Delta' } },
]

const base = { items: letters, disabled: false, readOnly: false, typeahead: true }

const cities: readonly ListboxEntry[] = [
  { key: 'moscow', data: { value: 'moscow', label: 'Moscow' } },
  { key: 'spb', data: { value: 'saint-petersburg', label: 'Saint Petersburg' } },
  { key: 'nsk', data: { value: 'novosibirsk', label: 'Novosibirsk' } },
]

const SHOW = act.showPopover(LISTBOX)
const HIDE = act.hidePopover(LISTBOX)

describe('Critical User Paths', () => {
  it('opens on ArrowDown at the selected option and picks with Enter', () => {
    const onChangeValue = vi.fn()
    const select = simulate(selectWidget, { ...base, defaultValue: 'c', onChangeValue })

    select.send(key.arrowDown)
    expect(select.state.open).toBe(true)
    expect(select.state.active).toBe('c')
    expect(select.actions).toEqual([SHOW, act.reveal('c')])

    select.observe({ shown: true }).send(key.arrowDown).send(key.enter)
    expect(select.state.value).toBe('d')
    expect(select.state.open).toBe(false)
    expect(select.state.active).toBeNull()
    expect(select.actions).toEqual([HIDE])
    expect(onChangeValue).toHaveBeenCalledExactlyOnceWith('d')
  })

  it('picks an option with the pointer and closes, but never a disabled one', () => {
    const onChangeValue = vi.fn()
    const select = simulate(selectWidget, { ...base, onChangeValue })

    select.send(key.arrowDown).observe({ shown: true }).pressAt('b')
    expect(select.state.value).toBeNull()
    expect(select.state.open).toBe(true)

    select.pressAt('a')
    expect(select.state.value).toBe('a')
    expect(select.state.open).toBe(false)
    expect(select.actions).toEqual([HIDE])
    expect(onChangeValue).toHaveBeenCalledExactlyOnceWith('a')
  })

  it('moves the active option in the open list, skips disabled options and stops at the ends', () => {
    const select = simulate(selectWidget, { ...base, items: [{ key: 'z', data: { value: 'z', label: 'Zeta', disabled: true } }, ...letters] })

    select.send(key.arrowDown)
    expect(select.state.active).toBe('a')

    select.observe({ shown: true }).send(key.arrowDown)
    expect(select.state.active).toBe('c')

    select.send(key.arrowDown).send(key.arrowDown)
    expect(select.state.active).toBe('d')

    select.send(key.arrowUp)
    expect(select.state.active).toBe('c')

    select.send(key.home)
    expect(select.state.active).toBe('a')

    select.send(key.end)
    expect(select.state.active).toBe('d')
  })

  it('opens a closed list on the first option with ArrowUp, on the first and the last with Home and End, and never picks', () => {
    const onChangeValue = vi.fn()
    const select = simulate(selectWidget, { ...base, defaultValue: 'c', onChangeValue })

    select.send(key.end)
    expect(select.state.open).toBe(true)
    expect(select.state.active).toBe('d')

    select.observe({ shown: true }).send(browser.toggle, { to: false }).observe({ shown: false }).send(key.home)
    expect(select.state.active).toBe('a')

    const fresh = simulate(selectWidget, { ...base, onChangeValue })
    fresh.send(key.arrowUp)
    expect(fresh.state.open).toBe(true)
    expect(fresh.state.active).toBe('a')

    expect(select.state.value).toBe('c')
    expect(onChangeValue).not.toHaveBeenCalled()
  })

  it('opens with Alt+ArrowDown keeping the value and closes with Alt+ArrowUp picking the active option', () => {
    const select = simulate(selectWidget, base)

    select.send(key.with(key.arrowDown, mod.alt))
    expect(select.state.open).toBe(true)
    expect(select.state.value).toBeNull()
    expect(select.actions).toEqual([SHOW, act.reveal('a')])

    select.observe({ shown: true }).send(key.arrowDown).send(key.with(key.arrowUp, mod.alt))
    expect(select.state.value).toBe('c')
    expect(select.state.open).toBe(false)
    expect(select.actions).toEqual([HIDE])
  })

  it('moves the active option by ten with PageDown and PageUp and stops at the ends', () => {
    const items = Array.from({ length: 15 }, (_, index): ListboxEntry => ({ key: `item${index}`, data: { value: index, label: `Item ${index}` } }))
    const select = simulate(selectWidget, { ...base, items })

    select.send(key.arrowDown).observe({ shown: true })
    expect(select.state.active).toBe('item0')

    select.send(key.pageDown)
    expect(select.state.active).toBe('item10')

    select.send(key.pageDown)
    expect(select.state.active).toBe('item14')

    select.send(key.pageUp)
    expect(select.state.active).toBe('item4')

    select.send(key.pageUp)
    expect(select.state.active).toBe('item0')
  })

  it('opens and closes from the combobox by pointer', () => {
    const select = simulate(selectWidget, base)

    select.send(pointer.down, { part: COMBOBOX })
    expect(select.state.open).toBe(true)
    expect(select.actions).toEqual([act.focusPart(COMBOBOX), SHOW, act.reveal('a')])

    select.observe({ shown: true }).send(pointer.down, { part: COMBOBOX })
    expect(select.state.open).toBe(false)
    expect(select.actions).toEqual([HIDE, act.focusPart(COMBOBOX)])
  })

  it('shows and hides the popover when the parent changes open', () => {
    const onChangeOpen = vi.fn()
    const select = simulate(selectWidget, { ...base, open: true, onChangeOpen })

    select.send(lifecycle.connect)
    expect(select.actions).toEqual([SHOW])

    select.observe({ shown: true }).setOptions({ ...base, open: false, onChangeOpen })
    expect(select.actions).toEqual([HIDE])

    select.observe({ shown: false }).setOptions({ ...base, open: false, onChangeOpen })
    expect(select.actions).toEqual([])

    select.setOptions({ ...base, open: true, onChangeOpen })
    expect(select.actions).toEqual([SHOW])
    expect(onChangeOpen).not.toHaveBeenCalled()
  })

  it('follows the browser when it toggles the popover', () => {
    const onChangeOpen = vi.fn()
    const select = simulate(selectWidget, { ...base, defaultValue: 'd', onChangeOpen })

    select.observe({ shown: true }).send(browser.toggle, { to: true })
    expect(select.state.open).toBe(true)
    expect(select.state.active).toBe('d')
    expect(select.actions).toEqual([act.reveal('d')])
    expect(onChangeOpen).toHaveBeenLastCalledWith(true)

    select.observe({ shown: false }).send(browser.toggle, { to: false })
    expect(select.state.open).toBe(false)
    expect(select.state.active).toBeNull()
    expect(onChangeOpen).toHaveBeenLastCalledWith(false)
  })

  it('leaves a controlled list closed after the browser dismissed it', () => {
    const onChangeOpen = vi.fn()
    const select = simulate(selectWidget, { ...base, open: true, onChangeOpen })

    select.observe({ shown: false }).send(browser.toggle, { to: false })
    expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(false)

    select.setOptions({ ...base, open: true, onChangeOpen })
    expect(select.actions).toEqual([])
  })

  it('opens by typing and picks the typed option on Tab', () => {
    const select = simulate(selectWidget, base)

    select.type('d')
    expect(select.state.open).toBe(true)
    expect(select.state.active).toBe('d')
    expect(select.actions[0]).toEqual(SHOW)

    select.observe({ shown: true }).send(key.tab)
    expect(select.state.value).toBe('d')
    expect(select.state.open).toBe(false)
    expect(select.answer).toBe('keep')
    expect(select.actions).toEqual([HIDE])
  })

  it('keeps the value on Tab when the keyboard did not move the active option', () => {
    for (const before of [[], [key.arrowUp]]) {
      const select = simulate(selectWidget, base).send(key.arrowDown).observe({ shown: true })

      for (const input of before) select.send(input)
      select.send(key.tab)

      expect(select.state.value).toBeNull()
      expect(select.state.open).toBe(false)
      expect(select.answer).toBe('keep')
      expect(select.actions).toEqual([HIDE])
    }
  })

  it('searches the labels from their start, ignoring case, opening a closed list without picking', () => {
    const onChangeValue = vi.fn()
    const select = simulate(selectWidget, { ...base, items: cities, onChangeValue })

    select.type('S')
    expect(select.state.open).toBe(true)

    select.observe({ shown: true }).type('AI')
    expect(select.state.active).toBe('spb')

    select.send(timer(TYPEAHEAD)).type('nov')
    expect(select.state.active).toBe('nsk')
    expect(select.state.value).toBeNull()

    const middle = simulate(selectWidget, { ...base, items: cities, onChangeValue }).send(pointer.down, { part: COMBOBOX }).observe({ shown: true })
    middle.type('peter')
    expect(middle.state.active).toBe('moscow')

    expect(onChangeValue).not.toHaveBeenCalled()
  })

  it('cycles among the options starting with a repeated letter, skips disabled ones and starts a new search once the timer fires', () => {
    const words: readonly ListboxEntry[] = [
      { key: 'alpha', data: { value: 'alpha', label: 'Alpha' } },
      { key: 'avocado', data: { value: 'avocado', label: 'Avocado' } },
      { key: 'beta', data: { value: 'beta', label: 'Beta', disabled: true } },
      { key: 'bravo', data: { value: 'bravo', label: 'Bravo' } },
    ]
    const select = simulate(selectWidget, { ...base, items: words })

    select.type('a')
    expect(select.state.active).toBe('alpha')

    select.observe({ shown: true }).type('a')
    expect(select.state.active).toBe('avocado')

    select.type('a')
    expect(select.state.active).toBe('alpha')

    select.type('b')
    expect(select.state.active).toBe('alpha')

    select.send(timer(TYPEAHEAD)).type('b')
    expect(select.state.active).toBe('bravo')
  })

  it('picks a typed option with a falsy value', () => {
    const onChangeValue = vi.fn()
    const numbers: readonly ListboxEntry[] = [{ key: 'zero', data: { value: 0, label: 'Zero' } }, { key: 'one', data: { value: 1, label: 'One' } }]
    const select = simulate(selectWidget, { ...base, items: numbers, onChangeValue })

    select.type('z').observe({ shown: true }).send(key.enter)

    expect(onChangeValue).toHaveBeenCalledExactlyOnceWith(0)
  })

  it('restores the default value on a form reset, but leaves a value the parent controls to the parent', () => {
    const select = simulate(selectWidget, { ...base, defaultValue: 'c' })

    select.send(key.arrowDown).observe({ shown: true }).pressAt('a').send(browser.reset)
    expect(select.state.value).toBe('c')

    const controlled = simulate(selectWidget, { ...base, value: 'c' })
    controlled.send(key.arrowDown).observe({ shown: true }).pressAt('a').send(browser.reset)
    expect(controlled.state.value).toBe('a')
  })
})

describe('Edge Cases', () => {
  it('points the active descendant only at an option that exists, while the parent controls an active key the list lacks', () => {
    const select = simulate(selectWidget, { ...base, open: true, active: 'gone' }).send(lifecycle.connect).observe({ shown: true })
    expect(renderPart(selectWidget.output.combobox, select.state, undefined as never).attrs['aria-activedescendant']).toBeUndefined()

    select.setOptions({ ...base, open: true, active: 'c' })
    expect(renderPart(selectWidget.output.combobox, select.state, undefined as never).attrs['aria-activedescendant']).toBeDefined()
  })

  it('keeps a list the browser closed hidden when the parent keeps open and changes another option', () => {
    const onChangeOpen = vi.fn()
    const select = simulate(selectWidget, { ...base, open: true, onChangeOpen }).send(lifecycle.connect).observe({ shown: true })

    select.send(browser.toggle, { to: false }).observe({ shown: false })
    expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(false)

    select.setOptions({ ...base, open: true, value: 'c', onChangeOpen })
    expect(select.actions).toEqual([])

    select.setOptions({ ...base, open: false, value: 'c', onChangeOpen }).setOptions({ ...base, open: true, value: 'c', onChangeOpen })
    expect(select.actions).toEqual([SHOW])
  })

  it('drops the typed letters once the timer fires, even after the select became disabled or read-only', () => {
    for (const blocked of [{ disabled: true }, { readOnly: true }]) {
      const select = simulate(selectWidget, base)
      select.type('g')

      select.setOptions({ ...base, ...blocked })
      select.send(timer(TYPEAHEAD))
      expect(select.state.typed).toBe('')
    }
  })

  it('does not open while disabled or read-only', () => {
    for (const options of [{ disabled: true }, { readOnly: true }]) {
      const select = simulate(selectWidget, { ...base, ...options })

      select.send(key.arrowDown).send(pointer.down, { part: COMBOBOX }).type('d')

      expect(select.state.open).toBe(false)
      expect(select.actions).toEqual([])
      expect(simulate(selectWidget, { ...base, ...options, defaultOpen: true }).send(lifecycle.connect).actions).toEqual([])
    }
  })

  it('stays closed when typing matches nothing', () => {
    const select = simulate(selectWidget, base)

    select.type('z')

    expect(select.state.open).toBe(false)
    expect(select.actions).not.toContainEqual(SHOW)
  })

  it('selects no option with an empty value while the value is empty', () => {
    const select = simulate(selectWidget, { ...base, items: [{ key: 'any', data: { value: '', label: 'Any' } }, ...letters] })

    expect(isSelected(select.state, 'any')).toBe(false)
  })

  it('hides the open list when disabled, like a native select, and follows the browser closing it', () => {
    const onChangeOpen = vi.fn()
    const select = simulate(selectWidget, { ...base, onChangeOpen })

    select.send(key.arrowDown).observe({ shown: true }).setOptions({ ...base, disabled: true, onChangeOpen })
    expect(select.actions).toEqual([HIDE])

    select.observe({ shown: false }).send(browser.toggle, { to: false })
    expect(select.state.open).toBe(false)
    expect(onChangeOpen).toHaveBeenLastCalledWith(false)

    select.setOptions({ ...base, onChangeOpen })
    expect(select.actions).toEqual([])

    const controlled = simulate(selectWidget, { ...base, open: true }).send(lifecycle.connect).observe({ shown: true })
    controlled.setOptions({ ...base, readOnly: true, open: false })
    expect(controlled.actions).toEqual([HIDE])
  })

  it('closes without picking when the focus leaves', () => {
    const select = simulate(selectWidget, base)

    select.send(key.arrowDown).observe({ shown: true }).send(key.arrowDown)
    expect(select.state.active).toBe('c')

    select.send(focus.leave)
    expect(select.state.value).toBeNull()
    expect(select.actions).toEqual([HIDE])
  })

  it('forgets the typed letters when the focus leaves the open list, so the next search starts anew', () => {
    const select = simulate(selectWidget, { ...base, items: cities })

    select.type('n').observe({ shown: true }).send(focus.leave)
    expect(select.state.typed).toBe('')

    select.observe({ shown: false }).send(focus.enter).type('m')
    expect(select.state.active).toBe('moscow')
  })
})
