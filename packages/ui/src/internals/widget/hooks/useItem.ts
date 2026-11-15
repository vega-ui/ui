import { useCallback, useRef } from 'react'
import { AnyShape, KeyOf, Part, SnapshotOf } from '@vega-ui/core'
import { WidgetHandle } from './useWidget'

const shallowEqual = (a: object, b: object) => {
  const keys = Object.keys(a)
  return keys.length === Object.keys(b).length && keys.every((key) => Object.is((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]))
}

const useStable = <Data>(data: Data): Data => {
  const kept = useRef(data)
  const same = typeof data === 'object' && data !== null && typeof kept.current === 'object' && kept.current !== null ? shallowEqual(data, kept.current) : Object.is(data, kept.current)
  if (!same) kept.current = data

  return kept.current
}

export const useItem = <WidgetShape extends AnyShape, Data = undefined, ElementType extends Element = HTMLElement>(handle: WidgetHandle<WidgetShape, Data>, key: KeyOf<WidgetShape>, data?: Data, output?: Part<SnapshotOf<WidgetShape>, KeyOf<WidgetShape>>) => {
  const stable = useStable(data)

  return useCallback((element: ElementType | null) => handle.elements.setItem(key, element, stable, output), [handle, key, stable, output])
}
