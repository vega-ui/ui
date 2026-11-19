import { describe, expect, it, vi } from 'vitest'
import { act, focus, key, pointer } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { ToggleGroupEntry, toggleGroupWidget } from '../widget'

const items = (keys: readonly string[], disabled: readonly string[] = []): readonly ToggleGroupEntry[] =>
  keys.map((value) => ({ key: value, data: { disabled: disabled.includes(value) } }))

type GroupState = Parameters<typeof toggleGroupWidget.output.item.select>[0]

const itemOf = (state: GroupState, value: string) => toggleGroupWidget.output.item.render(toggleGroupWidget.output.item.select(state, value) as never)

const tabStops = (state: GroupState, keys: readonly string[]) => keys.filter((value) => itemOf(state, value).tabIndex === 0)

const alignments = ['left', 'center', 'right']

describe('Critical User Paths', () => {
  it('checks one item on a press and keeps it checked on a second press, as a radio does', () => {
    const onChangeValue = vi.fn()
    const widget = simulate(toggleGroupWidget, { items: items(alignments), defaultValue: 'left', onChangeValue })

    widget.send(pointer.press, { key: 'center' })
    expect(widget.state.value).toBe('center')
    expect(onChangeValue).toHaveBeenLastCalledWith('center')

    widget.send(pointer.press, { key: 'center' })
    expect(widget.state.value).toBe('center')
    expect(onChangeValue).toHaveBeenCalledTimes(1)
  })

  it('turns each item on and off by itself with multiple', () => {
    const onChangeValue = vi.fn()
    const widget = simulate(toggleGroupWidget, { items: items(['bold', 'italic', 'underline']), multiple: true, onChangeValue })

    widget.send(pointer.press, { key: 'italic' }).send(pointer.press, { key: 'bold' })
    expect(onChangeValue).toHaveBeenLastCalledWith(['italic', 'bold'])

    widget.send(pointer.press, { key: 'italic' })
    expect(onChangeValue).toHaveBeenLastCalledWith(['bold'])
  })

  it('moves the focus with the arrows of both axes, wrapping around the ends, without checking an item', () => {
    const widget = simulate(toggleGroupWidget, { items: items(alignments), defaultValue: 'left' })

    widget.send(key.arrowRight, { key: 'left' })
    expect(widget.actions).toEqual([act.focus('center')])
    widget.send(key.arrowDown, { key: 'center' })
    expect(widget.actions).toEqual([act.focus('right')])
    widget.send(key.arrowDown, { key: 'right' })
    expect(widget.actions).toEqual([act.focus('left')])
    widget.send(key.arrowUp, { key: 'left' })
    expect(widget.actions).toEqual([act.focus('right')])
    expect(widget.state.value).toBe('left')
  })

  it('keeps one tab stop on the checked item, or the first one, and goes back to it once the focus leaves', () => {
    const widget = simulate(toggleGroupWidget, { items: items(alignments), defaultValue: 'center' })
    expect(tabStops(widget.state, alignments)).toEqual(['center'])

    widget.send(key.arrowRight, { key: 'center' })
    expect(tabStops(widget.state, alignments)).toEqual(['right'])

    widget.send(focus.leave)
    expect(tabStops(widget.state, alignments)).toEqual(['center'])

    const empty = simulate(toggleGroupWidget, { items: items(alignments) })
    expect(tabStops(empty.state, alignments)).toEqual(['left'])
  })
})

describe('Edge Cases', () => {
  it('moves the arrows from the item that took the focus some other way, like a script or assistive technology', () => {
    const widget = simulate(toggleGroupWidget, { items: items(alignments), defaultValue: 'left' })

    widget.send(focus.enter, { key: 'center' }).send(key.arrowRight, { key: 'center' })
    expect(widget.actions).toEqual([act.focus('right')])
  })

  it('neither checks nor reaches a disabled item', () => {
    const widget = simulate(toggleGroupWidget, { items: items(alignments, ['center']), defaultValue: 'left' })

    widget.send(pointer.press, { key: 'center' })
    expect(widget.state.value).toBe('left')

    widget.send(key.arrowRight, { key: 'left' })
    expect(widget.actions).toEqual([act.focus('right')])
  })

  it('leaves the arrows and the tab stop to the toolbar around it without roving focus', () => {
    const widget = simulate(toggleGroupWidget, { items: items(alignments), defaultValue: 'left', rovingFocus: false })

    expect(widget.send(focus.enter, { key: 'center' }).answer).toBe('pass')

    widget.send(key.arrowRight, { key: 'left' })
    expect(widget.answer).toBe('pass')
    expect(itemOf(widget.state, 'left').tabIndex).toBeUndefined()

    widget.send(pointer.press, { key: 'right' })
    expect(widget.state.value).toBe('right')
  })
})

describe('Accessibility', () => {
  it('is a radio group of radios with one choice and a group of pressed buttons with multiple', () => {
    const single = simulate(toggleGroupWidget, { items: items(alignments), defaultValue: 'left' })
    expect(toggleGroupWidget.output.root.render(toggleGroupWidget.output.root.select(single.state) as never)).toEqual({ role: 'radiogroup' })
    expect(itemOf(single.state, 'left')).toMatchObject({ role: 'radio', 'aria-checked': true })
    expect(itemOf(single.state, 'right')).toMatchObject({ role: 'radio', 'aria-checked': false })

    const multiple = simulate(toggleGroupWidget, { items: items(['bold']), multiple: true, defaultValue: ['bold'] })
    expect(toggleGroupWidget.output.root.render(toggleGroupWidget.output.root.select(multiple.state) as never)).toEqual({ role: 'group' })
    expect(itemOf(multiple.state, 'bold')).toMatchObject({ 'aria-pressed': true })
    expect(itemOf(multiple.state, 'bold').role).toBeUndefined()
  })
})
