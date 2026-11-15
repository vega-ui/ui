import { describe, expect, it } from 'vitest'
import { simulate } from '@vega-ui/core/test'
import { accordionWidget, TOGGLE_ITEM } from '../widget'

describe('Critical User Paths', () => {
  it('keeps one item open, or several in order of opening when multiple', () => {
    const single = simulate(accordionWidget, { multiple: false })
    single.send(TOGGLE_ITEM, { value: 'one', to: true }).send(TOGGLE_ITEM, { value: 'two', to: true })
    expect(single.state.opened).toEqual(['two'])

    const multiple = simulate(accordionWidget, { multiple: true })
    multiple.send(TOGGLE_ITEM, { value: 'two', to: true }).send(TOGGLE_ITEM, { value: 'one', to: true }).send(TOGGLE_ITEM, { value: 'two', to: true })
    expect(multiple.state.opened).toEqual(['two', 'one'])

    multiple.send(TOGGLE_ITEM, { value: 'two', to: false })
    expect(multiple.state.opened).toEqual(['one'])
  })
})
