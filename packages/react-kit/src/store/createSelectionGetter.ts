import { Store } from './createStore'

export const createSelectionGetter = <S extends object, T>(store: Store<S>, selector: (state: S) => T) => {
  let memo: { state: S, selection: T } | null = null

  return () => {
    const state = store.get()

    if (memo && memo.state === state) return memo.selection

    memo = { state, selection: selector(state) }
    return memo.selection
  }
}
