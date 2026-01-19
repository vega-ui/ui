import { useRef, useSyncExternalStore } from 'react'
import type { Store, EqualityFn } from './store'

export const useStoreValue = <T, Tag>(store: Store<T, Tag>) => {
  return useSyncExternalStore(
    (l) => store.subscribeAll(l),
    store.getValue,
    store.getValue,
  )
}

export const useStoreSelector = <T, Tag, S>(
  store: Store<T, Tag>,
  selector: (value: T) => S,
  isEqual: EqualityFn<S> = Object.is,
) => {
  const lastRef = useRef<S>(selector(store.getValue()))
  
  return useSyncExternalStore(
    (listener) =>
      store.subscribeAll(() => {
        const next = selector(store.getValue())
        const prev = lastRef.current
        if (!isEqual(prev, next)) {
          lastRef.current = next
          listener()
        }
      }),
    () => {
      const next = selector(store.getValue())
      const prev = lastRef.current
      if (!isEqual(prev, next)) lastRef.current = next
      return lastRef.current
    },
    () => {
      const next = selector(store.getValue())
      const prev = lastRef.current
      if (!isEqual(prev, next)) lastRef.current = next
      return lastRef.current
    },
  )
}

export const useStoreTagSelector = <T, Tag, S>(
  store: Store<T, Tag>,
  tag: Tag,
  selector: (value: T) => S,
  isEqual: EqualityFn<S> = Object.is,
) => {
  const lastRef = useRef<S>(selector(store.getValue()))
  
  return useSyncExternalStore(
    (listener) =>
      store.subscribeTag(tag, () => {
        const next = selector(store.getValue())
        const prev = lastRef.current
        if (!isEqual(prev, next)) {
          lastRef.current = next
          listener()
        }
      }),
    () => {
      const next = selector(store.getValue())
      const prev = lastRef.current
      if (!isEqual(prev, next)) lastRef.current = next
      return lastRef.current
    },
    () => {
      const next = selector(store.getValue())
      const prev = lastRef.current
      if (!isEqual(prev, next)) lastRef.current = next
      return lastRef.current
    },
  )
}