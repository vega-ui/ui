import { describe, expect, it, vi } from 'vitest'
import { act, browser } from '@vega-ui/core'
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

  it('ignores the toggle of a popover nested in the content', () => {
    const popover = simulate(popoverWidget, { role: undefined, defaultOpen: true })

    popover.observe({ shown: true }).send(browser.toggle, { to: false })

    expect(popover.state.open).toBe(true)
  })
})
