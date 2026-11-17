import { describe, expect, it, vi } from 'vitest'
import { act, browser, focus, key, pointer } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { PANEL, TabsEntry, tabsWidget } from '../widget'

const tabs = (keys: readonly string[], disabled: readonly string[] = []): readonly TabsEntry[] =>
  keys.map((value) => ({ key: value, data: { disabled: disabled.includes(value) } }))

const render = <Part extends typeof tabsWidget.output.tab | typeof tabsWidget.output.panel>(part: Part, state: Parameters<Part['select']>[0], value: string) => part.render(part.select(state, value) as never)

const tabStops = (state: Parameters<typeof tabsWidget.output.tab.select>[0], keys: readonly string[]) => keys.filter((value) => render(tabsWidget.output.tab, state, value).tabIndex === 0)

describe('Critical User Paths', () => {
  it('shows the tab the arrows move to, wrapping around the ends, and jumps to the edges', () => {
    const onChangeValue = vi.fn()
    const widget = simulate(tabsWidget, { items: tabs(['a', 'b', 'c']), defaultValue: 'a', onChangeValue }, { orientation: 'horizontal' })

    widget.send(key.arrowRight)
    expect(widget.state.value).toBe('b')
    expect(widget.actions).toEqual([act.focus('b')])
    expect(onChangeValue).toHaveBeenLastCalledWith('b')

    widget.send(key.end).send(key.arrowRight)
    expect(widget.state.value).toBe('a')

    widget.send(key.arrowLeft)
    expect(widget.state.value).toBe('c')

    widget.send(key.home)
    expect(widget.state.value).toBe('a')
  })

  it('moves only the focus in manual activation and shows the focused tab when it is pressed', () => {
    const onChangeValue = vi.fn()
    const widget = simulate(tabsWidget, { items: tabs(['a', 'b', 'c']), defaultValue: 'a', activation: 'manual', onChangeValue }, { orientation: 'horizontal' })

    widget.send(key.arrowRight).send(key.arrowRight)
    expect(widget.actions).toEqual([act.focus('c')])
    expect(widget.state.value).toBe('a')
    expect(onChangeValue).not.toHaveBeenCalled()

    widget.send(pointer.press, { key: 'c' })
    expect(widget.state.value).toBe('c')
    expect(onChangeValue).toHaveBeenCalledExactlyOnceWith('c')
  })

  it('shows a tab on the press, not when the pointer goes down, and reports it to a controlled parent once', () => {
    const onChangeValue = vi.fn()
    const widget = simulate(tabsWidget, { items: tabs(['a', 'b']), value: 'a', onChangeValue })

    widget.send(pointer.press, { key: 'a' })
    expect(onChangeValue).not.toHaveBeenCalled()

    widget.send(pointer.down, { key: 'b' })
    expect(onChangeValue).not.toHaveBeenCalled()
    expect(tabStops(widget.state, ['a', 'b'])).toEqual(['b'])

    widget.send(pointer.press, { key: 'b' })
    expect(onChangeValue).toHaveBeenCalledExactlyOnceWith('b')
  })
})

describe('Edge Cases', () => {
  it('steps over a disabled tab and ignores a press on it', () => {
    const widget = simulate(tabsWidget, { items: tabs(['a', 'b', 'c'], ['b']), defaultValue: 'a' }, { orientation: 'horizontal' })

    widget.send(key.arrowRight)
    expect(widget.state.value).toBe('c')

    widget.send(pointer.press, { key: 'b' })
    expect(widget.state.value).toBe('c')
  })

  it('moves along the vertical axis when the list is vertical', () => {
    const widget = simulate(tabsWidget, { items: tabs(['a', 'b']), defaultValue: 'a', orientation: 'vertical' }, { orientation: 'vertical' })

    widget.send(key.arrowDown)
    expect(widget.state.value).toBe('b')
  })

  it('shows the tab whose panel the page search revealed, also a disabled one, and ignores a panel with no tab', () => {
    const widget = simulate(tabsWidget, { items: tabs(['a', 'b', 'c'], ['c']), defaultValue: 'a' })

    widget.send(browser.reveal, { part: PANEL, key: 'b' })
    expect(widget.state.value).toBe('b')

    widget.send(browser.reveal, { part: PANEL, key: 'c' })
    expect(widget.state.value).toBe('c')

    widget.send(browser.reveal, { part: PANEL, key: 'orphan' })
    expect(widget.state.value).toBe('c')
  })

  it('shows the first enabled tab when no value is given', () => {
    const { state } = simulate(tabsWidget, { items: tabs(['a', 'b'], ['a']) })

    expect(render(tabsWidget.output.panel, state, 'b').hidden).toBeUndefined()
    expect(render(tabsWidget.output.panel, state, 'a').hidden).toBe('until-found')
  })
})

describe('Accessibility', () => {
  it('keeps one tab stop on the selected tab, or on the first enabled tab when the selected one is disabled', () => {
    expect(tabStops(simulate(tabsWidget, { items: tabs(['a', 'b', 'c']), defaultValue: 'b' }).state, ['a', 'b', 'c'])).toEqual(['b'])
    expect(tabStops(simulate(tabsWidget, { items: tabs(['a', 'b', 'c'], ['b']), value: 'b' }).state, ['a', 'b', 'c'])).toEqual(['a'])
  })

  it('keeps the tab stop on the focused tab in manual activation and returns it to the selected tab when the focus leaves', () => {
    const widget = simulate(tabsWidget, { items: tabs(['a', 'b', 'c']), defaultValue: 'a', activation: 'manual' }, { orientation: 'horizontal' })

    widget.send(key.arrowRight)
    expect(tabStops(widget.state, ['a', 'b', 'c'])).toEqual(['b'])

    widget.send(focus.leave)
    expect(tabStops(widget.state, ['a', 'b', 'c'])).toEqual(['a'])

    widget.send(key.arrowRight)
    expect(widget.actions).toEqual([act.focus('b')])
  })

  it('links each tab and its panel and hides the panels of the other tabs from the focus order and assistive technologies until the page search finds them', () => {
    const { state } = simulate(tabsWidget, { items: tabs(['a', 'b']), defaultValue: 'a' })
    const tab = render(tabsWidget.output.tab, state, 'a')
    const shown = render(tabsWidget.output.panel, state, 'a')

    expect(tab).toMatchObject({ role: 'tab', 'aria-selected': true, 'aria-controls': shown.id })
    expect(shown).toMatchObject({ role: 'tabpanel', 'aria-labelledby': tab.id, tabIndex: 0, hidden: undefined })
    expect(render(tabsWidget.output.panel, state, 'b')).toMatchObject({ hidden: 'until-found', 'aria-hidden': true, tabIndex: undefined })
    expect(render(tabsWidget.output.tab, state, 'b')['aria-selected']).toBe(false)
  })
})
