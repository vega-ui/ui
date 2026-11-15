import { describe, expect, it } from 'vitest'
import { connect, createElements } from '..'
import { createWidget, defineWidget } from '../../widget'
import { keep, listening } from '../../step'
import { browser, layout, text } from '../../input'
import { state } from '../../state'

describe('Edge Cases', () => {
  it('connects on the server, where there is no page to listen to', () => {
    const shape = state({ options: {}, owns: {} })
    const widget = defineWidget({
      state: shape,
      step: [listening([browser.reset, layout.resize, layout.viewport, text.select], (current) => keep(current))],
      output: {},
    })

    expect(() => connect(createWidget(widget, {}, { id: 'widget' }), createElements()).disconnect()).not.toThrow()
  })
})
