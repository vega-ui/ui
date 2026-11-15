import { AnyShape, capitalize, KeyOf, Observed, ObservedValues, OptionsOf, SnapshotOf } from '../state'
import { Collection, collection } from '../collection'
import { createInput, Input, InputSpec, lifecycle } from '../input'
import { Attrs, Part, Rendered, renderPart } from '../output'
import { Action, Answer, runSteps } from '../step'
import { Widget } from './defineWidget'

export interface Dispatched<K = unknown> {
  readonly answer: Answer | 'pass'
  readonly actions: readonly Action<K>[]
}

export interface Repaired {
  readonly invariant: string
  readonly before: unknown
  readonly after: unknown
}

export interface Trace extends Dispatched {
  readonly input: Input
  readonly before: unknown
  readonly after: unknown
}

export interface WidgetEnvironment {
  readonly id: string
  readonly strict?: boolean
  readonly onRepair?: (repaired: Repaired) => void
  readonly onError?: (error: unknown, input?: Input) => void
  readonly onDispatch?: (trace: Trace) => void
}

export interface WidgetInstance<Sh extends AnyShape> {
  readonly state: SnapshotOf<Sh>
  readonly observed: Readonly<Record<string, Observed<unknown>>>
  readonly listens: readonly InputSpec[]
  dispatch(input: Input<KeyOf<Sh>>, observed?: ObservedValues): Dispatched<KeyOf<Sh>>
  observe(values: ObservedValues): void
  setOptions(options: OptionsOf<Sh>): Dispatched<KeyOf<Sh>>
  render(part: Part<SnapshotOf<Sh>, KeyOf<Sh>>, key?: KeyOf<Sh>): Attrs
  subscribe(listener: () => void): () => void
}

export class InvariantError extends Error {
  constructor(readonly invariant: string, readonly state: unknown) {
    super(`Invariant "${invariant}" does not hold`)
  }
}

const PASSED: Dispatched<never> = { answer: 'pass', actions: [] }

export const createWidget = <Sh extends AnyShape>(widget: Widget<Sh>, options: OptionsOf<Sh>, environment: WidgetEnvironment): WidgetInstance<Sh> => {
  type S = SnapshotOf<Sh>
  type K = KeyOf<Sh>
  type Mutable = Record<string, unknown>

  const { id } = environment
  const shape = widget.shape
  const listeners = new Set<() => void>()
  const rendered = new Map<Part<S, K>, Map<K | undefined, Rendered>>()

  const enforce = (state: S): S => {
    let next = state

    for (const name in widget.invariants) {
      const invariant = widget.invariants[name]
      if (invariant.check(next)) continue
      if (environment.strict) throw new InvariantError(name, next)

      const repaired = shape.restore(invariant.repair(next), next) as S
      environment.onRepair?.({ invariant: name, before: next, after: repaired })
      next = repaired
    }

    return next
  }

  let current = enforce(shape.create(options, id) as S)

  const withTimers = (state: S, actions: readonly Action[], fired?: string): S => {
    const changed = actions.some((action) => action.type === 'timer' || action.type === 'cancelTimer')
    if (!changed && fired === undefined) return state

    const timers = new Map(state.timers)
    if (fired !== undefined) timers.delete(fired)

    for (const action of actions) {
      if (action.type === 'timer') timers.set(action.name, action.ms)
      if (action.type === 'cancelTimer') timers.delete(action.name)
    }

    return { ...state, timers }
  }

  const notifyChanges = (before: S, after: S) => {
    for (const name of shape.owned) {
      const previous = (before as Mutable)[name]
      const value = (after as Mutable)[name]
      if (Object.is(previous, value)) continue

      const onChange = (after.options as Mutable)[`onChange${capitalize(name)}`]
      if (typeof onChange !== 'function') continue

      try {
        onChange(value)
      } catch (error) {
        if (environment.strict) throw error
        environment.onError?.(error)
      }
    }
  }

  const forgetLeftItems = (before: S, after: S) => {
    const items = (after as Mutable).collection as Collection<K> | undefined
    if (items === undefined || items === (before as Mutable).collection) return

    for (const byKey of rendered.values()) {
      for (const key of byKey.keys()) {
        if (key !== undefined && !collection.has(items, key)) byKey.delete(key)
      }
    }
  }

  const commit = (next: S, report = true) => {
    const before = current
    current = enforce(next)
    if (current === before) return

    forgetLeftItems(before, current)
    if (report) notifyChanges(before, current)
    for (const listener of listeners) listener()
  }

  const dispatch = (input: Input<K>, observed?: ObservedValues, report = true): Dispatched<K> => {
    const before = current
    const base = observed ? (shape.observe(current, observed) as S) : current
    const fired = input.type === 'timer' ? input.name : undefined
    let result

    try {
      result = runSteps(widget.steps, base, input)
    } catch (error) {
      if (environment.strict) throw error
      environment.onError?.(error, input)
    }

    const dispatched: Dispatched<K> = result ? { answer: result.answer, actions: result.actions } : PASSED
    commit(withTimers(result ? result.state : base, dispatched.actions, fired), report)
    environment.onDispatch?.({ ...dispatched, input, before, after: current })

    return dispatched
  }

  return {
    get state() {
      return current
    },

    observed: shape.observed,

    listens: widget.listens,

    dispatch,

    observe(values) {
      commit(shape.observe(current, values) as S)
    },

    setOptions(next) {
      const previous = current.options as Mutable
      commit(shape.sync(current, next) as S, false)

      const changed = [...shape.owned, ...shape.followed].some((name) => !Object.is(previous[name], (next as Mutable)[name]))
      if (!changed) return PASSED

      const synced = current as Mutable
      const dispatched = dispatch(createInput(lifecycle.options), undefined, false)
      const owned = shape.owned.find((name) => !Object.is(synced[name], (current as Mutable)[name]))
      if (owned !== undefined && environment.strict) throw new Error(`A step changed the owned value "${owned}" on lifecycle.options`)

      return dispatched
    },

    render(part, key) {
      let byKey = rendered.get(part)
      if (!byKey) rendered.set(part, (byKey = new Map()))

      const next = renderPart(part, current, key as K, byKey.get(key))
      byKey.set(key, next)

      return next.attrs
    },

    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}
