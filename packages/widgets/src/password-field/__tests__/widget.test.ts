import { describe, expect, it, vi } from 'vitest'
import { createInput } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { passwordFieldWidget, TOGGLE_SHOWN } from '../widget'

type Output = typeof passwordFieldWidget.output

const partsOf = (state: ReturnType<typeof simulate<typeof passwordFieldWidget.shape>>['state']) => Object.fromEntries(
  (Object.keys(passwordFieldWidget.output) as (keyof Output)[]).map((name) => [name, passwordFieldWidget.output[name].render(passwordFieldWidget.output[name].select(state, undefined as never))]),
)

describe('Critical User Paths', () => {
  it('shows the password on a toggle, hides it on the next one and reports each change', () => {
    const onChangeShown = vi.fn()
    const passwordField = simulate(passwordFieldWidget, { onChangeShown }, { orientation: 'horizontal' })

    passwordField.send(createInput(TOGGLE_SHOWN))
    expect(passwordField.state.shown).toBe(true)

    passwordField.send(createInput(TOGGLE_SHOWN))
    expect(passwordField.state.shown).toBe(false)
    expect(onChangeShown.mock.calls).toEqual([[true], [false]])
  })

  it('turns the input into a text field, presses the toggle and swaps the icons while shown', () => {
    const passwordField = simulate(passwordFieldWidget, {}, { orientation: 'horizontal' })
    expect(partsOf(passwordField.state)).toEqual({
      input: { type: 'password' },
      toggle: { 'aria-pressed': false },
      shownIcon: { 'data-hidden': false },
      hiddenIcon: { 'data-hidden': true },
    })

    passwordField.send(createInput(TOGGLE_SHOWN))
    expect(partsOf(passwordField.state)).toEqual({
      input: { type: 'text' },
      toggle: { 'aria-pressed': true },
      shownIcon: { 'data-hidden': true },
      hiddenIcon: { 'data-hidden': false },
    })
  })
})
