import { describe, expect, it, vi } from 'vitest'
import { act, browser, focus, key, lifecycle, pointer, timer } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { CONTENT, isRendered, TRIGGER, tooltipWidget } from '../widget'

const options = { delayOpen: 500, delayClose: 250, group: undefined }

describe('Critical User Paths', () => {
  it('opens after delayOpen on hover, stays open while the pointer moves onto the tooltip and closes after delayClose', () => {
    const onChangeOpen = vi.fn()
    const tooltip = simulate(tooltipWidget, { ...options, onChangeOpen })

    tooltip.send(pointer.enter, { part: TRIGGER, pointerType: 'mouse' })
    expect(tooltip.actions).toEqual([act.cancelTimer('hide'), act.timer('show', 500)])

    tooltip.send(timer('show'))
    expect(onChangeOpen).toHaveBeenLastCalledWith(true)
    expect(tooltip.actions).toContainEqual(act.showPopover(CONTENT))

    tooltip.send(pointer.leave, { part: TRIGGER, to: CONTENT }).send(pointer.leave, { part: CONTENT })
    expect(tooltip.actions).toEqual([act.cancelTimer('show'), act.timer('hide', 250)])

    tooltip.send(timer('hide'))
    expect(onChangeOpen).toHaveBeenLastCalledWith(false)
    expect(isRendered(tooltip.state)).toBe(true)

    tooltip.send(browser.animationEnd, { part: CONTENT })
    expect(isRendered(tooltip.state)).toBe(false)
  })

  it('opens at once on keyboard focus and closes on Escape', () => {
    const tooltip = simulate(tooltipWidget, options)

    tooltip.observe({ focusVisible: true }).send(focus.enter)
    expect(tooltip.state.open).toBe(true)

    tooltip.send(key.escape)
    expect(tooltip.answer).toBe('handled')
    expect(tooltip.state.open).toBe(false)
  })
})

describe('Edge Cases', () => {
  it('opens at once while its group is warm', () => {
    const tooltip = simulate(tooltipWidget, options)

    tooltip.observe({ warm: true }).send(pointer.enter, { part: TRIGGER, pointerType: 'mouse' })

    expect(tooltip.state.open).toBe(true)
  })

  it('ignores a tap and a mouse focus', () => {
    const tooltip = simulate(tooltipWidget, options)

    tooltip.send(pointer.enter, { part: TRIGGER, pointerType: 'touch' })
    expect(tooltip.actions).toEqual([])

    tooltip.send(focus.enter)
    expect(tooltip.actions).toEqual([])
    expect(tooltip.state.open).toBe(false)
  })

  it('closes when the trigger is pressed', () => {
    const tooltip = simulate(tooltipWidget, { ...options, delayOpen: 0 })

    tooltip.send(pointer.enter, { part: TRIGGER, pointerType: 'mouse' }).send(pointer.down, { part: TRIGGER })

    expect(tooltip.state.open).toBe(false)
    expect(tooltip.actions).toContainEqual(act.awaitAnimations(CONTENT))
  })

  it('asks a controlled parent on hover, unhover and Escape and shows only what the parent opens', () => {
    const onChangeOpen = vi.fn()
    const controlled = { ...options, delayOpen: 0, onChangeOpen }
    const closed = simulate(tooltipWidget, { ...controlled, open: false })

    closed.send(pointer.enter, { part: TRIGGER, pointerType: 'mouse' })
    expect(onChangeOpen).toHaveBeenLastCalledWith(true)
    expect(closed.actions).toEqual([act.cancelTimer('show'), act.cancelTimer('hide')])

    closed.setOptions({ ...controlled, open: false })
    expect(isRendered(closed.state)).toBe(false)

    onChangeOpen.mockClear()
    const opened = simulate(tooltipWidget, { ...controlled, open: true }).send(lifecycle.connect).observe({ shown: true })

    opened.send(pointer.enter, { part: TRIGGER, pointerType: 'mouse' }).send(pointer.leave, { part: TRIGGER }).send(timer('hide'))
    expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(false)
    expect(opened.actions).toEqual([act.cancelTimer('show'), act.cancelTimer('hide')])

    opened.setOptions({ ...controlled, open: true }).send(key.escape)
    expect(opened.answer).toBe('handled')
    expect(onChangeOpen).toHaveBeenLastCalledWith(false)
    expect(opened.actions).toEqual([act.cancelTimer('show'), act.cancelTimer('hide')])

    opened.setOptions({ ...controlled, open: true })
    expect(isRendered(opened.state)).toBe(true)
  })

  it('listens for Escape again when it connects while already shown, like after a remount', () => {
    const tooltip = simulate(tooltipWidget, { ...options, defaultOpen: true }).observe({ shown: true }).send(lifecycle.connect)

    expect(tooltip.actions).toEqual([act.watchKeys()])
  })

  it('lets Escape through while closed', () => {
    const tooltip = simulate(tooltipWidget, options)

    tooltip.send(key.escape)

    expect(tooltip.answer).toBe('pass')
  })
})
