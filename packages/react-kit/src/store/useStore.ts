import { useMemo, useSyncExternalStore } from 'react'
import { Store } from './createStore'
import { createSelectionGetter } from './createSelectionGetter'

export const useStore = <S extends object, T>(store: Store<S>, selector: (state: S) => T): T => {
  const getSelection = useMemo(() => createSelectionGetter(store, selector), [store, selector])

  return useSyncExternalStore(store.subscribe, getSelection, getSelection)
}
