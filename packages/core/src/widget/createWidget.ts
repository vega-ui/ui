import { AnyShape, capitalize, KeyOf, Observed, ObservedValues, OptionsOf, SnapshotOf } from '../state'
import { Collection, collection } from '../collection'
import { createInput, Input, InputSpec, lifecycle } from '../input'
import { Attrs, Part, Rendered, renderPart } from '../output'
import { Action, Answer, runSteps } from '../step'
import { Widget } from './defineWidget'

export interface Dispatched<Key = unknown> {
  readonly answer: Answer | 'pass'
  readonly actions: readonly Action<Key>[]
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

export interface WidgetInstance<WidgetShape extends AnyShape> {
  readonly state: SnapshotOf<WidgetShape>
  readonly observed: Readonly<Record<string, Observed<unknown>>>
  readonly listens: readonly InputSpec[]
  dispatch(input: Input<KeyOf<WidgetShape>>, observed?: ObservedValues): Dispatched<KeyOf<WidgetShape>>
  observe(values: ObservedValues): void
  setOptions(options: OptionsOf<WidgetShape>): Dispatched<KeyOf<WidgetShape>>
  render(part: Part<SnapshotOf<WidgetShape>, KeyOf<WidgetShape>>, key?: KeyOf<WidgetShape>): Attrs
  subscribe(listener: () => void): () => void
}

export class InvariantError extends Error {
  constructor(readonly invariant: string, readonly state: unknown) {
    super(`Invariant "${invariant}" does not hold`)
  }
}

const PASSED: Dispatched<never> = { answer: 'pass', actions: [] }

export const createWidget = <WidgetShape extends AnyShape>(widget: Widget<WidgetShape>, options: OptionsOf<WidgetShape>, environment: WidgetEnvironment): WidgetInstance<WidgetShape> => {
  type State = SnapshotOf<WidgetShape>
  type Key = KeyOf<WidgetShape>
  type Mutable = Record<string, unknown>

  const { id } = environment
  const shape = widget.shape
  const listeners = new Set<() => void>()
  const rendered = new Map<Part<State, Key>, Map<Key | undefined, Rendered>>()

  const fail = (error: unknown, input?: Input) => {
    if (environment.strict) throw error
    environment.onError?.(error, input)
  }

  const enforce = (state: State, before: State, byStep: boolean): State => {
    let next = state

    for (const name in widget.invariants) {
      const invariant = widget.invariants[name]
      if (invariant.check(next)) continue
      if (byStep && environment.strict && invariant.check(before)) throw new InvariantError(name, next)

      const repaired = shape.restore(invariant.repair(next, before), next) as State
      environment.onRepair?.({ invariant: name, before: next, after: repaired })
      next = repaired
    }

    return next
  }

  const created = shape.create(options, id) as State
  let current = enforce(created, created, false)

  const withTimers = (state: State, actions: readonly Action[], fired?: string): State => {
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

  const notifyChanges = (before: State, after: State) => {
    for (const name of shape.owned) {
      const previous = (before as Mutable)[name]
      const value = (after as Mutable)[name]
      if (Object.is(previous, value)) continue

      const onChange = (after.options as Mutable)[`onChange${capitalize(name)}`]
      if (typeof onChange !== 'function') continue

      try {
        onChange(value)
      } catch (error) {
        fail(error)
      }
    }
  }

  const forgetLeftItems = (before: State, after: State) => {
    const items = (after as Mutable).collection as Collection<Key> | undefined
    if (items === undefined || items === (before as Mutable).collection) return

    for (const byKey of rendered.values()) {
      for (const key of byKey.keys()) {
        if (key !== undefined && !collection.has(items, key)) byKey.delete(key)
      }
    }
  }

  const commit = (next: State, report = true, byStep = false, input?: Input) => {
    const before = current
    try {
      current = enforce(next, before, byStep)
    } catch (error) {
      fail(error, input)
      return false
    }
    if (current === before) return true

    forgetLeftItems(before, current)
    if (report) notifyChanges(before, current)
    for (const listener of listeners) listener()
    return true
  }

  const dispatch = (input: Input<Key>, observed?: ObservedValues, report = true): Dispatched<Key> => {
    const before = current
    const fired = input.type === 'timer' ? input.name : undefined
    let base = current
    let result

    try {
      if (observed) base = shape.observe(current, observed) as State
      result = runSteps(widget.steps, base, input)
    } catch (error) {
      fail(error, input)
    }

    const answered: Dispatched<Key> = result ? { answer: result.answer, actions: result.actions } : PASSED
    const committed = commit(withTimers(result ? result.state : base, answered.actions, fired), report, result !== undefined, input)
    const dispatched = committed ? answered : PASSED
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
      let next
      try {
        next = shape.observe(current, values) as State
      } catch (error) {
        fail(error)
        return
      }
      commit(next)
    },

    setOptions(next) {
      const previous = current.options as Mutable
      let resynced
      try {
        resynced = shape.sync(current, next) as State
      } catch (error) {
        fail(error)
        return PASSED
      }
      commit(resynced, false)

      const changed = [...shape.owned, ...shape.followed].filter((name) => !Object.is(previous[name], (next as Mutable)[name]))
      if (changed.length === 0) return PASSED

      const synced = current as Mutable
      const dispatched = dispatch(createInput(lifecycle.options, { changed }), undefined, false)
      const owned = shape.owned.find((name) => !Object.is(synced[name], (current as Mutable)[name]))
      if (owned !== undefined && environment.strict) throw new Error(`A step changed the owned value "${owned}" on lifecycle.options`)

      return dispatched
    },

    render(part, key) {
      let byKey = rendered.get(part)
      if (!byKey) rendered.set(part, (byKey = new Map()))

      try {
        const next = renderPart(part, current, key as Key, byKey.get(key))
        byKey.set(key, next)
        return next.attrs
      } catch (error) {
        fail(error)
        return byKey.get(key)?.attrs ?? {}
      }
    },

    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}
