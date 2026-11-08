import { RefObject, useLayoutEffect, useRef } from 'react'
import { Registry, RegistryItem } from './createRegistry'

export const useRegistryItem = <D extends object, E extends HTMLElement = HTMLElement>(
  registry: Pick<Registry<RegistryItem & D>, 'register'>,
  id: string,
  data: D,
): RefObject<E | null> => {
  const ref = useRef<E>(null)
  const latest = useRef(data)
  const item = useRef<RegistryItem & D>(null)

  useLayoutEffect(() => {
    latest.current = data
    if (item.current) Object.assign(item.current, data)
  })

  useLayoutEffect(() => {
    if (!ref.current) return undefined

    item.current = { ...latest.current, id, element: ref.current }
    return registry.register(item.current)
  }, [registry, id])

  return ref
}
