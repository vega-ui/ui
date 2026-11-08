export interface Store<S extends object> {
  get(): S
  set(next: Partial<S> | ((state: S) => Partial<S>)): void
  subscribe(listener: () => void): () => void
}

export const createStore = <S extends object>(initialState: S): Store<S> => {
  const listeners = new Set<() => void>()
  let state = initialState

  const get = () => state

  const set = (next: Partial<S> | ((state: S) => Partial<S>)) => {
    const patch = typeof next === 'function' ? next(state) : next
    const changed = Object.keys(patch).some((key) => !Object.is(patch[key as keyof S], state[key as keyof S]))

    if (!changed) return

    state = { ...state, ...patch }
    listeners.forEach((listener) => listener())
  }

  const subscribe = (listener: () => void) => {
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }

  return { get, set, subscribe }
}
