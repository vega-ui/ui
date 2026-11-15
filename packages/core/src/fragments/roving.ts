import { Collection, collection } from '../collection'
import { focus, nav, pointer } from '../input'
import { Field } from '../state'
import { FocusStrategy, handled, keep, listening, show, Step } from '../step'

export interface RovingOptions<S, K> {
  readonly active: Field<S, K | null>
  readonly strategy: FocusStrategy
  readonly hover?: boolean
  readonly page?: number
  readonly wrap?: boolean
}

export const roving = <S extends { collection: Collection<K> }, K>({ active, strategy, hover = false, page, wrap = false }: RovingOptions<S, K>): Step<S, K> => {
  const move = (state: S, key: K | null) => (key == null ? handled(state) : handled(active.set(state, key), [show(strategy, key)]))

  const paged = (items: Collection<K>, current: K | null, distance: number) => {
    const position = collection.has(items, current) ? items.index.get(current)! : -1

    return collection.nearest(items, position + distance)
  }

  const listens = [nav.forward, nav.backward, nav.first, nav.last, nav.pageForward, nav.pageBackward, focus.enter, pointer.down, ...(hover ? [pointer.hover] : [])]

  return listening<S, K>(listens, (state, input) => {
    const items = state.collection
    const current = active.get(state)

    if (input.is(nav.forward)) return move(state, collection.next(items, current) ?? (wrap ? collection.first(items) : null))
    if (input.is(nav.backward)) return move(state, collection.previous(items, current) ?? (wrap ? collection.last(items) : null))
    if (input.is(nav.first)) return move(state, collection.first(items))
    if (input.is(nav.last)) return move(state, collection.last(items))
    if (page !== undefined && input.is(nav.pageForward)) return move(state, paged(items, current, page))
    if (page !== undefined && input.is(nav.pageBackward)) return move(state, paged(items, current, -page))
    if (input.is(focus.enter) && current == null) return move(state, collection.first(items))

    const pointed = input.is(pointer.down) || (hover && input.is(pointer.hover))
    if (!pointed || !collection.has(items, input.key) || !collection.isNavigable(items, input.key)) return undefined

    return keep(active.set(state, input.key))
  })
}
