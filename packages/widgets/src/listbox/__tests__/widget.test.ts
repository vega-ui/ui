import { describe, expect, it, vi } from 'vitest'
import { createInput, createWidget, focus, key, mod, renderPart, SelectionMode, timer, TYPEAHEAD } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { isSelected, ListboxEntry } from '../items'
import { listboxWidget } from '../widget'

const letters: readonly ListboxEntry[] = [
  { key: 'a', data: { value: 'a', label: 'Alpha' } },
  { key: 'b', data: { value: 'b', label: 'Beta', disabled: true } },
  { key: 'c', data: { value: 'c', label: 'Gamma' } },
  { key: 'd', data: { value: 'd', label: 'Delta' } },
]

const single = { items: letters, mode: 'single' as SelectionMode, disabled: false, typeahead: true }
const multiple = { ...single, mode: 'multiple' as SelectionMode }

const fruits: readonly ListboxEntry[] = [
  { key: 'alpha', data: { value: 'alpha', label: 'Alpha' } },
  { key: 'bravo', data: { value: 'bravo', label: 'Bravo', disabled: true } },
  { key: 'avocado', data: { value: 'avocado', label: 'Avocado' } },
  { key: 'banana', data: { value: 'banana', label: 'Banana' } },
]

describe('Critical User Paths', () => {
  it('starts from the selected value when the focus enters and reveals it', () => {
    const listbox = simulate(listboxWidget, { ...single, value: 'c' })

    listbox.send(focus.enter)

    expect(listbox.state.active).toBe('c')
    expect(listbox.actions).toEqual([{ type: 'reveal', key: 'c' }])
  })

  it('selects the active option by value with Space and Enter', () => {
    const listbox = simulate(listboxWidget, single)

    listbox.send(focus.enter).send(key.space)
    expect(listbox.state.value).toBe('a')

    listbox.send(key.arrowDown).send(key.enter)
    expect(listbox.state.active).toBe('c')
    expect(listbox.state.value).toBe('c')
  })

  it('collects values in multiple mode and reports them to the parent', () => {
    const onChangeValue = vi.fn()
    const listbox = simulate(listboxWidget, { ...multiple, onChangeValue })

    listbox.send(focus.enter).send(key.space).send(key.arrowDown).send(key.space)
    expect(listbox.state.value).toEqual(['a', 'c'])
    expect(onChangeValue).toHaveBeenLastCalledWith(['a', 'c'])

    listbox.send(key.space)
    expect(listbox.state.value).toEqual(['a'])
  })

  it('keeps a controlled value until the parent updates it', () => {
    const onChangeValue = vi.fn()
    const listbox = simulate(listboxWidget, { ...single, value: 'a', onChangeValue })

    listbox.pressAt('c')
    expect(onChangeValue).toHaveBeenCalledExactlyOnceWith('c')
    expect(listbox.state.value).toBe('c')

    listbox.setOptions({ ...single, value: 'a', onChangeValue })
    expect(listbox.state.value).toBe('a')

    listbox.setOptions({ ...single, value: null, onChangeValue })
    expect(listbox.state.value).toBeNull()
    expect(isSelected(listbox.state, 'a')).toBe(false)
  })

  it('moves the active option without selecting it, skips disabled options and stops at the ends', () => {
    const onChangeValue = vi.fn()
    const listbox = simulate(listboxWidget, { ...single, items: [{ key: 'z', data: { value: 'z', label: 'Zeta', disabled: true } }, ...letters], onChangeValue })

    listbox.send(focus.enter)
    expect(listbox.state.active).toBe('a')

    listbox.send(key.arrowDown)
    expect(listbox.state.active).toBe('c')

    listbox.send(key.arrowDown).send(key.arrowDown)
    expect(listbox.state.active).toBe('d')

    listbox.send(key.arrowUp).send(key.arrowUp).send(key.arrowUp)
    expect(listbox.state.active).toBe('a')
    expect(onChangeValue).not.toHaveBeenCalled()
  })

  it('starts from the first selected option in list order in multiple mode and toggles with Space and Enter without losing the others', () => {
    const onChangeValue = vi.fn()
    const listbox = simulate(listboxWidget, { ...multiple, defaultValue: ['d', 'c'], onChangeValue })

    expect(renderPart(listboxWidget.output.root, listbox.state, undefined as never).attrs['aria-multiselectable']).toBe(true)

    listbox.send(focus.enter)
    expect(listbox.state.active).toBe('c')

    listbox.send(key.home)
    expect(onChangeValue).not.toHaveBeenCalled()

    listbox.send(key.space)
    expect(onChangeValue).toHaveBeenLastCalledWith(['d', 'c', 'a'])

    listbox.send(key.enter)
    expect(onChangeValue).toHaveBeenLastCalledWith(['d', 'c'])
  })

  it('extends the selection with Shift and the arrows, Space or Mod+End, and selects every enabled option with Mod+A', () => {
    const extended = (...inputs: Parameters<typeof key.with>[]) => {
      const listbox = simulate(listboxWidget, multiple).send(focus.enter)
      for (const [spec, ...mods] of inputs) listbox.send(key.with(spec, ...mods))
      return listbox.state
    }

    expect(extended([key.arrowDown, mod.shift])).toMatchObject({ active: 'c', value: ['c'] })
    expect(extended([key.end], [key.arrowUp, mod.shift])).toMatchObject({ active: 'c', value: ['c'] })
    expect(extended([key.space], [key.end], [key.space, mod.shift]).value).toEqual(['a', 'c', 'd'])
    expect(extended([key.arrowDown], [key.end, mod.shift, mod.mod]).value).toEqual(['c', 'd'])
    expect(extended([key.a, mod.mod]).value).toEqual(['a', 'c', 'd'])
  })

  it('finds an option by typed letters, cycles on a repeated letter, skips disabled options and starts a new search once the timer fires', () => {
    const listbox = simulate(listboxWidget, { ...single, items: fruits }).send(focus.enter)

    listbox.type('a')
    expect(listbox.state.active).toBe('avocado')

    listbox.type('a')
    expect(listbox.state.active).toBe('alpha')

    listbox.type('b')
    expect(listbox.state.active).toBe('alpha')

    listbox.send(timer(TYPEAHEAD)).type('b')
    expect(listbox.state.active).toBe('banana')
  })
})

describe('Edge Cases', () => {
  it('drops the typed letters once the timer fires, even after the list became disabled', () => {
    const listbox = simulate(listboxWidget, single).send(focus.enter)
    listbox.type('g')

    listbox.setOptions({ ...single, disabled: true })
    listbox.send(timer(TYPEAHEAD))
    expect(listbox.state.typed).toBe('')
  })

  it('marks every option sharing a value as selected', () => {
    const twins: readonly ListboxEntry[] = [...letters, { key: 'e', data: { value: 'a', label: 'Alpha again' } }]
    const listbox = simulate(listboxWidget, { ...single, items: twins, value: 'a' })

    expect(isSelected(listbox.state, 'a')).toBe(true)
    expect(isSelected(listbox.state, 'e')).toBe(true)
    expect(isSelected(listbox.state, 'c')).toBe(false)
  })

  it('ignores presses on disabled options', () => {
    const listbox = simulate(listboxWidget, single)

    listbox.pressAt('b')

    expect(listbox.state.value).toBeNull()
    expect(listbox.state.active).toBeNull()
  })

  it('does nothing while disabled', () => {
    const listbox = simulate(listboxWidget, { ...single, disabled: true })

    listbox.send(focus.enter).send(key.arrowDown).send(key.space).pressAt('a')

    expect(listbox.state.active).toBeNull()
    expect(listbox.state.value).toBeNull()
  })

  it('drops the active option once it is disabled, so Enter selects nothing', () => {
    const onChangeValue = vi.fn()
    const widget = createWidget(listboxWidget, { ...single, onChangeValue }, { id: 'listbox' })
    const withAlphaDisabled = letters.map((entry) => (entry.key === 'a' ? { ...entry, data: { ...entry.data, disabled: true } } : entry))

    widget.dispatch(createInput(focus.enter))
    expect(widget.state.active).toBe('a')

    widget.setOptions({ ...single, items: withAlphaDisabled, onChangeValue })
    widget.dispatch(createInput(key.enter))

    expect(widget.state.active).toBeNull()
    expect(onChangeValue).not.toHaveBeenCalled()
  })
})
