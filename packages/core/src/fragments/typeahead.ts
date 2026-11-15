import { Collection, collection } from '../collection'
import { focus, key, timer } from '../input'
import { Field, Reader } from '../state'
import { act, FocusStrategy, handled, keep, listening, show, Step } from '../step'

export const TYPEAHEAD = 'typeahead'

export interface TypeaheadOptions<State, Key> {
  readonly active: Field<State, Key | null>
  readonly typed: Field<State, string>
  readonly strategy: FocusStrategy
  readonly enabled?: Reader<State, boolean>
  readonly delay?: number
}

export const typeahead = <State extends { collection: Collection<Key>; timers: ReadonlyMap<string, number> }, Key>({ active, typed, strategy, enabled, delay = 500 }: TypeaheadOptions<State, Key>): Step<State, Key> => {
  const expire = timer(TYPEAHEAD)

  return listening<State, Key>([key.printable, focus.leave], (state, input) => {
    if (input.is(expire)) return handled(typed.set(state, ''))
    if (input.is(focus.leave) && typed.get(state) !== '') return keep(typed.set(state, ''), [act.cancelTimer(TYPEAHEAD)])
    if (enabled && !enabled.get(state)) return undefined
    if (!input.is(key.printable) || input.char === undefined) return undefined

    const text = (state.timers.has(TYPEAHEAD) ? typed.get(state) : '') + input.char
    const repeated = [...text].every((char) => char === input.char)
    const found = collection.findByLabel(state.collection, repeated ? input.char : text, active.get(state), !repeated)

    const next = typed.set(state, text)
    if (found == null) return handled(next, [act.timer(TYPEAHEAD, delay)])

    return handled(active.set(next, found), [act.timer(TYPEAHEAD, delay), show(strategy, found)])
  })
}
