import { useRef } from 'react'
import { Store } from '@vega-ui/react-store'

export const useStore = <T, Tag = unknown>(initial: T): Store<T, Tag> => {
  const ref = useRef<Store<T, Tag> | null>(null)
  if (!ref.current) ref.current = new Store<T, Tag>(initial)
  return ref.current
}