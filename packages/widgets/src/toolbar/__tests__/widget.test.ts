import { describe, expect, it } from 'vitest'
import { act, focus, key } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { ToolbarEntry, toolbarWidget } from '../widget'

const items = (keys: readonly string[], disabled: readonly string[] = []): readonly ToolbarEntry[] =>
  keys.map((value) => ({ key: value, data: { disabled: disabled.includes(value) } }))

const tabStops = (state: Parameters<typeof toolbarWidget.output.item.select>[0], keys: readonly string[]) =>
  keys.filter((value) => toolbarWidget.output.item.render(toolbarWidget.output.item.select(state, value) as never).tabIndex === 0)

describe('Critical User Paths', () => {
  it('moves the focus along the toolbar with the arrows, wrapping around the ends, and jumps to the edges', () => {
    const widget = simulate(toolbarWidget, { items: items(['bold', 'italic', 'link']) }, { orientation: 'horizontal' })

    widget.send(focus.enter, { key: 'bold' }).send(key.arrowRight, { key: 'bold' })
    expect(widget.actions).toEqual([act.focus('italic')])

    widget.send(key.arrowRight, { key: 'italic' }).send(key.arrowRight, { key: 'link' })
    expect(widget.actions).toEqual([act.focus('bold')])

    widget.send(key.arrowLeft, { key: 'bold' })
    expect(widget.actions).toEqual([act.focus('link')])

    widget.send(key.home, { key: 'link' })
    expect(widget.actions).toEqual([act.focus('bold')])

    widget.send(key.end, { key: 'bold' })
    expect(widget.actions).toEqual([act.focus('link')])
  })

  it('keeps one tab stop, on the first item until the focus enters, then on the item that had the focus last', () => {
    const keys = ['bold', 'italic', 'link']
    const widget = simulate(toolbarWidget, { items: items(keys) }, { orientation: 'horizontal' })
    expect(tabStops(widget.state, keys)).toEqual(['bold'])

    widget.send(focus.enter, { key: 'bold' }).send(focus.move, { key: 'link' }).send(focus.leave)
    expect(tabStops(widget.state, keys)).toEqual(['link'])
  })
})

describe('Edge Cases', () => {
  it('skips a disabled item and gives its tab stop to the first item when it becomes disabled', () => {
    const keys = ['bold', 'italic', 'link']
    const widget = simulate(toolbarWidget, { items: items(keys, ['italic']) }, { orientation: 'horizontal' })

    widget.send(key.arrowRight, { key: 'bold' })
    expect(widget.actions).toEqual([act.focus('link')])

    widget.send(focus.enter, { key: 'link' }).setOptions({ items: items(keys, ['link']) })
    expect(tabStops(widget.state, keys)).toEqual(['bold'])
  })

  it('leaves the arrows from an element that is not its item, like an open menu inside it, to that element', () => {
    const widget = simulate(toolbarWidget, { items: items(['bold', 'more']) }, { orientation: 'horizontal' })

    widget.send(key.arrowRight)
    expect(widget.answer).toBe('pass')
  })
})

describe('Accessibility', () => {
  it('names its orientation for the arrows a screen reader announces', () => {
    const widget = simulate(toolbarWidget, { items: items(['bold']), orientation: 'vertical' })

    expect(toolbarWidget.output.root.render(toolbarWidget.output.root.select(widget.state) as never)).toEqual({ role: 'toolbar', 'aria-orientation': 'vertical' })
  })
})
