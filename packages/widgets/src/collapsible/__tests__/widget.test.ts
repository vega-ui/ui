import { describe, expect, it, vi } from 'vitest'
import { act, browser, lifecycle, pointer } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { collapsibleWidget, CONTENT, isHidden, TRIGGER } from '../widget'

const { content } = collapsibleWidget.output

const contentOf = (state: Parameters<typeof isHidden>[0]) => content.render(content.select(state, undefined as never))

describe('Critical User Paths', () => {
  it('expands the content at once and hides it only after the collapsing animation', () => {
    const onChangeOpen = vi.fn()
    const collapsible = simulate(collapsibleWidget, { contentId: undefined, onChangeHidden: undefined, onChangeOpen }).send(lifecycle.connect)

    collapsible.send(pointer.press, { part: TRIGGER })
    expect(onChangeOpen).toHaveBeenLastCalledWith(true)
    expect(contentOf(collapsible.state)).toMatchObject({ hidden: false, 'data-open': true })
    expect(collapsible.actions).toEqual([act.animateHeight(CONTENT, true), act.emit('changeHidden', false)])

    collapsible.send(pointer.press, { part: TRIGGER })
    expect(onChangeOpen).toHaveBeenLastCalledWith(false)
    expect(contentOf(collapsible.state)).toMatchObject({ hidden: false, 'data-open': false })
    expect(collapsible.actions).toEqual([act.animateHeight(CONTENT, false), act.awaitAnimations(CONTENT)])

    collapsible.send(browser.animationEnd, { part: CONTENT })
    expect(isHidden(collapsible.state)).toBe(true)
    expect(collapsible.actions).toEqual([act.emit('changeHidden', true)])
  })
})

describe('Edge Cases', () => {
  it('does not animate the content it connects with', () => {
    const collapsible = simulate(collapsibleWidget, { contentId: undefined, onChangeHidden: undefined, defaultOpen: true }).send(lifecycle.connect)

    expect(contentOf(collapsible.state)).toMatchObject({ hidden: false, 'data-open': true })
    expect(collapsible.actions).toEqual([act.emit('changeHidden', false)])
  })

  it('animates the content the parent opens and closes', () => {
    const collapsible = simulate(collapsibleWidget, { contentId: undefined, onChangeHidden: undefined, open: false }).send(lifecycle.connect)

    collapsible.setOptions({ contentId: undefined, onChangeHidden: undefined, open: true })
    expect(isHidden(collapsible.state)).toBe(false)
    expect(collapsible.actions).toEqual([act.animateHeight(CONTENT, true), act.emit('changeHidden', false)])

    collapsible.setOptions({ contentId: undefined, onChangeHidden: undefined, open: false })
    expect(collapsible.actions).toEqual([act.animateHeight(CONTENT, false), act.awaitAnimations(CONTENT)])
  })

  it('asks the parent to open on a press and keeps the content hidden until the parent accepts', () => {
    const onChangeOpen = vi.fn()
    const collapsible = simulate(collapsibleWidget, { contentId: undefined, onChangeHidden: undefined, open: false, onChangeOpen }).send(lifecycle.connect)

    collapsible.send(pointer.press, { part: TRIGGER })

    expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(true)
    expect(isHidden(collapsible.state)).toBe(true)
    expect(collapsible.actions).toEqual([])
  })

  it('keeps the content shown when it opens again before the collapsing animation ends', () => {
    const collapsible = simulate(collapsibleWidget, { contentId: undefined, onChangeHidden: undefined, defaultOpen: true }).send(lifecycle.connect)

    collapsible.send(pointer.press, { part: TRIGGER }).send(pointer.press, { part: TRIGGER }).send(browser.animationEnd, { part: CONTENT })

    expect(contentOf(collapsible.state)).toMatchObject({ hidden: false, 'data-open': true })
  })
})
