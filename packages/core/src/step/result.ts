import { Collection } from '../collection'
import { Input, InputSpec } from '../input'
import { Action } from './actions'

export type Answer = 'handled' | 'keep' | 'stop'

export type KeyOfState<S> = S extends { readonly collection: Collection<infer K> } ? K : unknown

export interface Result<S, K = KeyOfState<S>> {
  readonly state: S
  readonly actions: readonly Action<K>[]
  readonly answer: Answer
}

export interface Step<S, K = KeyOfState<S>> {
  (state: S, input: Input<K>): Result<S, K> | undefined
  readonly listens?: readonly InputSpec[]
}

export const listening = <S, K = KeyOfState<S>>(listens: readonly InputSpec[], step: (state: S, input: Input<K>) => Result<S, K> | undefined): Step<S, K> =>
  Object.assign(step, { listens })

const NO_ACTIONS: readonly Action<never>[] = []

export const handled = <S, K = KeyOfState<S>>(state: S, actions: readonly Action<K>[] = NO_ACTIONS): Result<S, K> => ({ state, actions, answer: 'handled' })

export const keep = <S, K = KeyOfState<S>>(state: S, actions: readonly Action<K>[] = NO_ACTIONS): Result<S, K> => ({ state, actions, answer: 'keep' })

export const stop = <S, K = KeyOfState<S>>(state: S): Result<S, K> => ({ state, actions: NO_ACTIONS, answer: 'stop' })

export const runSteps = <S, K>(steps: readonly Step<S, K>[], state: S, input: Input<K>): Result<S, K> | undefined => {
  for (const step of steps) {
    const result = step(state, input)
    if (result) return result
  }

  return undefined
}
