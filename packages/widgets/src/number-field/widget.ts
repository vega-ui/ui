import { controlled, defineWidget, focus, handled, Input, internal, key, listening, matching, nav, pointer, ROOT, state, Step } from '@vega-ui/core'
import { addWithPrecision, clamp } from '@vega-ui/utils'
import { applyNumberEdit, blurredNumber, calibrateNumberField, formatMaskedNumber, maskedField, NumberMask, PendingText } from '../mask'
import { getNumberValue } from './getNumberValue'

export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'

export const numberFieldShape = state({
  options: {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
    maximumFractionDigits: 2,
    allowEmpty: true,
    changeOnWheel: true,
  },
  owns: { value: controlled(NaN) },
  internal: { text: internal(''), pending: internal(undefined as PendingText | undefined), committed: internal(''), touched: internal(false) },
  observes: { readOnly: matching(ROOT, '[readonly]'), inputFocused: matching(ROOT, ':focus') },
  parts: [ROOT, INCREMENT, DECREMENT],
})

type NumberFieldSnapshot = typeof numberFieldShape.__snapshot

const maskOf = ({ options }: NumberFieldSnapshot): NumberMask => ({ min: options.min, max: options.max, fractionDigits: options.maximumFractionDigits })

const numberField = maskedField<NumberFieldSnapshot, number>({
  text: numberFieldShape.text,
  value: numberFieldShape.value,
  pending: numberFieldShape.pending,
  committed: numberFieldShape.committed,
  touched: numberFieldShape.touched,
  edit: (state, field, edit) => applyNumberEdit(field, edit, maskOf(state)),
  calibrate: (state, field) => calibrateNumberField(field, maskOf(state)),
  parse: (_state, shown) => getNumberValue(shown),
  format: (state, value) => formatMaskedNumber(value, maskOf(state)),
})

export const { defaultTextOf } = numberField

export const isMinOf = (state: NumberFieldSnapshot) => Number.isFinite(state.value) && state.value <= state.options.min

export const isMaxOf = (state: NumberFieldSnapshot) => Number.isFinite(state.value) && state.value >= state.options.max

const PAGE = 10

const hasMin = (state: NumberFieldSnapshot) => state.options.min !== Number.MIN_SAFE_INTEGER

const hasMax = (state: NumberFieldSnapshot) => state.options.max !== Number.MAX_SAFE_INTEGER

const startOf = (state: NumberFieldSnapshot) => {
  const { min, max } = state.options

  return clamp(min, hasMin(state) ? min : 0, max)
}

const steppedNumber = (state: NumberFieldSnapshot, direction: 1 | -1, steps = 1) => {
  const { min, max, step } = state.options
  if (state.text === '') return startOf(state)

  return clamp(min, addWithPrecision(getNumberValue(state.text), direction * step * steps), max)
}

const directionOf = (state: NumberFieldSnapshot, input: Input): 1 | -1 | undefined => {
  if (state.readOnly) return undefined
  if (input.is(key.arrowUp)) return 1
  if (input.is(key.arrowDown)) return -1
  if (input.is(pointer.press) && input.part === INCREMENT) return 1
  if (input.is(pointer.press) && input.part === DECREMENT) return -1
  if (!input.is(pointer.spin) || input.part !== ROOT || !state.options.changeOnWheel || !state.inputFocused) return undefined

  return (input.delta?.y ?? 0) < 0 ? 1 : -1
}

const onStepper = (input: Input) => input.part === INCREMENT || input.part === DECREMENT

const targetOf = (state: NumberFieldSnapshot, input: Input) => {
  if (state.readOnly) return undefined
  if (onStepper(input) && !input.is(pointer.press)) return undefined
  if (input.is(nav.first)) return hasMin(state) ? state.options.min : undefined
  if (input.is(nav.last)) return hasMax(state) ? state.options.max : undefined
  if (input.is(nav.pageBackward)) return steppedNumber(state, 1, PAGE)
  if (input.is(nav.pageForward)) return steppedNumber(state, -1, PAGE)

  const direction = directionOf(state, input)
  if (direction === undefined) return undefined

  return steppedNumber(state, direction)
}

const stepping = listening<NumberFieldSnapshot>([key.arrowUp, key.arrowDown, nav.first, nav.last, nav.pageBackward, nav.pageForward, pointer.spin, pointer.press], (state, input) => {
  const target = targetOf(state, input)
  if (target === undefined) return undefined

  const shown = formatMaskedNumber(target, maskOf(state))
  const answer = numberField.shown(state, { value: shown, selection: [shown.length, shown.length] }, true)

  return handled(answer.state, answer.actions)
})

const leaving = listening<NumberFieldSnapshot>([focus.leave, focus.move], (state, input) => {
  if (!input.is(focus.leave) && !input.is(focus.move)) return undefined
  if (input.is(focus.move) && input.part === ROOT) return undefined

  const blurred = blurredNumber(state.text, maskOf(state))
  const filled = blurred === '' && !state.options.allowEmpty ? formatMaskedNumber(startOf(state), maskOf(state)) : blurred
  if (filled === state.text) return numberField.left(state)

  const answer = numberField.shown(state, { value: filled, selection: [filled.length, filled.length] })

  return numberField.left(answer.state, answer.actions)
})

const steps: Step<NumberFieldSnapshot>[] = [stepping, leaving, ...numberField.steps]

export const numberFieldWidget = defineWidget({
  state: numberFieldShape,

  step: steps,

  output: {
    root: numberFieldShape.part(
      (state) => [state.touched, state.value, hasMin(state) ? state.options.min : undefined, hasMax(state) ? state.options.max : undefined] as const,
      ([touched, value, min, max]) => ({
        role: 'spinbutton',
        'aria-valuenow': Number.isFinite(value) ? value : undefined,
        'aria-valuemin': min,
        'aria-valuemax': max,
        'data-user-edited': touched || undefined,
      }),
    ),
  },
})
