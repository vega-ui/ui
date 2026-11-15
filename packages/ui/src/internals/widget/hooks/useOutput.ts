import { useCallback, useEffect, useReducer, useRef } from 'react'
import { AnyShape, KeyOf, Part, SnapshotOf } from '@vega-ui/core'
import { WidgetHandle } from './useWidget'

export interface Subscribable {
  subscribe(listener: () => void): () => void
}

export const useSubscribed = <Value>(source: Subscribable, read: () => Value): Value => {
  const [, rerender] = useReducer((count: number) => count + 1, 0)
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

export const useOutput = <WidgetShape extends AnyShape, RenderedPart extends Part<SnapshotOf<WidgetShape>, KeyOf<WidgetShape>>>(handle: WidgetHandle<WidgetShape, unknown>, part: RenderedPart, key?: KeyOf<WidgetShape>): ReturnType<RenderedPart['render']> => {
  const read = useCallback(() => handle.instance.render(part, key) as ReturnType<RenderedPart['render']>, [handle, part, key])

  return useSubscribed(handle, read)
}

export const useSnapshot = <WidgetShape extends AnyShape, Selected>(handle: WidgetHandle<WidgetShape, unknown>, select: (state: SnapshotOf<WidgetShape>) => Selected): Selected => {
  const read = useCallback(() => select(handle.instance.state), [handle, select])

  return useSubscribed(handle, read)
}
