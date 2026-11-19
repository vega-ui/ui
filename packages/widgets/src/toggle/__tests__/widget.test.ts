import { describe, expect, it, vi } from 'vitest'
import { pointer } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { toggleWidget } from '../widget'

const pressedOf = (state: Parameters<typeof toggleWidget.output.root.select>[0]) => toggleWidget.output.root.render(toggleWidget.output.root.select(state) as never)['aria-pressed']

describe('Critical User Paths', () => {
  it('turns on and off on a press and reports it, leaving the click to the browser', () => {
    const onChangePressed = vi.fn()
    const widget = simulate(toggleWidget, { onChangePressed })

    widget.send(pointer.press)
    expect(widget.answer).toBe('keep')
    expect(pressedOf(widget.state)).toBe(true)
    expect(onChangePressed).toHaveBeenLastCalledWith(true)

    widget.send(pointer.press)
    expect(pressedOf(widget.state)).toBe(false)
    expect(onChangePressed).toHaveBeenLastCalledWith(false)
  })
})
