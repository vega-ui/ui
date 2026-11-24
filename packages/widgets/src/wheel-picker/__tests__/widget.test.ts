import { describe, expect, it, vi } from 'vitest'
import { act, createInput, key, lifecycle, nav, pointer, ROOT, timer, TYPEAHEAD } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { SNAP_TO } from '../../snap-scroller'
import { getInitialIndex, SETTLE, WheelPickerEntry, wheelPickerWidget } from '../widget'

type WheelPickerOptions = Parameters<typeof simulate<typeof wheelPickerWidget.shape>>[1]

const itemsOf = (labels: readonly string[], disabled: readonly string[] = []): readonly WheelPickerEntry[] =>
  labels.map((label, position) => ({ key: position, data: { value: label, label, disabled: disabled.includes(label) } }))

const minutes = itemsOf(Array.from({ length: 60 }, (_, minute) => String(minute).padStart(2, '0')))

const days = (count: number) => itemsOf(Array.from({ length: count }, (_, day) => String(day + 1)))

const options = (overrides: Partial<WheelPickerOptions> = {}): WheelPickerOptions => ({
  items: minutes,
  loop: false,
  page: 5,
  scrollTimeline: true,
  disabled: false,
  readOnly: false,
  ...overrides,
})

const simulateWheel = (overrides: Partial<WheelPickerOptions> = {}) => simulate(wheelPickerWidget, options(overrides), { orientation: 'horizontal' }).send(lifecycle.connect)

const rootOf = (wheel: ReturnType<typeof simulateWheel>) => wheelPickerWidget.output.root.render(wheelPickerWidget.output.root.select(wheel.state, undefined as never))

const settle = (index: number) => createInput(SETTLE, { key: index })

const turn = (index: number, smooth: boolean) => act.send(ROOT, SNAP_TO, { key: index, value: smooth ? 'animated' : 'instant' })

describe('Critical User Paths', () => {
  it('is a spinbutton whose value text is the selected option, the first enabled one without a value', () => {
    expect(rootOf(simulateWheel({ defaultValue: '30' }))).toMatchObject({ role: 'spinbutton', 'aria-valuenow': 30, 'aria-valuemin': 0, 'aria-valuemax': 59, 'aria-valuetext': '30' })
    expect(rootOf(simulateWheel({ items: itemsOf(['a', 'b', 'c'], ['a']) }))).toMatchObject({ 'aria-valuenow': 1, 'aria-valuetext': 'b' })
  })

  it('reports the option the column settles at', () => {
    const onChangeValue = vi.fn()
    const wheel = simulateWheel({ defaultValue: '30', onChangeValue })

    wheel.send(settle(42))

    expect(onChangeValue).toHaveBeenLastCalledWith('42')
    expect(rootOf(wheel)).toMatchObject({ 'aria-valuetext': '42' })
  })

  it('steps to the next option on ArrowUp and the previous one on ArrowDown at once, and scrolls there smoothly', () => {
    const onChangeValue = vi.fn()
    const wheel = simulateWheel({ defaultValue: '30', onChangeValue })

    wheel.send(key.arrowUp)
    expect(onChangeValue).toHaveBeenLastCalledWith('31')
    expect(wheel.actions).toEqual([turn(31, true)])

    wheel.send(key.arrowDown).send(key.arrowDown)
    expect(onChangeValue).toHaveBeenLastCalledWith('29')
    expect(wheel.actions).toEqual([turn(29, true)])
  })

  it('goes on past the last option to the first one in a looped column, on the index after the last one', () => {
    const onChangeValue = vi.fn()
    const wheel = simulateWheel({ loop: true, defaultValue: '59', onChangeValue })

    wheel.send(key.arrowUp)

    expect(onChangeValue).toHaveBeenLastCalledWith('00')
    expect(wheel.actions).toEqual([turn(60, true)])
  })
})

describe('Edge Cases', () => {
  it('drives the center of the cylinder by the scroll over every row where the browser has no scroll timelines', () => {
    expect(simulateWheel({ loop: true, defaultValue: '30' }).actions).not.toContainEqual(expect.objectContaining({ type: 'scrubWithScroll' }))
    expect(simulateWheel({ loop: true, defaultValue: '30', scrollTimeline: false }).actions).toContainEqual(act.scrubWithScroll(ROOT, { keyframes: [{ '--wheel-picker-center': 2 }, { '--wheel-picker-center': 87 }] }))
    expect(simulateWheel({ defaultValue: '30', scrollTimeline: false }).actions).toContainEqual(act.scrubWithScroll(ROOT, { keyframes: [{ '--wheel-picker-center': 0 }, { '--wheel-picker-center': 59 }] }))
  })

  it('stops at the first and the last option without loop', () => {
    const wheel = simulateWheel({ defaultValue: '59' })

    wheel.send(key.arrowUp)

    expect(wheel.actions).toEqual([])
    expect(rootOf(wheel)).toMatchObject({ 'aria-valuetext': '59' })
  })

  it('skips disabled options when stepping and moves off a disabled option the column settles at', () => {
    const items = itemsOf(['10', '11', '12', '13', '14', '15'], ['12', '13'])
    const wheel = simulateWheel({ items, defaultValue: '11' })

    wheel.send(key.arrowUp)
    expect(wheel.actions).toEqual([turn(4, true)])

    wheel.send(settle(4)).send(settle(2))
    expect(wheel.actions).toEqual([turn(1, true)])
    expect(rootOf(wheel)).toMatchObject({ 'aria-valuetext': '11' })
  })

  it('moves a page with PageUp and PageDown and to the first and the last enabled option with Home and End, the nearest of them in a loop', () => {
    const wheel = simulateWheel({ loop: true, defaultValue: '30', items: itemsOf(minutes.map((item) => item.data.label), ['00']) })

    wheel.send(nav.pageBackward)
    expect(wheel.actions).toEqual([turn(35, true)])

    wheel.send(nav.pageForward).send(nav.pageForward)
    expect(rootOf(wheel)).toMatchObject({ 'aria-valuetext': '25' })

    wheel.send(nav.first)
    expect(wheel.actions).toEqual([turn(61, false)])

    wheel.send(nav.last)
    expect(wheel.actions).toEqual([turn(59, true)])
  })

  it('selects the option whose text starts with the typed characters', () => {
    const wheel = simulateWheel({ defaultValue: '30' })

    wheel.send(key.printable, { char: '4' })
    expect(rootOf(wheel)).toMatchObject({ 'aria-valuetext': '40' })

    wheel.send(key.printable, { char: '5' })
    expect(rootOf(wheel)).toMatchObject({ 'aria-valuetext': '45' })

    wheel.send(timer(TYPEAHEAD)).send(key.printable, { char: '0' })
    expect(rootOf(wheel)).toMatchObject({ 'aria-valuetext': '00' })
  })

  it('scrolls to the value the parent changes, the nearest copy of it in a loop', () => {
    const wheel = simulate(wheelPickerWidget, options({ loop: true, value: '58' }), { orientation: 'horizontal' }).send(lifecycle.connect)

    wheel.setOptions(options({ loop: true, value: '02' }))

    expect(wheel.actions).toEqual([turn(62, true)])
  })

  it('keeps the option a key selected while the scroll it started stops on the way, until the user scrolls again', () => {
    const onChangeValue = vi.fn()
    const wheel = simulateWheel({ defaultValue: '00', onChangeValue })

    wheel.send(key.printable, { char: '4' }).send(key.printable, { char: '5' }).send(settle(40))
    expect(rootOf(wheel)).toMatchObject({ 'aria-valuetext': '45' })

    wheel.send(settle(45)).send(pointer.down, {}).send(settle(50))
    expect(onChangeValue).toHaveBeenLastCalledWith('50')

    wheel.send(key.arrowUp).send(pointer.wheel, {}).send(settle(20))
    expect(onChangeValue).toHaveBeenLastCalledWith('20')
  })

  it('takes a stop on another copy of the option a key selected as the end of its scroll in a loop, and shifts it to the copy nearest the middle', () => {
    const wheel = simulateWheel({ loop: true, defaultValue: '58' })

    wheel.send(key.arrowUp).send(key.arrowUp).send(key.arrowUp).send(settle(1))
    expect(rootOf(wheel)).toMatchObject({ 'aria-valuetext': '01' })
    expect(wheel.actions).toEqual([turn(61, false)])

    wheel.send(key.arrowUp)
    expect(wheel.actions).toEqual([turn(62, true)])
  })

  it('keeps the selected option in the band at once when a looped column gets another number of options', () => {
    const wheel = simulate(wheelPickerWidget, options({ loop: true, value: '8', items: days(31) }), { orientation: 'horizontal' }).send(lifecycle.connect)

    wheel.setOptions(options({ loop: true, value: '8', items: days(30) }))

    expect(wheel.actions).toEqual([turn(37, false)])
  })

  it('moves to the option that took the place of the removed selected one and reports it', () => {
    const onChangeValue = vi.fn()
    const wheel = simulateWheel({ items: days(31), defaultValue: '31', onChangeValue })

    wheel.setOptions(options({ items: days(30), defaultValue: '31', onChangeValue }))
    expect(wheel.actions).toEqual([turn(29, false), act.send(ROOT, SETTLE, { key: 29 })])

    wheel.send(settle(29))
    expect(onChangeValue).toHaveBeenLastCalledWith('30')
    expect(rootOf(wheel)).toMatchObject({ 'aria-valuetext': '30' })
  })

  it('scrolls to an enabled option the user presses', () => {
    const wheel = simulateWheel({ items: itemsOf(['a', 'b', 'c'], ['c']) })

    wheel.send(pointer.press, { key: 1 })
    expect(wheel.actions).toEqual([turn(1, true)])

    wheel.send(pointer.press, { key: 2 })
    expect(wheel.actions).toEqual([])
  })

  it('ignores the keys while disabled or read-only', () => {
    for (const locked of [{ disabled: true }, { readOnly: true }]) {
      const onChangeValue = vi.fn()
      simulateWheel({ ...locked, defaultValue: '30', onChangeValue }).send(key.arrowUp).send(key.printable, { char: '4' })

      expect(onChangeValue).not.toHaveBeenCalled()
    }
  })

  it('starts at the given value or the first enabled option, on the copy nearest the middle of the rows in a loop', () => {
    expect(getInitialIndex(minutes, '07', false)).toBe(7)
    expect(getInitialIndex(itemsOf(['a', 'b'], ['a']), undefined, false)).toBe(1)
    expect(getInitialIndex(minutes, '07', true)).toBe(67)
  })
})
