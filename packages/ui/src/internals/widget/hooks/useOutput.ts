import { useCallback, useEffect, useReducer, useRef } from 'react'
import { AnyShape, Attrs, KeyOf, Part, SnapshotOf } from '@vega-ui/core'
import { WidgetHandle } from './useWidget'

export interface Subscribable {
  subscribe(listener: () => void): () => void
}

export const useSubscribed = <T>(source: Subscribable, read: () => T): T => {
  const [, rerender] = useReducer((n: number) => n + 1, 0)
  const value = read()
  const shown = useRef(value)
  shown.current = value

  useEffect(() => {
    const check = () => {
      if (read() !== shown.current) rerender()
    }

    check()
    return source.subscribe(check)
  }, [source, read])

  return value
}

export const useOutput = <Sh extends AnyShape>(handle: WidgetHandle<Sh, unknown>, part: Part<SnapshotOf<Sh>, KeyOf<Sh>>, key?: KeyOf<Sh>): Attrs => {
  const read = useCallback(() => handle.instance.render(part, key), [handle, part, key])

  return useSubscribed(handle, read)
}

export const useSnapshot = <Sh extends AnyShape, T>(handle: WidgetHandle<Sh, unknown>, select: (s: SnapshotOf<Sh>) => T): T => {
  const read = useCallback(() => select(handle.instance.state), [handle, select])

  return useSubscribed(handle, read)
}
