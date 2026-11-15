import { Collection, collection } from '../collection'
import { focus, key, timer } from '../input'
import { Field, Reader } from '../state'
import { act, FocusStrategy, handled, keep, listening, show, Step } from '../step'

export const TYPEAHEAD = 'typeahead'

export interface TypeaheadOptions<S, K> {
  readonly active: Field<S, K | null>
  readonly typed: Field<S, string>
  readonly strategy: FocusStrategy
  readonly enabled?: Reader<S, boolean>
  readonly delay?: number
}

export const typeahead = <S extends { collection: Collection<K>; timers: ReadonlyMap<string, number> }, K>({ active, typed, strategy, enabled, delay = 500 }: TypeaheadOptions<S, K>): Step<S, K> => {
  const expire = timer(TYPEAHEAD)

  return listening<S, K>([key.printable, focus.leave], (state, input) => {
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
