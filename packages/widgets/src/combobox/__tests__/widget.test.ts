import { describe, expect, it, vi } from 'vitest'
import { act, browser, focus, key, lifecycle, mod, nav, pointer, renderPart, text } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { ListboxEntry } from '../../listbox'
import { comboboxWidget, INPUT, LISTBOX, TRIGGER } from '../widget'

const fruits: readonly ListboxEntry[] = [
  { key: 'a', data: { value: 'apple', label: 'Apple' } },
  { key: 'b', data: { value: 'banana', label: 'Banana', disabled: true } },
  { key: 'c', data: { value: 'cherry', label: 'Cherry' } },
  { key: 'd', data: { value: 'date', label: 'Date' } },
]

const base = { items: fruits, disabled: false, readOnly: false, autocomplete: 'list' as const }

const both = { ...base, autocomplete: 'both' as const }

const SHOW = act.showPopover(LISTBOX)
const HIDE = act.hidePopover(LISTBOX)

const typed = (value: string) => ({ part: INPUT, value })

const inField = (value: string) => ({ field: { value, selection: [value.length, value.length] as const } })

const typedChar = (value: string) => ({ part: INPUT, ...inField(value) })

const inserted = { part: INPUT, edit: { type: 'insertText', data: 'x' } }

const inputAttrs = (combobox: ReturnType<typeof simulate<typeof comboboxWidget.shape>>) => renderPart(comboboxWidget.output.input, combobox.state, undefined as never).attrs

describe('Critical User Paths', () => {
  it('opens on typing without an active option, then ArrowDown and Enter pick an option and write its label', () => {
    const onChangeValue = vi.fn()
    const combobox = simulate(comboboxWidget, { ...base, onChangeValue })

    combobox.send(text.change, typed('a'))
    expect(combobox.state.open).toBe(true)
    expect(combobox.state.active).toBeNull()
    expect(combobox.actions).toEqual([SHOW])

    combobox.observe({ shown: true }).send(key.arrowDown)
    expect(combobox.state.active).toBe('a')
    expect(combobox.actions).toEqual([act.reveal('a')])

    combobox.send(key.enter)
    expect(combobox.answer).toBe('handled')
    expect(combobox.state.value).toBe('apple')
    expect(combobox.state.open).toBe(false)
    expect(combobox.state.active).toBeNull()
    expect(combobox.actions).toEqual([act.setText(INPUT, 'Apple', [5, 5]), HIDE])
    expect(onChangeValue).toHaveBeenCalledExactlyOnceWith('apple')
  })

  it('opens a closed list on ArrowDown at the first option, on ArrowUp at the last and on Alt+ArrowDown without an active one', () => {
    expect(simulate(comboboxWidget, base).send(key.arrowDown).state.active).toBe('a')
    expect(simulate(comboboxWidget, base).send(key.arrowUp).state.active).toBe('d')

    const combobox = simulate(comboboxWidget, base).send(key.with(nav.forward, mod.alt))
    expect(combobox.state.open).toBe(true)
    expect(combobox.state.active).toBeNull()
    expect(combobox.actions).toEqual([SHOW])
  })

  it('picks an option with the pointer, never a disabled one', () => {
    const combobox = simulate(comboboxWidget, base).send(text.change, typed('')).observe({ shown: true })

    combobox.pressAt('b')
    expect(combobox.state.value).toBeNull()

    combobox.pressAt('d')
    expect(combobox.state.value).toBe('date')
    expect(combobox.state.open).toBe(false)
    expect(combobox.actions).toEqual([act.setText(INPUT, 'Date', [4, 4]), HIDE])
  })

  it('moves the active option in the open list, skips disabled options and stops at the ends', () => {
    const combobox = simulate(comboboxWidget, base).send(key.arrowDown).observe({ shown: true })

    combobox.send(key.arrowDown)
    expect(combobox.state.active).toBe('c')

    combobox.send(key.arrowDown).send(key.arrowDown)
    expect(combobox.state.active).toBe('d')

    combobox.send(key.arrowUp).send(key.arrowUp).send(key.arrowUp)
    expect(combobox.state.active).toBe('a')
  })

  it('closes on Escape, then clears the text and the value on a second Escape', () => {
    const onChangeValue = vi.fn()
    const combobox = simulate(comboboxWidget, { ...base, defaultValue: 'apple', onChangeValue }).send(key.arrowDown).observe({ shown: true })

    combobox.send(key.escape, inField('Apple'))
    expect(combobox.answer).toBe('handled')
    expect(combobox.state.open).toBe(false)
    expect(combobox.state.value).toBe('apple')
    expect(combobox.actions).toEqual([HIDE])

    combobox.observe({ shown: false }).send(key.escape, inField('Apple'))
    expect(combobox.answer).toBe('handled')
    expect(combobox.state.value).toBeNull()
    expect(combobox.actions).toEqual([act.setText(INPUT, '')])
    expect(onChangeValue).toHaveBeenCalledExactlyOnceWith(null)
  })

  it('completes the typed text with the first matching option, its rest selected, and picks it on Enter', () => {
    const combobox = simulate(comboboxWidget, both).send(text.edit, inserted).send(text.change, typedChar('ch'))

    expect(combobox.state.active).toBe('c')
    expect(combobox.actions).toEqual([act.setText(INPUT, 'Cherry', [2, 6]), SHOW, act.reveal('c')])

    combobox.observe({ shown: true }).send(key.enter)
    expect(combobox.state.value).toBe('cherry')
    expect(combobox.actions).toEqual([act.setText(INPUT, 'Cherry', [6, 6]), HIDE])
  })

  it('completes inline without opening the list, accepts the completion on Enter and puts the typed text back on Escape', () => {
    const inline = { ...base, autocomplete: 'inline' as const }
    const accepted = simulate(comboboxWidget, inline).send(text.edit, inserted).send(text.change, typedChar('ch'))

    expect(accepted.state.open).toBe(false)
    expect(accepted.actions).toEqual([act.setText(INPUT, 'Cherry', [2, 6])])

    accepted.send(key.enter)
    expect(accepted.answer).toBe('handled')
    expect(accepted.state.value).toBe('cherry')
    expect(accepted.actions).toEqual([act.setText(INPUT, 'Cherry', [6, 6])])

    const escaped = simulate(comboboxWidget, inline).send(text.edit, inserted).send(text.change, typedChar('ch')).send(key.escape)
    expect(escaped.answer).toBe('handled')
    expect(escaped.state.active).toBeNull()
    expect(escaped.actions).toEqual([act.setText(INPUT, 'ch')])
  })

  it('writes the label of the option the arrows reach, the typed text kept and the rest selected', () => {
    const combobox = simulate(comboboxWidget, both).send(key.arrowDown, inField(''))
    expect(combobox.actions).toEqual([act.setText(INPUT, 'Apple', [0, 5]), SHOW, act.reveal('a')])

    combobox.observe({ shown: true }).send(key.arrowDown, inField('Apple'))
    expect(combobox.actions).toEqual([act.setText(INPUT, 'Cherry', [0, 6]), act.reveal('c')])

    combobox.send(key.escape)
    expect(combobox.actions).toEqual([act.setText(INPUT, ''), HIDE])

    const typedA = simulate(comboboxWidget, both).send(text.edit, inserted).send(text.change, typedChar('a')).observe({ shown: true }).send(key.arrowDown)
    expect(typedA.state.active).toBe('c')
    expect(typedA.actions).toEqual([act.reveal('c')])

    const selectedRest = simulate(comboboxWidget, both).send(key.arrowDown, { field: { value: 'Apple', selection: [1, 5] as const } })
    expect(selectedRest.actions[0]).toEqual(act.setText(INPUT, 'Apple', [1, 5]))

    const listed = simulate(comboboxWidget, base).send(key.arrowDown, inField(''))
    expect(listed.actions).toEqual([SHOW, act.reveal('a')])
  })

  it('scrolls to the picked option without making it active when the trigger or Alt+ArrowDown opens the list', () => {
    for (const opening of [{ input: pointer.press, payload: { part: TRIGGER } }, { input: key.with(nav.forward, mod.alt), payload: {} }]) {
      const combobox = simulate(comboboxWidget, { ...base, defaultValue: 'cherry' }).send(opening.input, opening.payload)
      expect(combobox.state.active).toBeNull()
      expect(combobox.actions).toContainEqual(act.reveal('c'))
    }
  })

  it('opens and closes the list from the trigger and keeps the focus in the input', () => {
    const combobox = simulate(comboboxWidget, base).send(pointer.press, { part: TRIGGER })

    expect(combobox.state.open).toBe(true)
    expect(combobox.state.active).toBeNull()
    expect(combobox.actions).toEqual([act.focusPart(INPUT), SHOW])

    combobox.observe({ shown: true }).send(pointer.press, { part: TRIGGER })
    expect(combobox.state.open).toBe(false)
    expect(combobox.actions).toEqual([act.focusPart(INPUT), HIDE])
  })

  it('closes when the focus leaves without picking', () => {
    const combobox = simulate(comboboxWidget, base).send(key.arrowDown).observe({ shown: true }).send(focus.leave)

    expect(combobox.state.open).toBe(false)
    expect(combobox.state.value).toBeNull()
    expect(combobox.actions).toEqual([HIDE])
  })
})

describe('Edge Cases', () => {
  it('drops the picked value when the text is edited', () => {
    const onChangeValue = vi.fn()
    const combobox = simulate(comboboxWidget, { ...base, defaultValue: 'apple', onChangeValue })

    combobox.send(text.change, typed('Appl'))
    expect(combobox.state.value).toBeNull()
    expect(onChangeValue).toHaveBeenCalledExactlyOnceWith(null)
  })

  it('returns to the text without closing on a key left to the input or a press in it', () => {
    for (const edit of [text.key, pointer.down]) {
      const combobox = simulate(comboboxWidget, base).send(key.arrowDown).observe({ shown: true })

      combobox.send(edit, { part: INPUT })
      expect(combobox.state.active).toBeNull()
      expect(combobox.state.open).toBe(true)
      expect(combobox.actions).toEqual([])
    }
  })

  it('does not complete a deletion, a list that only filters, or text no option starts with', () => {
    const deleted = simulate(comboboxWidget, both).send(text.edit, { part: INPUT, edit: { type: 'deleteContentBackward', data: null } }).send(text.change, typedChar('ch'))
    expect(deleted.state.active).toBeNull()

    const listed = simulate(comboboxWidget, base).send(text.edit, inserted).send(text.change, typedChar('ch'))
    expect(listed.state.active).toBeNull()

    const unmatched = simulate(comboboxWidget, both).send(text.edit, inserted).send(text.change, typedChar('ban'))
    expect(unmatched.state.active).toBeNull()
    expect(unmatched.actions).toEqual([SHOW])
  })

  it('completes with the options the app filters after the text changed, only once and not after a move', () => {
    const combobox = simulate(comboboxWidget, { ...both, items: [] }).send(text.edit, inserted).send(text.change, typedChar('ch'))
    expect(combobox.state.active).toBeNull()

    combobox.setOptions({ ...both })
    expect(combobox.state.active).toBe('c')
    expect(combobox.actions).toEqual([act.setText(INPUT, 'Cherry', [2, 6]), SHOW, act.reveal('c')])

    combobox.setOptions({ ...both, items: [{ key: 'e', data: { value: 'chestnut', label: 'Chestnut' } }, ...fruits] })
    expect(combobox.state.active).toBe('c')

    const moved = simulate(comboboxWidget, both).send(text.edit, inserted).send(text.change, typedChar('a')).observe({ shown: true }).send(key.arrowDown)
    moved.setOptions({ ...both, items: [...fruits] })
    expect(moved.state.active).toBe('c')
  })

  it('puts the typed text back on Escape and keeps the completion when the focus leaves', () => {
    const escaped = simulate(comboboxWidget, both).send(text.edit, inserted).send(text.change, typedChar('ch')).observe({ shown: true }).send(key.escape)
    expect(escaped.state.value).toBeNull()
    expect(escaped.actions).toEqual([act.setText(INPUT, 'ch'), HIDE])

    const left = simulate(comboboxWidget, both).send(text.edit, inserted).send(text.change, typedChar('ch')).observe({ shown: true }).send(focus.leave)
    expect(left.state.value).toBe('cherry')
    expect(left.state.open).toBe(false)
  })

  it('picks the active option on Alt+ArrowUp and only closes without one', () => {
    const picked = simulate(comboboxWidget, base).send(key.arrowDown).observe({ shown: true }).send(key.with(nav.backward, mod.alt))
    expect(picked.state.value).toBe('apple')
    expect(picked.state.open).toBe(false)

    const closed = simulate(comboboxWidget, base).send(key.with(nav.forward, mod.alt)).observe({ shown: true }).send(key.with(nav.backward, mod.alt))
    expect(closed.state.value).toBeNull()
    expect(closed.state.open).toBe(false)
    expect(closed.actions).toEqual([HIDE])
  })

  it('leaves Enter to the form when no option is active', () => {
    const combobox = simulate(comboboxWidget, base).send(text.change, typed('a')).observe({ shown: true }).send(key.enter)

    expect(combobox.answer).toBe('pass')
    expect(combobox.state.open).toBe(true)
  })

  it('leaves Escape to the page when the text and the value are empty', () => {
    const combobox = simulate(comboboxWidget, base).send(key.escape, inField(''))

    expect(combobox.answer).toBe('pass')
  })

  it('hides the list while it has no options and shows it again when options arrive', () => {
    const combobox = simulate(comboboxWidget, { ...base, items: [] }).send(text.change, typed('x'))
    expect(combobox.state.open).toBe(true)
    expect(combobox.actions).toEqual([])

    combobox.setOptions({ ...base })
    expect(combobox.actions).toEqual([SHOW])

    combobox.observe({ shown: true }).setOptions({ ...base, items: [] })
    expect(combobox.actions).toEqual([HIDE])
  })

  it('does not show options that arrive after the focus left', () => {
    const combobox = simulate(comboboxWidget, { ...base, items: [] }).send(text.change, typed('x')).send(focus.leave)

    combobox.setOptions({ ...base })
    expect(combobox.state.open).toBe(false)
    expect(combobox.actions).toEqual([])
  })

  it('ignores the keyboard and typing while disabled or read-only', () => {
    for (const blocked of [{ disabled: true }, { readOnly: true }]) {
      const combobox = simulate(comboboxWidget, { ...base, ...blocked }).send(key.arrowDown).send(text.change, typed('a'))

      expect(combobox.state.open).toBe(false)
      expect(combobox.actions).toEqual([])
    }
  })

  it('restores the default value on form reset', () => {
    const combobox = simulate(comboboxWidget, { ...base, defaultValue: 'cherry' }).send(text.change, typed('x'))

    combobox.send(browser.reset)
    expect(combobox.state.value).toBe('cherry')
  })

  it('shows a list the parent opens once it has options', () => {
    const combobox = simulate(comboboxWidget, { ...base, open: true }).send(lifecycle.connect)

    expect(combobox.actions).toEqual([SHOW])
  })
})

describe('Accessibility', () => {
  it('marks the input as a list-autocomplete combobox that points at the active option only while the list is shown', () => {
    const combobox = simulate(comboboxWidget, base)
    expect(inputAttrs(combobox)).toMatchObject({ role: 'combobox', 'aria-autocomplete': 'list', 'aria-expanded': false, 'aria-activedescendant': undefined })

    combobox.send(key.arrowDown).observe({ shown: true })
    expect(inputAttrs(combobox)).toMatchObject({ 'aria-expanded': true, 'aria-activedescendant': expect.any(String) })

    combobox.send(text.key, { part: INPUT })
    expect(inputAttrs(combobox)['aria-activedescendant']).toBeUndefined()
  })

  it('marks the active option as selected, and the picked one while none is active', () => {
    const combobox = simulate(comboboxWidget, { ...base, defaultValue: 'date' })
    const selected = () => fruits.filter((fruit) => renderPart(comboboxWidget.output.option, combobox.state, fruit.key).attrs['aria-selected']).map((fruit) => fruit.key)

    expect(selected()).toEqual(['d'])

    combobox.send(key.arrowDown).observe({ shown: true })
    expect(selected()).toEqual(['a'])
  })

  it('keeps the list and the trigger out of the tab order and tells the mode of completion', () => {
    const combobox = simulate(comboboxWidget, both)

    expect(inputAttrs(combobox)['aria-autocomplete']).toBe('both')
    expect(renderPart(comboboxWidget.output.listbox, combobox.state, undefined as never).attrs.tabIndex).toBe(-1)
    expect(renderPart(comboboxWidget.output.trigger, combobox.state, undefined as never).attrs).toMatchObject({ tabIndex: -1, 'aria-expanded': false, 'aria-controls': expect.any(String) })
  })
})
