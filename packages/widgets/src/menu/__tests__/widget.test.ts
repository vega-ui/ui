import { describe, expect, it, vi } from 'vitest'
import { act, browser, focus, key, lifecycle, measure, mod, pointer, timer, TYPEAHEAD } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { AIM, AIMING, ANCHOR, CHECK, CONTENT, contextMenuWidget, DISMISS, HOLDING, MenuEntry, MenuItemData, menuCheckboxWidget, menuRadioGroupWidget, menuWidget, OPENING, submenuWidget, TRIGGER } from '../widget'
import { aims } from '../aim'

const item = (value: string, data: Partial<MenuItemData> = {}): MenuEntry => ({ key: value, data: { kind: 'item', disabled: false, label: value, ...data } })

const items = [item('copy', { label: 'Copy' }), item('cut', { label: 'Cut', disabled: true }), item('paste', { label: 'Paste' }), item('ruler', { label: 'Ruler', kind: 'checkbox' }), item('fit', { label: 'Fit', kind: 'radio', value: 'fit' })]

const HIDE = act.hidePopover(CONTENT)
const RETURN = act.focusPart(TRIGGER)

const CLOSE_UP = [HIDE, act.sendUp(TRIGGER, DISMISS)]
const SHARE = { name: AIMING, parts: { [CONTENT]: { rect: { x: 200, y: 100, width: 160, height: 120 } } }, items: [] }

const openSub = (options: Partial<Parameters<typeof simulate<typeof submenuWidget.shape>>[1]> = {}) => simulate(submenuWidget, { items, ...options }).observe({ shown: true, disabled: false, triggerFocused: true })

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

  it('keeps the menu open on a click or Enter for a checkbox or radio item that asks for it', () => {
    const kept = [item('grid', { label: 'Grid', kind: 'checkbox', keepOpen: true }), item('fill', { label: 'Fill', kind: 'radio', value: 'fill', keepOpen: true })]
    const widget = open({ items: kept })

    widget.send(pointer.press, { key: 'grid' })
    expect(widget.actions).toEqual([act.sendAt('grid', CHECK)])

    widget.send(pointer.press, { key: 'fill' })
    expect(widget.actions).toEqual([act.sendAt('fill', CHECK, { value: 'fill' })])
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

  it('opens from its item on Enter, Space or the arrow into it with the focus on the first item, and leaves the arrows along the menu to the parent', () => {
    for (const opening of [key.enter, key.space, key.arrowRight]) {
      const widget = simulate(submenuWidget, { items }).observe({ shown: false, disabled: false, triggerFocused: true })
      widget.send(opening, { part: TRIGGER })
      expect(widget.answer).toBe('handled')
      expect(widget.actions).toEqual([act.showPopover(CONTENT), act.focus('copy')])
    }

    const widget = simulate(submenuWidget, { items }).observe({ shown: false, disabled: false, triggerFocused: true })
    widget.send(key.arrowDown, { part: TRIGGER }).send(key.end, { part: TRIGGER }).send(key.printable, { part: TRIGGER, char: 'p' })
    expect(widget.answer).toBe('pass')
  })

  it('opens without taking the focus when the pointer rests on its item or clicks it, and not on a disabled item', () => {
    const widget = simulate(submenuWidget, { items }).observe({ shown: false, disabled: false, triggerFocused: true })

    widget.send(pointer.enter, { part: TRIGGER, pointerType: 'mouse' })
    expect(widget.actions).toEqual([act.timer(OPENING, 100)])
    widget.observe({ triggerFocused: false, triggerHovered: true }).send(timer(OPENING))
    expect(widget.actions).toEqual([act.timer(OPENING, 100)])
    widget.observe({ triggerHovered: false }).send(timer(OPENING))
    expect(widget.actions).toEqual([])
    widget.observe({ triggerFocused: true }).send(timer(OPENING))
    expect(widget.actions).toEqual([act.showPopover(CONTENT)])

    widget.send(pointer.leave, { part: TRIGGER, pointerType: 'mouse' })
    expect(widget.actions).toEqual([act.cancelTimer(OPENING)])

    widget.send(pointer.press, { part: TRIGGER })
    expect(widget.actions).toEqual([act.cancelTimer(OPENING), act.showPopover(CONTENT)])

    widget.send(browser.toggle, { to: true, part: CONTENT })
    expect(widget.actions).toEqual([])

    const disabled = simulate(submenuWidget, { items }).observe({ shown: false, disabled: true, triggerFocused: true })
    disabled.send(pointer.enter, { part: TRIGGER, pointerType: 'mouse' }).send(key.enter, { part: TRIGGER })
    expect(disabled.answer).toBe('handled')
    expect(disabled.actions).toEqual([])
  })

  it('closes on Escape or the arrow out of it with the focus back on its item, by the writing direction', () => {
    const widget = openSub()
    widget.send(key.arrowLeft, { key: 'copy', part: CONTENT })
    expect(widget.answer).toBe('handled')
    expect(widget.actions).toEqual([HIDE, RETURN])

    widget.observe({ shown: true }).send(key.escape, { key: 'copy', part: CONTENT })
    expect(widget.actions).toEqual([HIDE, RETURN])

    const rightToLeft = simulate(submenuWidget, { items }, { rtl: true }).observe({ shown: true, disabled: false, triggerFocused: true })
    rightToLeft.send(key.arrowRight, { key: 'copy', part: CONTENT })
    expect(rightToLeft.actions).toEqual([HIDE, RETURN])
  })

  it('closes every menu up to the menu button when an item of a submenu runs', () => {
    const sub = openSub()
    sub.send(pointer.press, { key: 'paste' })
    expect(sub.actions).toEqual(CLOSE_UP)

    const middle = openSub()
    middle.send(DISMISS)
    expect(middle.actions).toEqual(CLOSE_UP)

    const root = open()
    root.send(DISMISS)
    expect(root.actions).toEqual([HIDE, RETURN])
  })

  it('keeps the focus on its item while the pointer heads from it into the submenu over other items', () => {
    const sub = openSub()
    sub.send(pointer.leave, { part: TRIGGER, point: { x: 150, y: 110 }, pointerType: 'mouse' })
    expect(sub.actions).toEqual([act.measure({ name: AIMING, parts: [CONTENT], rect: true })])
    sub.send(measure.done, { measured: SHARE })
    expect(sub.actions).toEqual([act.sendUp(TRIGGER, AIM, { point: { x: 150, y: 110 }, measured: SHARE })])

    const parent = open()
    parent.send(AIM, { point: { x: 150, y: 110 }, measured: SHARE })
    expect(parent.actions).toEqual([act.timer(AIMING, 300)])

    parent.send(pointer.hover, { key: 'paste', point: { x: 180, y: 120 } })
    expect(parent.actions).toEqual([])

    parent.send(pointer.hover, { key: 'paste', point: { x: 150, y: 160 } })
    expect(parent.actions).toEqual([act.focus('paste', { preventScroll: true, focusVisible: false })])

    parent.send(AIM, { point: { x: 150, y: 110 }, measured: SHARE }).send(timer(AIMING))
    parent.send(pointer.hover, { key: 'cut', point: { x: 180, y: 120 } }).send(pointer.hover, { key: 'copy', point: { x: 180, y: 120 } })
    expect(parent.actions).toEqual([act.focus('copy', { preventScroll: true, focusVisible: false })])
  })

  it('aims at the near edge of the submenu on either side of its item', () => {
    const rect = { x: 200, y: 100, width: 160, height: 120 }
    expect(aims({ from: { x: 150, y: 110 }, rect }, { x: 190, y: 190 })).toBe(true)
    expect(aims({ from: { x: 150, y: 110 }, rect }, { x: 140, y: 200 })).toBe(false)
    expect(aims({ from: { x: 400, y: 110 }, rect }, { x: 370, y: 180 })).toBe(true)
  })

  it('opens at the point of a right click with the focus on the first item, and keeps the menu of the browser away inside it', () => {
    const widget = simulate(contextMenuWidget, { items }).observe({ shown: false })

    widget.send(browser.contextMenu, { part: TRIGGER, point: { x: 40, y: 60 } })
    expect(widget.answer).toBe('handled')
    expect(widget.actions).toEqual([act.cancelTimer(HOLDING), act.showPopover(ANCHOR), act.showPopover(CONTENT), act.focus('copy')])
    expect(contextMenuWidget.output.anchor.live.render(contextMenuWidget.output.anchor.live.select(widget.state))).toEqual({ '--context-menu-x': '40px', '--context-menu-y': '60px' })

    widget.observe({ shown: true }).send(browser.contextMenu, { key: 'copy', part: CONTENT, point: { x: 50, y: 70 } })
    expect(widget.answer).toBe('handled')
    expect(widget.actions).toEqual([])
  })

  it('closes without moving the focus itself, so the browser gives it back to where it was', () => {
    const widget = simulate(contextMenuWidget, { items }).observe({ shown: true })
    widget.send(key.escape, { key: 'copy', part: CONTENT })
    expect(widget.actions).toEqual([HIDE])

    widget.observe({ shown: true }).send(pointer.press, { key: 'paste' })
    expect(widget.actions).toEqual([HIDE])

    widget.observe({ shown: true }).send(DISMISS)
    expect(widget.actions).toEqual([HIDE])
  })

  it('closes when the focus moves from the menu back into the area, like Shift+Tab does', () => {
    const widget = simulate(contextMenuWidget, { items }).observe({ shown: true })

    widget.send(focus.move, { key: 'copy', part: CONTENT })
    expect(widget.actions).toEqual([])

    widget.send(focus.move, { part: TRIGGER })
    expect(widget.answer).toBe('keep')
    expect(widget.actions).toEqual([HIDE])
  })

  it('opens on a long touch that stays in place and takes the touch from the page, and not on a mouse press, a touch that moves away or a touch on a text field', () => {
    const widget = simulate(contextMenuWidget, { items }).observe({ shown: false })

    widget.send(pointer.down, { part: TRIGGER, pointerType: 'mouse', primary: true, point: { x: 10, y: 10 } })
    expect(widget.answer).toBe('pass')

    widget.send(pointer.down, { part: TRIGGER, pointerType: 'touch', primary: true, point: { x: 10, y: 10 } })
    expect(widget.actions).toEqual([act.timer(HOLDING, 700)])
    widget.send(pointer.drag, { point: { x: 14, y: 13 } })
    expect(widget.actions).toEqual([])
    widget.send(timer(HOLDING))
    expect(widget.actions).toEqual([act.claimPointer(), act.cancelTimer(HOLDING), act.showPopover(ANCHOR), act.showPopover(CONTENT), act.focus('copy')])

    const moved = simulate(contextMenuWidget, { items }).observe({ shown: false })
    moved.send(pointer.down, { part: TRIGGER, pointerType: 'touch', primary: true, point: { x: 10, y: 10 } }).send(pointer.drag, { point: { x: 10, y: 40 } })
    expect(moved.actions).toEqual([act.cancelTimer(HOLDING)])

    const lifted = simulate(contextMenuWidget, { items }).observe({ shown: false })
    lifted.send(pointer.down, { part: TRIGGER, pointerType: 'touch', primary: true, point: { x: 10, y: 10 } }).send(pointer.release, {})
    expect(lifted.actions).toEqual([act.cancelTimer(HOLDING)])

    const typing = simulate(contextMenuWidget, { items }).observe({ shown: false })
    typing.send(pointer.down, { part: TRIGGER, pointerType: 'touch', primary: true, textEntry: true, point: { x: 10, y: 10 } })
    expect(typing.answer).toBe('pass')
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
  it('leaves the focus in a submenu the user reached before the browser reported the menu open', () => {
    const widget = simulate(menuWidget, { items })

    widget.send(key.arrowUp, { part: TRIGGER })
    widget.observe({ shown: true }).send(focus.move, { part: CONTENT })

    widget.observe({ focusInside: true }).send(browser.toggle, { to: true, part: CONTENT })
    expect(widget.actions).toEqual([])
  })

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
    expect(widget.actions).toEqual([act.focus('paste', { preventScroll: true, focusVisible: false })])

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
