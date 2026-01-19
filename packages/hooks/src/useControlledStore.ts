import { useCallback, useLayoutEffect } from 'react'
import type { Store, StoreNotify } from '@vega-ui/react-store'
import { useStore } from './useStore'

export type ControlledStoreOptions<T, Tag> = {
  value?: T
  defaultValue: T
  onChangeValue?(value: T): void
  
  /**
   * Optional tag resolver.
   * Used to notify only affected subscribers when value changes.
   */
  getTags?(prev: T, next: T): readonly Tag[]
}

export type ControlledStore<T, Tag> = {
  store: Store<T, Tag>
  getValue(): T
  setValue(value: T, options?: { notify?: StoreNotify<Tag> }): void
}

export const useControlledStore = <T, Tag = unknown>(
  options: ControlledStoreOptions<T, Tag>
): ControlledStore<T, Tag> => {
  const { value, defaultValue, onChangeValue, getTags } = options
  const controlled = value !== undefined
  
  const store = useStore<T, Tag>(defaultValue)
  
  useLayoutEffect(() => {
    if (!controlled) return
    
    const next = value
    const prev = store.getValue()
    if (Object.is(prev, next)) return
    
    const notify: StoreNotify<Tag> = getTags ? { tags: getTags(prev, next) } : { all: true }
    
    store.setValue(next, { notify })
  }, [controlled, value, store, getTags])
  
  const getValue = useCallback(() => store.getValue(), [store])
  
  const setValue = useCallback((value: T, options?: { notify?: StoreNotify<Tag> }) => {
    const prev = store.getValue()
    if (Object.is(prev, value)) return
    
    onChangeValue?.(value)
    
    if (controlled) return
    store.setValue(value, options)
  }, [store, controlled, onChangeValue])
  
  return { store, getValue, setValue }
}