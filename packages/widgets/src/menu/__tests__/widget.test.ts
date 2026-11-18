import { describe, expect, it, vi } from 'vitest'
import { act, browser, focus, key, lifecycle, mod, pointer, timer, TYPEAHEAD } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { CHECK, CONTENT, MenuEntry, MenuItemData, menuCheckboxWidget, menuRadioGroupWidget, menuWidget, TRIGGER } from '../widget'

const item = (value: string, data: Partial<MenuItemData> = {}): MenuEntry => ({ key: value, data: { kind: 'item', disabled: false, label: value, ...data } })

const items = [item('copy', { label: 'Copy' }), item('cut', { label: 'Cut', disabled: true }), item('paste', { label: 'Paste' }), item('ruler', { label: 'Ruler', kind: 'checkbox' }), item('fit', { label: 'Fit', kind: 'radio', value: 'fit' })]

const HIDE = act.hidePopover(CONTENT)
const RETURN = act.focusPart(TRIGGER)

const open = (options: Partial<Parameters<typeof simulate<typeof menuWidget.shape>>[1]> = {}) => simulate(menuWidget, { items, ...options }).observe({ shown: true })

describe('Critical User Paths', () => {
  it('opens from the trigger with the arrows on the first or the last item, wrapping and jumping to the edges inside', () => {
    const onChangeOpen = vi.fn()
    const widget = simulate(menuWidget, { items, onChangeOpen })

    widget.send(key.arrowDown, { part: TRIGGER })
    expect(widget.answer).toBe('handled')
    expect(widget.actions).toEqual([act.showPopover(CONTENT), act.focus('copy')])
    expect(onChangeOpen).toHaveBeenLastCalledWith(true)

    widget.observe({ shown: true }).send(browser.toggle, { to: true, part: CONTENT })
    expect(widget.actions).toEqual([])

    widget.send(key.arrowDown, { key: 'copy' })
    expect(widget.actions).toEqual([act.focus('cut')])

    widget.send(key.end, { key: 'cut' })
    expect(widget.actions).toEqual([act.focus('fit')])

    widget.send(key.arrowDown, { key: 'fit' })
    expect(widget.actions).toEqual([act.focus('copy')])

    const fromUp = simulate(menuWidget, { items })
    fromUp.send(key.arrowUp, { part: TRIGGER })
    expect(fromUp.actions).toEqual([act.showPopover(CONTENT), act.focus('fit')])
  })

  it('puts the focus on the first item when the menu opens any other way', () => {
    const widget = simulate(menuWidget, { items }).observe({ shown: true })

    widget.send(browser.toggle, { to: true, part: CONTENT })
    expect(widget.state.active).toBe('copy')
    expect(widget.actions).toEqual([act.focus('copy')])
  })

  it('closes on a pressed item and gives the focus back to the trigger', () => {
    const onChangeOpen = vi.fn()
    const widget = open({ defaultOpen: true, onChangeOpen })

    widget.send(pointer.press, { key: 'paste' })
    expect(widget.answer).toBe('keep')
    expect(widget.actions).toEqual([HIDE, RETURN])
    expect(onChangeOpen).toHaveBeenLastCalledWith(false)
  })

  it('clicks the item on Space, keeping the menu open only for a checkbox or a radio item', () => {
    const widget = open()

    widget.send(key.space, { key: 'paste' })
    expect(widget.answer).toBe('handled')
    expect(widget.actions).toEqual([act.click('paste')])
    widget.send(pointer.press, { key: 'paste' })
    expect(widget.actions).toEqual([HIDE, RETURN])

    widget.observe({ shown: true }).send(key.space, { key: 'ruler' })
    expect(widget.actions).toEqual([act.click('ruler')])
    widget.send(pointer.press, { key: 'ruler' })
    expect(widget.actions).toEqual([act.sendAt('ruler', CHECK)])

    widget.send(pointer.press, { key: 'fit' })
    expect(widget.actions).toEqual([act.sendAt('fit', CHECK, { value: 'fit' }), HIDE, RETURN])
  })

  it('moves the focus to the next item whose label starts with the typed text', () => {
    const widget = open()

    widget.send(key.printable, { key: 'copy', char: 'p' })
    expect(widget.actions).toEqual([act.timer(TYPEAHEAD, 500), act.focus('paste')])

    widget.send(timer(TYPEAHEAD)).send(key.printable, { key: 'paste', char: 'c' })
    expect(widget.actions).toEqual([act.timer(TYPEAHEAD, 500), act.focus('copy')])
  })

  it('checks a checkbox item and an enabled radio item when the menu sends them the check', () => {
    const onChangeChecked = vi.fn()
    const checkbox = simulate(menuCheckboxWidget, { onChangeChecked })
    checkbox.send(CHECK)
    expect(onChangeChecked).toHaveBeenLastCalledWith(true)
    checkbox.send(CHECK)
    expect(onChangeChecked).toHaveBeenLastCalledWith(false)

    const onChangeValue = vi.fn()
    const radios = ['fit', '100', '200'].map((value) => ({ key: value, data: { disabled: value === '200' } }))
    const group = simulate(menuRadioGroupWidget, { items: radios, defaultValue: 'fit', onChangeValue })
    group.send(CHECK, { value: '200' }).send(CHECK, { value: '100' })
    expect(onChangeValue).toHaveBeenCalledExactlyOnceWith('100')
    expect(menuRadioGroupWidget.output.radio.render(menuRadioGroupWidget.output.radio.select(group.state, '100'))).toEqual({ 'aria-checked': true, 'data-checked': true })
  })
})

describe('Error handling', () => {
  it('leaves a disabled item focusable but never activates it', () => {
    const widget = open().send(browser.toggle, { to: true, part: CONTENT })

    widget.send(key.arrowDown, { key: 'copy' })
    expect(widget.actions).toEqual([act.focus('cut')])

    widget.send(key.space, { key: 'cut' })
    expect(widget.answer).toBe('handled')
    expect(widget.actions).toEqual([])

    widget.send(pointer.press, { key: 'cut' })
    expect(widget.answer).toBe('handled')
    expect(widget.actions).toEqual([])

    widget.send(pointer.hover, { key: 'cut' })
    expect(widget.answer).toBe('pass')
  })

  it('leaves typing, Home and End on the trigger to the widgets around it', () => {
    const widget = simulate(menuWidget, { items })

    widget.send(key.printable, { part: TRIGGER, char: 'p' })
    expect(widget.answer).toBe('pass')

    widget.send(key.home, { part: TRIGGER }).send(key.end, { part: TRIGGER })
    expect(widget.answer).toBe('pass')
    expect(widget.actions).toEqual([])
  })

  it('closes on a pressed item after Space on a checkbox item whose click never came', () => {
    const widget = open()

    widget.send(key.space, { key: 'ruler' })
    widget.send(focus.move, { key: 'paste' }).send(pointer.press, { key: 'paste' })
    expect(widget.actions).toEqual([HIDE, RETURN])

    widget.observe({ shown: true }).send(key.space, { key: 'ruler' }).send(pointer.press, { key: 'paste' })
    expect(widget.actions).toEqual([HIDE, RETURN])
  })
})

describe('Edge Cases', () => {
  it('closes on Escape and Shift+Tab with the focus on the trigger, and leaves Tab to the browser', () => {
    const widget = open()

    widget.send(key.escape, { key: 'copy', part: CONTENT })
    expect(widget.answer).toBe('handled')
    expect(widget.actions).toEqual([HIDE, RETURN])

    widget.observe({ shown: true }).send(key.with(key.tab, mod.shift), { key: 'copy', part: CONTENT })
    expect(widget.answer).toBe('handled')
    expect(widget.actions).toEqual([HIDE, RETURN])
  })

  it('closes when the focus leaves the trigger and the menu', () => {
    const widget = open()

    widget.send(focus.leave)
    expect(widget.actions).toEqual([HIDE])
  })

  it('follows the item under the pointer with the focus without scrolling', () => {
    const widget = open()

    widget.send(pointer.hover, { key: 'paste' })
    expect(widget.actions).toEqual([act.focus('paste', true)])

    widget.send(pointer.hover, { key: 'paste' })
    expect(widget.answer).toBe('pass')
  })

  it('does not take the focus to an item when it enters the trigger', () => {
    const widget = simulate(menuWidget, { items })

    widget.send(focus.enter, {})
    expect(widget.actions).toEqual([])
    expect(widget.state.active).toBe(null)
  })

  it('shows and hides the menu when a controlled parent changes open, and not when it passes the same value again', () => {
    const widget = simulate(menuWidget, { items, open: false })

    widget.setOptions({ items, open: true })
    expect(widget.actions).toEqual([act.showPopover(CONTENT)])

    widget.observe({ shown: false }).setOptions({ items: [...items], open: true })
    expect(widget.actions).toEqual([])

    widget.send(lifecycle.connect)
    expect(widget.actions).toEqual([act.showPopover(CONTENT)])
  })
})

describe('Accessibility', () => {
  it('names the menu by its trigger and gives every item its role, no tab stop and aria-disabled', () => {
    const widget = simulate(menuWidget, { items })
    const { trigger, content, item: itemPart } = menuWidget.output
    const render = (part: typeof itemPart, value: string) => part.render(part.select(widget.state, value))

    expect(trigger.render(trigger.select(widget.state, undefined as never))).toEqual({
      id: 'widget-trigger',
      'aria-haspopup': 'menu',
      'aria-expanded': false,
      'aria-controls': 'widget-content',
      popoverTarget: 'widget-content',
      'data-open': false,
    })
    expect(content.render(content.select(widget.state, undefined as never))).toEqual({ id: 'widget-content', role: 'menu', tabIndex: -1, 'aria-labelledby': 'widget-trigger' })
    expect(render(itemPart, 'copy')).toEqual({ role: 'menuitem', tabIndex: -1, 'aria-disabled': undefined })
    expect(render(itemPart, 'cut')).toEqual({ role: 'menuitem', tabIndex: -1, 'aria-disabled': true })
    expect(render(itemPart, 'ruler')).toMatchObject({ role: 'menuitemcheckbox' })
    expect(render(itemPart, 'fit')).toMatchObject({ role: 'menuitemradio' })
  })
})
