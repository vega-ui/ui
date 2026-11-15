import { Collection, collection } from '../collection'
import { InputSpec, key, mod, nav, pointer, timer } from '../input'
import { Field, Reader } from '../state'
import { act, FocusStrategy, handled, keep, Result, show, Step } from '../step'

export const DRAGGED = 'dragged'

export type SelectionMode = 'single' | 'multiple' | 'range'

export type ExtendMode = 'toggle' | 'range'

export interface Extension<Key> {
  readonly anchor: Key
  readonly base: readonly Key[]
  readonly to: Key
  readonly value: readonly Key[]
}

export interface Gesture<Key> {
  readonly phase: 'idle' | 'pressed' | 'dragging' | 'dragged'
  readonly pointed?: Key
  readonly from?: Key
}

export const IDLE_GESTURE: Gesture<never> = { phase: 'idle' }

export interface SelectionOptions<State, Key> {
  readonly value: Field<State, readonly Key[]>
  readonly active: Field<State, Key | null>
  readonly anchor: Field<State, Key | null>
  readonly mode: Reader<State, SelectionMode | undefined>
  readonly strategy: FocusStrategy
  readonly keys?: readonly InputSpec[]
  readonly extend?: ExtendMode
  readonly extension?: Field<State, Extension<Key> | null>
  readonly gesture?: Field<State, Gesture<Key>>
  readonly selectable?: (state: State, key: Key) => boolean
  readonly between?: (state: State, from: Key, to: Key) => readonly Key[]
  readonly compare?: (state: State, first: Key, second: Key) => number
  readonly resolveRange?: (state: State, start: Key, end: Key) => readonly Key[] | undefined
  readonly all?: (state: State) => readonly Key[] | undefined
}

export interface Selection<State, Key> {
  (state: State, input: Parameters<Step<State, Key>>[1]): Result<State, Key> | undefined
  readonly listens: readonly InputSpec[]
  isSelected(state: State, key: Key): boolean
  edges(state: State): readonly [Key, Key] | undefined
  toggle(state: State, key: Key): State
  extend(state: State, from: Key, to: Key): State
  selectAll(state: State): State
  press(state: State, key: Key): State
  drag(state: State, key: Key): State
}

const SHIFT_FORWARD = key.with(nav.forward, mod.shift)
const SHIFT_BACKWARD = key.with(nav.backward, mod.shift)
const SHIFT_SPACE = key.with(key.space, mod.shift)
const TO_FIRST = key.with(nav.first, mod.shift, mod.mod)
const TO_LAST = key.with(nav.last, mod.shift, mod.mod)
const SELECT_ALL = key.with(key.a, mod.mod)

export const isSelected = <Key>(value: readonly Key[], target: Key) => value.includes(target)

const sets = new WeakMap<readonly unknown[], ReadonlySet<unknown>>()

const setOf = <Key>(keys: readonly Key[]): ReadonlySet<Key> => {
  let found = sets.get(keys)
  if (!found) sets.set(keys, (found = new Set(keys)))

  return found as ReadonlySet<Key>
}

const sameKeys = <Key>(current: readonly Key[], next: readonly Key[]) => current.length === next.length && next.every((key) => setOf(current).has(key))

const union = <Key>(current: readonly Key[], added: readonly Key[]) => [...current, ...added.filter((key) => !setOf(current).has(key))]

export const selection = <State extends { collection: Collection<Key> }, Key>(options: SelectionOptions<State, Key>): Selection<State, Key> => {
  const { active, anchor, mode, strategy, keys = [key.space], extend: extendMode = 'toggle', extension, gesture } = options
  const value: Field<State, readonly Key[]> = {
    ...options.value,
    set: (state, next) => (sameKeys(options.value.get(state), next) ? state : options.value.set(state, next)),
  }
  const selectable = options.selectable ?? ((state: State, target: Key) => collection.isNavigable(state.collection, target))
  const compare = options.compare ?? ((state: State, first: Key, second: Key) => (state.collection.index.get(first) ?? 0) - (state.collection.index.get(second) ?? 0))
  const between = options.between ?? ((state: State, from: Key, to: Key) => collection.between(state.collection, from, to))
  const edgeCache = new WeakMap<readonly Key[], { collection: Collection<Key>; edges: readonly [Key, Key] }>()

  const ordered = (state: State, first: Key, second: Key): [Key, Key] => (compare(state, first, second) > 0 ? [second, first] : [first, second])

  const edges = (state: State): readonly [Key, Key] | undefined => {
    const current = value.get(state)
    if (mode.get(state) !== 'range' || current.length === 0) return undefined

    const cached = edgeCache.get(current)
    if (cached && cached.collection === state.collection) return cached.edges

    const sorted = [...current].sort((first, second) => compare(state, first, second))
    const found = [sorted[0], sorted[sorted.length - 1]] as const
    edgeCache.set(current, { collection: state.collection, edges: found })

    return found
  }

  const selected = (state: State, target: Key): boolean => {
    if (mode.get(state) !== 'range') return setOf(value.get(state)).has(target)

    const found = edges(state)
    return found !== undefined && compare(state, target, found[0]) >= 0 && compare(state, target, found[1]) <= 0
  }

  const rangeValue = (state: State, first: Key, second: Key): readonly Key[] => {
    const [start, end] = ordered(state, first, second)
    const resolved = options.resolveRange?.(state, start, end)
    if (resolved) return resolved

    return start === end ? [start] : [start, end]
  }

  const keysBetween = (state: State, first: Key, second: Key): readonly Key[] => {
    const [start, end] = ordered(state, first, second)
    const resolved = options.resolveRange?.(state, start, end)
    if (resolved) return resolved

    return between(state, start, end).filter((target) => selectable(state, target))
  }

  const clearExtension = (state: State) => (extension ? extension.set(state, null) : state)

  const toggle = (state: State, target: Key): State => {
    if (!selectable(state, target)) return state

    switch (mode.get(state)) {
      case 'single': return value.set(state, [target])
      case 'range': {
        const found = edges(state)
        if (found && found[0] === found[1] && found[0] !== target) return value.set(state, rangeValue(state, found[0], target))

        return value.set(state, [target])
      }
      case 'multiple': {
        const current = value.get(state)
        const cleared = anchor.set(clearExtension(state), target)
        if (selected(state, target)) return value.set(cleared, current.filter((key) => key !== target))

        return value.set(cleared, [...current, target])
      }
      default: return state
    }
  }

  const anchorFor = (state: State, fallback: Key) => {
    const anchored = anchor.get(state)
    if (anchored != null && collection.has(state.collection, anchored) && selected(state, anchored)) return anchored

    return fallback
  }

  const extendMultiple = (state: State, from: Key, to: Key): State => {
    const previous = extension?.get(state)
    const current = value.get(state)
    const continued = previous && previous.to === from && sameKeys(previous.value, current) ? previous : { anchor: anchorFor(state, from), base: current, to: from, value: current }
    const chosen = setOf(current)
    const kept = continued.base.filter((key) => chosen.has(key))
    const next = value.set(active.set(state, to), union(kept, keysBetween(state, continued.anchor, to)))

    return extension ? extension.set(next, { ...continued, to, value: value.get(next) }) : next
  }

  const extendRange = (state: State, from: Key, to: Key): State => {
    const found = edges(state)
    if (!found || !selectable(state, to)) return state

    const [start, end] = found
    return value.set(active.set(state, to), rangeValue(state, start === from ? end : start, to))
  }

  const extend = (state: State, from: Key, to: Key): State => {
    switch (mode.get(state)) {
      case 'multiple': return extendMultiple(state, from, to)
      case 'range': return extendRange(state, from, to)
      default: return state
    }
  }

  const selectAll = (state: State): State => {
    if (mode.get(state) !== 'multiple') return state

    const every = options.all?.(state) ?? state.collection.order.filter((target) => selectable(state, target))
    return value.set(clearExtension(state), every)
  }

  const press = (state: State, target: Key): State => {
    if (!gesture || !selectable(state, target)) return state

    switch (mode.get(state)) {
      case 'multiple': {
        const started = extension ? extension.set(state, { anchor: target, base: value.get(state), to: target, value: value.get(state) }) : state
        return gesture.set(started, { phase: 'pressed', pointed: target })
      }
      case 'range': {
        const found = edges(state)
        if (!found || (target !== found[0] && target !== found[1])) return state

        return gesture.set(state, { phase: 'dragging', pointed: target, from: target === found[0] ? found[1] : found[0] })
      }
      default: return state
    }
  }

  const drag = (state: State, target: Key): State => {
    if (!gesture) return state

    const { phase, pointed, from } = gesture.get(state)
    if ((phase !== 'pressed' && phase !== 'dragging') || pointed === undefined || target === pointed) return state

    const dragging = gesture.set(state, { phase: 'dragging', pointed: target, from })
    if (mode.get(state) !== 'range') return extendMultiple(dragging, pointed, target)
    if (from === undefined || !selectable(state, target)) return dragging

    return value.set(dragging, rangeValue(state, from, target))
  }

  const step: Step<State, Key> = (state, input) => {
    const current = mode.get(state)
    if (current === undefined) return undefined

    const items = state.collection
    const multiple = current === 'multiple'

    if (gesture && (input.is(pointer.release) || input.is(pointer.cancel))) {
      if (gesture.get(state).phase !== 'dragging') return keep(gesture.set(state, IDLE_GESTURE))

      return keep(gesture.set(state, { phase: 'dragged' }), [act.timer(DRAGGED, 0)])
    }

    if (gesture && input.is(timer(DRAGGED))) return keep(gesture.set(state, IDLE_GESTURE))

    if (input.is(pointer.press)) {
      if (gesture && gesture.get(state).phase === 'dragged') return keep(gesture.set(state, IDLE_GESTURE))
      if (input.inside || !collection.has(items, input.key) || !selectable(state, input.key)) return undefined
      return handled(toggle(state, input.key))
    }

    if (multiple && input.is(SELECT_ALL)) return handled(selectAll(state))

    const activeKey = active.get(state)
    if (activeKey == null) return undefined

    if (keys.some((spec) => input.is(spec))) return handled(collection.isNavigable(items, activeKey) ? toggle(state, activeKey) : state)
    if (current === 'single') return undefined

    if (input.is(SHIFT_FORWARD) || input.is(SHIFT_BACKWARD)) {
      const to = input.is(SHIFT_FORWARD) ? collection.next(items, activeKey) : collection.previous(items, activeKey)
      if (to == null) return handled(state)
      if (extendMode === 'range' || !multiple) return handled(extend(state, activeKey, to), [show(strategy, to)])
      return handled(toggle(active.set(state, to), to), [show(strategy, to)])
    }

    if (!multiple) return undefined

    if (input.is(SHIFT_SPACE)) return handled(extendMultiple(state, activeKey, activeKey))

    if (input.is(TO_FIRST) || input.is(TO_LAST)) {
      const to = input.is(TO_FIRST) ? collection.first(items) : collection.last(items)
      if (to == null) return handled(state)
      return handled(extend(state, activeKey, to), [show(strategy, to)])
    }

    return undefined
  }

  const listens = [pointer.press, pointer.release, pointer.cancel, SELECT_ALL, SHIFT_FORWARD, SHIFT_BACKWARD, SHIFT_SPACE, TO_FIRST, TO_LAST, ...keys]

  return Object.assign(step, { listens, isSelected: selected, edges, toggle, extend, selectAll, press, drag })
}
