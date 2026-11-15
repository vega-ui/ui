import { Collection } from '../collection'
import { Input, InputSpec } from '../input'
import { PartOfState } from '../state/shape'
import { Action } from './actions'

export type Answer = 'handled' | 'keep' | 'stop'

export type KeyOfState<State> = State extends { readonly collection: Collection<infer Key> } ? Key : unknown

export interface Result<State, Key = KeyOfState<State>, PartName extends string = PartOfState<State>> {
  readonly state: State
  readonly actions: readonly Action<Key, PartName>[]
  readonly answer: Answer
}

export interface Step<State, Key = KeyOfState<State>, PartName extends string = PartOfState<State>> {
  (state: State, input: Input<Key>): Result<State, Key, PartName> | undefined
  readonly listens?: readonly InputSpec[]
}

export const listening = <State, Key = KeyOfState<State>, PartName extends string = PartOfState<State>>(listens: readonly InputSpec[], step: (state: State, input: Input<Key>) => Result<State, Key, PartName> | undefined): Step<State, Key, PartName> =>
  Object.assign(step, { listens })

const NO_ACTIONS: readonly Action<never, never>[] = []

export const handled = <State, Key = KeyOfState<State>, PartName extends string = never>(state: State, actions: readonly Action<Key, PartName>[] = NO_ACTIONS): Result<State, Key, PartName> => ({ state, actions, answer: 'handled' })

export const keep = <State, Key = KeyOfState<State>, PartName extends string = never>(state: State, actions: readonly Action<Key, PartName>[] = NO_ACTIONS): Result<State, Key, PartName> => ({ state, actions, answer: 'keep' })

export const stop = <State, Key = KeyOfState<State>>(state: State): Result<State, Key, never> => ({ state, actions: NO_ACTIONS, answer: 'stop' })

export const runSteps = <State, Key, PartName extends string>(steps: readonly Step<State, Key, PartName>[], state: State, input: Input<Key>): Result<State, Key, PartName> | undefined => {
  for (const step of steps) {
    const result = step(state, input)
    if (result) return result
  }

  return undefined
}
