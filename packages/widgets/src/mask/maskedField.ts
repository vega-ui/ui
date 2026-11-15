import { act, Action, browser, command, Field, focus, handled, keep, key, KeyOfState, lifecycle, listening, OwnedField, ROOT, Step, text, TextEdit, TextState } from '@vega-ui/core'
import { toLatinDigits } from '@vega-ui/i18n'
import { applyMaskEdit, calibrateMaskField, MaskEntry } from './templateMask'

type FieldStep<State> = Step<State, KeyOfState<State>, typeof ROOT>

export interface PendingText extends TextState {
  readonly commit: boolean
}

export interface MaskedSnapshot<Value> {
  readonly text: string
  readonly value: Value
  readonly pending: PendingText | undefined
  readonly committed: string
  readonly touched: boolean
  readonly readOnly?: boolean
  readonly options: { readonly value?: Value; readonly defaultValue?: Value }
}

export interface MaskedFieldRules<State extends MaskedSnapshot<Value>, Value, Picked> {
  readonly text: Field<State, string>
  readonly value: OwnedField<State, Value>
  readonly pending: Field<State, PendingText | undefined>
  readonly committed: Field<State, string>
  readonly touched: Field<State, boolean>
  edit(state: State, field: TextState, edit: TextEdit): TextState | undefined
  calibrate(state: State, field: TextState): TextState
  parse(state: State, shown: string): Value
  format(state: State, value: Value): string
  same?(first: Value, second: Value): boolean
  stepped?(state: State, field: TextState, direction: 1 | -1): TextState | undefined
  picked?(state: State, picked: Picked): string
  follow?(state: State, shown: string): State
}

const latin = (field: TextState): TextState => ({ ...field, value: toLatinDigits(field.value) })

const sameField = (first: TextState, second: TextState) =>
  first.value === second.value && first.selection[0] === second.selection[0] && first.selection[1] === second.selection[1]

const collapsed = (shown: string): TextState => ({ value: shown, selection: [shown.length, shown.length] })

/**
 * Masks a field by a template: typed characters replace the ones after the
 * caret and the text is normalized after every edit, like a day `4` padded
 * to `04`.
 */
export const templateEditing = <State>(mask: (state: State) => readonly MaskEntry[], normalize: (state: State, shown: string) => string) => {
  const normalized = (state: State, field: TextState): TextState => {
    const value = normalize(state, field.value)
    const shift = value.length - field.value.length
    const [start, end] = field.selection

    return { value, selection: [start + shift, end + shift] }
  }

  return {
    edit: (state: State, field: TextState, edit: TextEdit) => {
      const edited = applyMaskEdit(latin(field), { ...edit, data: toLatinDigits(edit.data) }, mask(state), '0')
      if (!edited) return undefined

      return normalized(state, edited)
    },
    calibrate: (state: State, field: TextState) => normalized(state, calibrateMaskField(latin(field), mask(state), '0')),
  }
}

/**
 * Builds the steps of a masked field: the widget keeps the shown `text` and
 * the `value` parsed from it, masks every edit before the browser applies
 * it, calibrates a change made without an edit, like autofill, and restores
 * the default text on a form reset. A text that changes a value a parent
 * controls is shown once the parent accepts the value.
 *
 * The browser does not count a text the widget writes as an edit of the
 * user, so the widget commits it itself: leaving a field the user changed
 * dispatches `change`, and the field is marked `touched`, the state
 * `:user-invalid` follows for a native field.
 */
export const maskedField = <State extends MaskedSnapshot<Value>, Value, Picked = never>(rules: MaskedFieldRules<State, Value, Picked>) => {
  const pick = command<{ readonly to: Picked }>()('pickValue')
  const same = rules.same ?? Object.is

  const written = (state: State, shown: string) => {
    const next = rules.pending.set(rules.text.set(state, shown), undefined)
    const value = rules.parse(next, shown)
    if (same(value, next.value)) return next

    return rules.value.set(next, value)
  }

  const committedAt = (state: State, shownText: string) => rules.touched.set(rules.committed.set(state, shownText), true)

  const textAction = (field: TextState, commit: boolean): Action<never, typeof ROOT> => (commit ? act.commitText(ROOT, field.value) : act.setText(ROOT, field.value, field.selection))

  const shown = (state: State, field: TextState, commit = false): { state: State; actions: Action<never, typeof ROOT>[] } => {
    const followed = rules.follow ? rules.follow(state, field.value) : state
    const value = rules.parse(followed, field.value)
    if (same(value, followed.value) || !rules.value.controlled(followed)) {
      const next = written(followed, field.value)

      return { state: commit ? committedAt(next, field.value) : next, actions: [textAction(field, commit)] }
    }

    const next = rules.pending.set(rules.value.set(followed, value), { ...field, commit })

    return { state: next, actions: [act.setText(ROOT, state.text)] }
  }

  const calibrated = (state: State, shownText: string) => rules.calibrate(state, collapsed(shownText)).value

  const textOf = (state: State, value: Value | undefined) => (value === undefined ? '' : rules.format(state, value))

  const shownTextOf = (state: State) => (same(rules.parse(state, state.text), state.value) ? state.text : rules.format(state, state.value))

  const defaultTextOf = (state: State) => textOf(state, state.options.value ?? state.options.defaultValue)

  const syncing: FieldStep<State> = (state, input) => {
    if (!input.is(lifecycle.connect) && !input.is(lifecycle.options)) return undefined

    const { pending } = state
    if (pending && same(rules.parse(state, pending.value), state.value)) {
      const next = written(state, pending.value)

      return keep(pending.commit ? committedAt(next, pending.value) : next, [textAction(pending, pending.commit)])
    }

    const next = calibrated(state, shownTextOf(state))
    if (next === state.text) return keep(rules.pending.set(state, undefined))

    const shown = input.is(lifecycle.options) ? rules.pending.set(rules.text.set(state, next), undefined) : written(state, next)

    return keep(rules.committed.set(shown, next), [act.setText(ROOT, next)])
  }

  const editing = listening<State, KeyOfState<State>, typeof ROOT>([text.edit], (state, input) => {
    if (!input.is(text.edit) || !input.field || !input.edit) return undefined

    const next = rules.edit(state, input.field, input.edit)
    if (!next) return undefined
    if (sameField(next, input.field)) return handled(state)

    const answer = shown(state, next)

    return handled(answer.state, answer.actions)
  })

  const changing = listening<State, KeyOfState<State>, typeof ROOT>([text.change], (state, input) => {
    if (!input.is(text.change) || !input.field) return undefined

    const next = rules.calibrate(state, input.field)
    const answer = shown(state, next)
    if (next.value === input.field.value && !answer.state.pending) return keep(answer.state)

    return keep(answer.state, answer.actions)
  })

  const stepping = listening<State, KeyOfState<State>, typeof ROOT>([key.arrowUp, key.arrowDown], (state, input) => {
    if ((!input.is(key.arrowUp) && !input.is(key.arrowDown)) || !input.field || !rules.stepped || state.readOnly) return undefined

    const stepped = rules.stepped(state, latin(input.field), input.is(key.arrowUp) ? 1 : -1)
    if (!stepped) return undefined

    const answer = shown(state, stepped)

    return handled(answer.state, answer.actions)
  })

  const picking: FieldStep<State> = (state, input) => {
    if (!input.is(pick) || !rules.picked || state.readOnly) return undefined

    const answer = shown(state, collapsed(calibrated(state, rules.picked(state, input.to))), true)

    return handled(answer.state, answer.actions)
  }

  const resetting = listening<State, KeyOfState<State>, typeof ROOT>([browser.reset], (state, input) => {
    if (!input.is(browser.reset)) return undefined

    const next = calibrated(state, textOf(state, rules.value.controlled(state) ? state.value : state.options.defaultValue))
    const restored = rules.touched.set(rules.committed.set(written(state, next), next), false)

    return keep(restored, [act.setText(ROOT, next)])
  })

  const left = (state: State, actions: Action<never, typeof ROOT>[] = []) => {
    const settled = rules.pending.set(state, undefined)
    if (settled.text === settled.committed) return keep(settled, actions)

    return keep(committedAt(settled, settled.text), [...actions, act.commit(ROOT)])
  }

  const committing = listening<State, KeyOfState<State>, typeof ROOT>([focus.enter, focus.leave], (state, input) => {
    if (input.is(focus.enter)) return keep(rules.committed.set(state, state.text))
    if (!input.is(focus.leave)) return undefined

    return left(state)
  })

  return { pick, shownTextOf, defaultTextOf, shown, left, steps: [syncing, editing, changing, stepping, picking, resetting, committing] }
}
