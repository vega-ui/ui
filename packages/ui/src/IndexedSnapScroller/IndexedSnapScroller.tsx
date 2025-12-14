import { FC, PropsWithChildren, Ref, useImperativeHandle, useRef, useState } from 'react';
import { useIndexes } from '@vega-ui/hooks';
import { SnapScroller, SnapScrollerApiRef, SnapScrollerProps } from '../SnapScroller';
import { IndexedSnapScrollerProvider } from './contexts';
import { IndexedSnapScrollerApiRef } from './types.ts';

export interface IndexedSnapScrollerProps extends SnapScrollerProps {
  /**
   * Starting index used to generate the initial sequence of pages.
   * Acts as the logical origin for the sliding index window.
   *
   * @default -2
   */
  start?: number;
  
  /**
   * Direction in which the initial index sequence expands.
   * - `1`  — indexes increase to the right  (0, 1, 2…)
   * - `-1` — indexes decrease to the right  (0, -1, -2…)
   *
   * Controls the growth pattern of the initial index array.
   *
   * @default 1
   */
  startDir?: -1 | 1;
  
  /**
   * Number of index segments rendered at once.
   * Defines the size of the virtual “window” that the scroller
   * slides over when navigating left or right.
   *
   * @default 5
   */
  size?: number;
  
  /**
   * Number of index units to shift when reaching scroll boundaries.
   * - When `onOffset` yields `-1`, the window shifts backward.
   * - When `onOffset` yields `1`, the window shifts forward.
   *
   * Used to dynamically prepend or append pages based on scroll.
   *
   * @default 2
   */
  shift?: number;
  
  apiRef?: Ref<IndexedSnapScrollerApiRef>
}

/**
 * IndexedSnapScroller extends `SnapScroller` with virtualized,
 * index-based paging. It maintains a sliding window of page indexes
 * and automatically shifts the window when the user scrolls to the
 * start or end of the snap area. Each rendered child is wrapped in an
 * `IndexedSnapScrollerContext` with its corresponding index, allowing
 * dynamic page generation based on the current virtual index.
 */
export const IndexedSnapScroller: FC<PropsWithChildren<IndexedSnapScrollerProps>> = ({
  size = 5,
  start = -2,
  shift: indexShift = 2,
  startDir = 1,
  onOffset: _onOffset,
  onSnap: _onSnap,
  children,
  apiRef,
  ...props
}) => {
  const [resetId, setResetId] = useState(0);
  const initialIndex = Math.floor(size / 2) + start

  const { indexes, shift, push, reset } = useIndexes({ start, startDir, size, shift: indexShift })
  const index = useRef<number>(initialIndex)
  const internalApiRef = useRef<SnapScrollerApiRef>(null)

  const onSnap = (value: number) => {
    _onSnap?.(value)
    index.current = value;
  }
  
  const onOffset = (value: number) => {
    _onOffset?.(value)
    if (value === -1) shift()
    if (value === 1) push()
  }
  
  useImperativeHandle(apiRef, () => ({
    ...internalApiRef.current!,
    reset(index, resetKeys?: boolean) {
      reset(index)
      if (resetKeys) setResetId(prevId => prevId + 1)
    },
    indexes,
  }), [reset, indexes])

  return (
    <SnapScroller
      initialIndex={initialIndex}
      apiRef={internalApiRef}
      onSnap={onSnap}
      onOffset={onOffset}
      {...props}
    >
      {indexes.map((index) => (
        <IndexedSnapScrollerProvider key={`${resetId}-${index}`} index={index}>
          {children}
        </IndexedSnapScrollerProvider>
      ))}
    </SnapScroller>
  )
}