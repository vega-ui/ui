import { Ref, useMemo } from 'react'
import { createInput } from '@vega-ui/core'
import { useMergeRefs } from '@vega-ui/hooks'
import { useWidget, widgetEnvironment } from '../../internals/widget'
import { MEASURE_SNAP, SNAP_INDEX, SNAP_NEXT, SNAP_PREVIOUS, SNAP_TO, type SnapPages, type SnapScrollerEntry, type SnapScrollerOrientation, snapScrollerWidget } from '@vega-ui/widgets/snap-scroller'

export interface UseSnapScrollerOptions {
  ref?: Ref<HTMLDivElement>
  defaultIndex?: number
  pages?: SnapPages
  index?: number
  preserveScroll?: boolean
  orientation?: SnapScrollerOrientation
  onOffset?(value: number): void
  onScrollSnapChange?(element: HTMLElement, index: number): void
  onScrollSnapChanging?(element: HTMLElement, index: number): void
}

type SnapCallback = UseSnapScrollerOptions['onScrollSnapChange']

export const useSnapScroller = ({
  ref,
  defaultIndex,
  pages,
  index,
  preserveScroll = true,
  orientation = 'horizontal',
  onOffset,
  onScrollSnapChange,
  onScrollSnapChanging,
}: UseSnapScrollerOptions) => {
  const report = (callback: SnapCallback, key: number) => {
    const element = handle.elements.item(key)
    if (element instanceof HTMLElement) callback?.(element, key)
  }

  const handle = useWidget(snapScrollerWidget, (items: readonly SnapScrollerEntry[]) => ({
    items,
    defaultIndex,
    pages,
    index,
    preserveScroll,
    orientation,
    onSnapChanging: (key: number) => report(onScrollSnapChanging, key),
    onSnapChange: (key: number) => report(onScrollSnapChange, key),
    onOffset,
  }), widgetEnvironment)
  const mergedRef = useMergeRefs([handle.root, ref])

  const api = useMemo(() => ({
    prev() {
      handle.send(createInput(SNAP_PREVIOUS))
    },
    next() {
      handle.send(createInput(SNAP_NEXT))
    },
    scrollToElementByKey(key: number, behavior?: ScrollBehavior) {
      handle.send(createInput(SNAP_TO, { key, value: behavior }))
    },
    setIndexTo(key: number) {
      handle.send(createInput(SNAP_INDEX, { key }))
    },
    measure() {
      handle.send(createInput(MEASURE_SNAP))
      handle.connection.current?.flush()
    },
    getPending: () => handle.instance.state.pending,
    getCommitted: () => handle.instance.state.committed,
  }), [handle])

  return { handle, ref: mergedRef, api }
}
