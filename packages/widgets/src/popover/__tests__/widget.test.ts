import { describe, expect, it, vi } from 'vitest'
import { act, browser, focus } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { CLOSE_POPOVER, CONTENT, isRendered, popoverWidget } from '../widget'

describe('Critical User Paths', () => {
  it('follows the browser: reports its opens and closes and keeps the children until the closing animations end', () => {
    const onChangeOpen = vi.fn()
    const popover = simulate(popoverWidget, { role: undefined, onChangeOpen })

    popover.observe({ shown: true }).send(browser.toggle, { part: CONTENT, to: true })
    expect(onChangeOpen).toHaveBeenLastCalledWith(true)
    expect(isRendered(popover.state)).toBe(true)

    popover.observe({ shown: false }).send(browser.toggle, { part: CONTENT, to: false })
    expect(onChangeOpen).toHaveBeenLastCalledWith(false)
    expect(popover.actions).toEqual([act.awaitAnimations(CONTENT)])
    expect(isRendered(popover.state)).toBe(true)

    popover.send(browser.animationEnd, { part: CONTENT })
    expect(isRendered(popover.state)).toBe(false)
  })
})

describe('Edge Cases', () => {
  it('keeps the children between the hide and its toggle event, so a closing popover does not empty for a frame', () => {
    const popover = simulate(popoverWidget, { role: undefined })
    popover.observe({ shown: true }).send(browser.toggle, { part: CONTENT, to: true })

    popover.observe({ shown: false })
    expect(isRendered(popover.state)).toBe(true)

    popover.send(browser.toggle, { part: CONTENT, to: false }).send(browser.animationEnd, { part: CONTENT })
    expect(isRendered(popover.state)).toBe(false)
  })

  it('keeps the children when it reopens during the closing animation and that animation ends late', () => {
    const popover = simulate(popoverWidget, { role: undefined })
    popover.observe({ shown: true }).send(browser.toggle, { part: CONTENT, to: true })
    popover.observe({ shown: false }).send(browser.toggle, { part: CONTENT, to: false })
    popover.observe({ shown: true }).send(browser.toggle, { part: CONTENT, to: true }).send(browser.animationEnd, { part: CONTENT })

    popover.observe({ shown: false })
    expect(isRendered(popover.state)).toBe(true)
  })

  it('hides itself on a close request only when no parent controls open, so a parent may keep it open', () => {
    const own = simulate(popoverWidget, { role: undefined, defaultOpen: true })
    own.observe({ shown: true }).send(CLOSE_POPOVER)
    expect(own.actions).toEqual([act.hidePopover(CONTENT)])

    const controlled = simulate(popoverWidget, { role: undefined, open: true })
    controlled.observe({ shown: true }).send(CLOSE_POPOVER)
    expect(controlled.actions).toEqual([])

    controlled.setOptions({ role: undefined, open: false })
    expect(controlled.actions).toEqual([act.hidePopover(CONTENT)])
  })

  it('returns the focus that a closing popover still holds, as browsers do not for a nested one', () => {
    const popover = simulate(popoverWidget, { role: undefined })

    popover.observe({ shown: true }).send(browser.toggle, { part: CONTENT, to: true })
    popover.observe({ shown: false, focusedWithin: true }).send(browser.toggle, { part: CONTENT, to: false })
    expect(popover.actions).toEqual([act.awaitAnimations(CONTENT), act.restoreFocus()])

    popover.observe({ shown: true, focusedWithin: false }).send(browser.toggle, { part: CONTENT, to: true })
    popover.observe({ shown: false }).send(browser.toggle, { part: CONTENT, to: false })
    expect(popover.actions).toEqual([act.awaitAnimations(CONTENT)])
  })

  it('returns the focus that a hidden popover lost before its toggle came, and not the focus the user moves out of an open one', () => {
    const popover = simulate(popoverWidget, { role: undefined })

    popover.observe({ shown: true }).send(browser.toggle, { part: CONTENT, to: true })
    popover.send(focus.leave)
    expect(popover.actions).toEqual([])

    popover.observe({ shown: false }).send(focus.leave)
    expect(popover.actions).toEqual([act.restoreFocus()])
  })

  it('ignores the toggle of a popover nested in the content', () => {
    const popover = simulate(popoverWidget, { role: undefined, defaultOpen: true })

    popover.observe({ shown: true }).send(browser.toggle, { to: false })

    expect(popover.state.open).toBe(true)
  })
})
