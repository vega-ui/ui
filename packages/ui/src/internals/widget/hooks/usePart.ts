import { useCallback, useLayoutEffect, useRef } from 'react'
import { AnyShape, KeyOf, Part, PartOf, SnapshotOf } from '@vega-ui/core'
import { WidgetHandle } from './useWidget'

export const usePart = <WidgetShape extends AnyShape, Data = undefined>(handle: WidgetHandle<WidgetShape, Data>, name: PartOf<WidgetShape>, output: Part<SnapshotOf<WidgetShape>, KeyOf<WidgetShape>> | undefined, key: KeyOf<WidgetShape>) => {
  const element = useRef<Element | null>(null)

  useLayoutEffect(() => {
    if (element.current) handle.connection.current?.paint(element.current)
  })

  return useCallback((node: Element | null) => {
    element.current = node
    handle.elements.setPart(name, node, output, key)
    if (node) handle.connection.current?.paint()
  }, [handle, name, output, key])
}
