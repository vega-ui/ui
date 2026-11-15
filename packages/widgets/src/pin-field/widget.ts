import { act, browser, command, controlled, defineWidget, focus, handled, Input, internal, keep, key, lifecycle, listening, matching, nav, ROOT, source, state, Step, text, TextState } from '@vega-ui/core'
import { clamp } from '@vega-ui/utils'
import { applyEdit, applyMaskEdit, calibrateMask, MaskEntry } from '../mask'

export const SELECT_SLOT = command('selectSlot')

const slots = source({ key: (slot: number) => slot })

const slotLists = new Map<number, readonly number[]>()

const slotsOf = (maxLength: number) => {
  const known = slotLists.get(maxLength)
  if (known) return known

  const list = Array.from({ length: maxLength }, (_, slot) => slot)
  slotLists.set(maxLength, list)

  return list
}

export const pinFieldShape = state({
  options: {
    maxLength: 4,
    mask: undefined as readonly MaskEntry[] | RegExp | undefined,
    disabled: false as boolean | undefined,
  },
  owns: { value: controlled('') },
  internal: {
    active: internal(0),
    selectedAll: internal(false),
    pending: internal(undefined as { value: string; slot: number } | undefined),
    committed: internal(''),
    touched: internal(false),
  },
  observes: { password: matching(ROOT, '[type="password"]') },
  collection: (options) => slots.of(slotsOf(options.maxLength)),
})

type PinFieldSnapshot = typeof pinFieldShape.__snapshot

const DIGITS = /^\d+$/

const fitsMask = (state: PinFieldSnapshot, value: string) => {
  const mask = state.options.mask ?? DIGITS
  if (value === '') return true
  if (mask instanceof RegExp) return mask.test(value)

  return calibrateMask(value, mask) === value
}

const limited = (state: PinFieldSnapshot, field: TextState, data: string) => {
  const [from, to] = field.selection
  const room = state.options.maxLength - (field.value.length - (to - from))

  return data.slice(0, Math.max(room, 0))
}

const edited = (state: PinFieldSnapshot, field: TextState, edit: { type: string; data: string }) => {
  const { mask } = state.options
  if (mask && !(mask instanceof RegExp)) return applyMaskEdit(field, edit, mask)

  return applyEdit(field, { ...edit, data: limited(state, field, edit.data) })
}

const slotOf = (state: PinFieldSnapshot, position: number) => clamp(0, position, state.options.maxLength - 1)

const selected = (state: PinFieldSnapshot, value: string, position: number) => {
  const slot = slotOf(state, position)

  if (value !== state.value && pinFieldShape.value.controlled(state)) {
    const next = pinFieldShape.pending.set(pinFieldShape.value.set(state, value), { value, slot })

    return { state: next, actions: [act.setText(ROOT, state.value)] }
  }

  const next = pinFieldShape.active.set(pinFieldShape.value.set(state, value), slot)

  return { state: next, actions: [act.setText(ROOT, value, [slot, slot + 1])] }
}

const syncing: Step<PinFieldSnapshot> = (state, input) => {
  if (!input.is(lifecycle.connect) && !input.is(lifecycle.options)) return undefined

  const { pending } = state
  if (pending?.value !== state.value) return keep(pinFieldShape.committed.set(state, state.value), [act.setText(ROOT, state.value)])

  const next = pinFieldShape.pending.set(pinFieldShape.active.set(state, pending.slot), undefined)

  return keep(next, [act.setText(ROOT, state.value, [pending.slot, pending.slot + 1])])
}

const editing = listening<PinFieldSnapshot>([text.edit], (state, input) => {
  if (!input.is(text.edit) || !input.field || !input.edit) return undefined

  const next = edited(state, input.field, input.edit)
  if (!next) return undefined
  if (!fitsMask(state, next.value)) return handled(state)

  const answer = selected(state, next.value, next.selection[0])

  return handled(answer.state, answer.actions)
})

const changing = listening<PinFieldSnapshot>([text.change], (state, input) => {
  if (!input.is(text.change) || !input.field) return undefined
  if (!fitsMask(state, input.field.value)) return keep(state, [act.setText(ROOT, state.value)])

  const answer = selected(state, input.field.value, input.field.selection[0])

  return keep(answer.state, answer.actions)
})

const targetOf = (input: Input, field: TextState) => {
  if (input.is(nav.first) || input.is(key.arrowUp)) return 0
  if (input.is(nav.last) || input.is(key.arrowDown)) return field.value.length
  if (input.is(nav.backward)) return field.selection[0] - 1
  if (input.is(nav.forward)) return field.selection[0] + 1

  return undefined
}

const moving = listening<PinFieldSnapshot>([nav.backward, nav.forward, nav.first, nav.last, key.arrowUp, key.arrowDown], (state, input) => {
  if (!input.field) return undefined

  const position = targetOf(input, input.field)
  if (position === undefined) return undefined

  const answer = selected(state, input.field.value, position)

  return handled(answer.state, answer.actions)
})

const focusing = listening<PinFieldSnapshot>([focus.enter, focus.leave], (state, input) => {
  if (input.is(focus.leave)) {
    const left = pinFieldShape.pending.set(pinFieldShape.active.set(state, -1), undefined)
    if (state.value === state.committed) return keep(left)

    return keep(pinFieldShape.touched.set(pinFieldShape.committed.set(left, state.value), true), [act.commit(ROOT)])
  }
  if (!input.is(focus.enter)) return undefined

  const answer = selected(pinFieldShape.committed.set(state, state.value), state.value, state.value.length)

  return keep(answer.state, answer.actions)
})

const slotting: Step<PinFieldSnapshot> = (state, input) => {
  if (!input.is(SELECT_SLOT) || state.options.disabled) return undefined

  const answer = selected(state, state.value, Number(input.to))

  return handled(answer.state, [act.focusPart(ROOT), ...answer.actions])
}

const selecting = listening<PinFieldSnapshot>([text.select], (state, input) => {
  if (!input.is(text.select) || !input.field) return undefined

  const { value, selection: [start, end] } = input.field

  return keep(pinFieldShape.selectedAll.set(state, start === 0 && end === value.length && value.length !== 0))
})

const resetting = listening<PinFieldSnapshot>([browser.reset], (state, input) => {
  if (!input.is(browser.reset)) return undefined

  const value = pinFieldShape.value.controlled(state) ? state.value : state.options.defaultValue ?? ''

  const restored = pinFieldShape.touched.set(pinFieldShape.committed.set(pinFieldShape.value.set(state, value), value), false)

  return keep(restored, [act.setText(ROOT, value)])
})

export const slotGlyphOf = (state: PinFieldSnapshot, slot: number) => {
  const char = state.value[slot]
  if (state.password && char) return '•'

  return char
}

export const slotPart = pinFieldShape.part(
  (state, slot) => [state.value[slot] === undefined, state.active === slot, state.selectedAll, state.options.disabled] as const,
  ([empty, caret, selectedAll, disabled]) => ({
    'aria-hidden': 'true',
    'data-placeholder': empty,
    'data-caret': caret,
    'data-active': caret || selectedAll,
    'data-disabled': disabled,
  }),
)

export const pinFieldWidget = defineWidget({
  state: pinFieldShape,

  step: [syncing, editing, changing, moving, focusing, slotting, selecting, resetting],

  output: {
    root: pinFieldShape.part((state) => [state.touched] as const, ([touched]) => ({ 'data-user-edited': touched || undefined })),
  },
})
