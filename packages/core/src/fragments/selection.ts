import { Collection, collection } from '../collection'
import { InputSpec, key, mod, nav, pointer } from '../input'
import { Field, Reader } from '../state'
import { FocusStrategy, handled, keep, Result, show, Step } from '../step'

export type SelectionMode = 'single' | 'multiple' | 'range'

export type ExtendMode = 'toggle' | 'range'

export interface Extension<K> {
  readonly anchor: K
  readonly base: readonly K[]
  readonly to: K
}

export interface Gesture<K> {
  readonly phase: 'idle' | 'pressed' | 'dragging' | 'dragged'
  readonly pointed?: K
  readonly from?: K
}

export const IDLE_GESTURE: Gesture<never> = { phase: 'idle' }

export interface SelectionOptions<S, K> {
  readonly value: Field<S, readonly K[]>
  readonly active: Field<S, K | null>
  readonly anchor: Field<S, K | null>
  readonly mode: Reader<S, SelectionMode | undefined>
  readonly strategy: FocusStrategy
  readonly keys?: readonly InputSpec[]
  readonly extend?: ExtendMode
  readonly extension?: Field<S, Extension<K> | null>
  readonly gesture?: Field<S, Gesture<K>>
  readonly selectable?: (state: S, key: K) => boolean
  readonly between?: (state: S, from: K, to: K) => readonly K[]
  readonly compare?: (state: S, first: K, second: K) => number
  readonly resolveRange?: (state: S, start: K, end: K) => readonly K[] | undefined
  readonly all?: (state: S) => readonly K[] | undefined
}

export interface Selection<S, K> {
  (state: S, input: Parameters<Step<S, K>>[1]): Result<S, K> | undefined
  readonly listens: readonly InputSpec[]
  isSelected(state: S, key: K): boolean
  edges(state: S): readonly [K, K] | undefined
  toggle(state: S, key: K): S
  extend(state: S, from: K, to: K): S
  selectAll(state: S): S
  press(state: S, key: K): S
  drag(state: S, key: K): S
}

const SHIFT_FORWARD = key.with(nav.forward, mod.shift)
const SHIFT_BACKWARD = key.with(nav.backward, mod.shift)
const SHIFT_SPACE = key.with(key.space, mod.shift)
const TO_FIRST = key.with(nav.first, mod.shift, mod.mod)
const TO_LAST = key.with(nav.last, mod.shift, mod.mod)
const SELECT_ALL = key.with(key.a, mod.mod)

export const isSelected = <K>(value: readonly K[], target: K) => value.includes(target)

const union = <K>(current: readonly K[], added: readonly K[]) => [...current, ...added.filter((key) => !current.includes(key))]

const sets = new WeakMap<readonly unknown[], ReadonlySet<unknown>>()

const setOf = <K>(keys: readonly K[]): ReadonlySet<K> => {
  let found = sets.get(keys)
  if (!found) sets.set(keys, (found = new Set(keys)))

  return found as ReadonlySet<K>
}

const sameKeys = <K>(current: readonly K[], next: readonly K[]) => current.length === next.length && next.every((key) => setOf(current).has(key))

export const selection = <S extends { collection: Collection<K> }, K>(options: SelectionOptions<S, K>): Selection<S, K> => {
  const { active, anchor, mode, strategy, keys = [key.space], extend: extendMode = 'toggle', extension, gesture } = options
  const value: Field<S, readonly K[]> = {
    ...options.value,
    set: (state, next) => (sameKeys(options.value.get(state), next) ? state : options.value.set(state, next)),
  }
  const selectable = options.selectable ?? ((state: S, target: K) => collection.isNavigable(state.collection, target))
  const compare = options.compare ?? ((state: S, first: K, second: K) => (state.collection.index.get(first) ?? 0) - (state.collection.index.get(second) ?? 0))
  const between = options.between ?? ((state: S, from: K, to: K) => collection.between(state.collection, from, to))
  const edgeCache = new WeakMap<readonly K[], { collection: Collection<K>; edges: readonly [K, K] }>()

  const ordered = (state: S, first: K, second: K): [K, K] => (compare(state, first, second) > 0 ? [second, first] : [first, second])

  const edges = (state: S): readonly [K, K] | undefined => {
    const current = value.get(state)
    if (mode.get(state) !== 'range' || current.length === 0) return undefined

    const cached = edgeCache.get(current)
    if (cached && cached.collection === state.collection) return cached.edges

    const sorted = [...current].sort((first, second) => compare(state, first, second))
    const found = [sorted[0], sorted[sorted.length - 1]] as const
    edgeCache.set(current, { collection: state.collection, edges: found })

    return found
  }

  const selected = (state: S, target: K): boolean => {
    if (mode.get(state) !== 'range') return setOf(value.get(state)).has(target)

    const found = edges(state)
    return found !== undefined && compare(state, target, found[0]) >= 0 && compare(state, target, found[1]) <= 0
  }

  const rangeValue = (state: S, first: K, second: K): readonly K[] => {
    const [start, end] = ordered(state, first, second)
    const resolved = options.resolveRange?.(state, start, end)
    if (resolved) return resolved

    return start === end ? [start] : [start, end]
  }

  const keysBetween = (state: S, first: K, second: K): readonly K[] => {
    const [start, end] = ordered(state, first, second)
    const resolved = options.resolveRange?.(state, start, end)
    if (resolved) return resolved

    return between(state, start, end).filter((target) => selectable(state, target))
  }

  const clearExtension = (state: S) => (extension ? extension.set(state, null) : state)

  const toggle = (state: S, target: K): S => {
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

  const anchorFor = (state: S, fallback: K) => {
    const anchored = anchor.get(state)
    if (anchored != null && collection.has(state.collection, anchored) && selected(state, anchored)) return anchored

    return fallback
  }

  const extendMultiple = (state: S, from: K, to: K): S => {
    const previous = extension?.get(state)
    const continued = previous && previous.to === from ? previous : { anchor: anchorFor(state, from), base: value.get(state), to: from }
    const kept = continued.base.filter((key) => selected(state, key))
    const next = value.set(active.set(state, to), union(kept, keysBetween(state, continued.anchor, to)))

    return extension ? extension.set(next, { ...continued, to }) : next
  }

  const extendRange = (state: S, from: K, to: K): S => {
    const found = edges(state)
    if (!found || !selectable(state, to)) return state

    const [start, end] = found
    return value.set(active.set(state, to), rangeValue(state, start === from ? end : start, to))
  }

  const extend = (state: S, from: K, to: K): S => {
    switch (mode.get(state)) {
      case 'multiple': return extendMultiple(state, from, to)
      case 'range': return extendRange(state, from, to)
      default: return state
    }
  }

  const selectAll = (state: S): S => {
    if (mode.get(state) !== 'multiple') return state

    const every = options.all?.(state) ?? state.collection.order.filter((target) => selectable(state, target))
    return value.set(clearExtension(state), every)
  }

  const press = (state: S, target: K): S => {
    if (!gesture || !selectable(state, target)) return state

    switch (mode.get(state)) {
      case 'multiple': {
        const started = extension ? extension.set(state, { anchor: target, base: value.get(state), to: target }) : state
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

  const drag = (state: S, target: K): S => {
    if (!gesture) return state

    const { phase, pointed, from } = gesture.get(state)
    if ((phase !== 'pressed' && phase !== 'dragging') || pointed === undefined || target === pointed) return state

    const dragging = gesture.set(state, { phase: 'dragging', pointed: target, from })
    if (mode.get(state) !== 'range') return extendMultiple(dragging, pointed, target)
    if (from === undefined || !selectable(state, target)) return dragging

    return value.set(dragging, rangeValue(state, from, target))
  }

  const step: Step<S, K> = (state, input) => {
    const current = mode.get(state)
    if (current === undefined) return undefined

    const items = state.collection
    const multiple = current === 'multiple'

    if (gesture && (input.is(pointer.release) || input.is(pointer.cancel))) {
      return keep(gesture.set(state, gesture.get(state).phase === 'dragging' ? { phase: 'dragged' } : IDLE_GESTURE))
    }

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
