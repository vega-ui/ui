import { FC, PropsWithChildren, Ref, UIEvent, useCallback, useLayoutEffect, useRef } from 'react';
import { useIndexes } from '@vega-ui/hooks';
import { SnapScroller, SnapScrollerApiRef, SnapScrollerProps } from '../SnapScroller';
import { IndexedSnapScrollerProvider } from './contexts';
import { IndexedSnapScrollerApiRef } from './types';
import { mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { computeStart } from './helpers';

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
  
  /**
   * Controls the currently active logical index.
   *
   * When provided, the scroller keeps the given index in view,
   * scrolling to it if possible or rebuilding the window if needed.
   */
  index?: number
  
  /**
   * Preserve the currently snapped item after content changes
   * (e.g., when pages are prepended/appended). If `true`, the scroller will
   * restore the same snapped index using an immediate `scrollIntoView`.
   *
   * @default true
   */
  preserveScroll?: boolean;
  
  /**
   * Exposes the imperative API of the scroller.
   *
   * Allows programmatic control such as scrolling to an index
   * or resetting the virtual window.
   */
  apiRef?: Ref<IndexedSnapScrollerApiRef>
  
  /**
   * Fires when the scroll position reaches the start or the end of the content.
   * - `-1` — reached the start (left/top edge)
   * - `+1` — reached the end (right/bottom edge)
   *
   * Useful for infinite loading: append/prepend pages based on the direction.
   */
  onOffset?(value: number): void;
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
  onOffset,
  preserveScroll = true,
  onScroll: _onScroll,
  defaultIndex,
  ref,
  children,
  apiRef,
  index,
  ...props
}) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const innerApiRef = useRef<SnapScrollerApiRef>(null)
  
  // Offset to determine the center of the array
  const centerOffset = Math.floor(size / 2)
  
  // If the initial element is passed, we take it, otherwise we take the start and add the shift (middle element)
  const initial = index ?? defaultIndex ?? centerOffset + start
  
  /*
    Initial start if the initial index is passed, this is the difference
    between the index and the shift, otherwise just start
   */
  const initialStart = index !== undefined
    ? index - centerOffset
    : defaultIndex !== undefined
      ? defaultIndex - centerOffset
      : start
  
  const { indexes, shift, push, reset } = useIndexes({ start: initialStart, startDir, size, shift: indexShift })
  const hasBeenOffset = useRef(false)

  const setIndexTo = useCallback((nextIndex: number) => {
    const api = innerApiRef.current
    if (!api) return;
    
    // If the item is in the window, just scroll to it
    if (indexes.includes(nextIndex)) {
      api.scrollToElementByKey(nextIndex, 'instant')
      return
    }
    
    // Otherwise, we reinitialize the index array
    const key = api.getCommited()
    if (key == null) return;

    const start = indexes[0]
    reset(computeStart(start, key, nextIndex))
  }, [indexes, reset])
  
  const preserveScrollPosition = useCallback(() => {
    if (!preserveScroll) return;
    
    const api = innerApiRef.current
    if (!api) return;
    
    const key = api.getPending()
    
    api.measure()
    api.scrollToElementByKey(key, 'instant');
    
    hasBeenOffset.current = false;
  }, [preserveScroll])

  useLayoutEffect(() => {
    const api = innerApiRef.current
    if (!api) return
    
    // Sync controlled state
    if (index === undefined || (index === api.getPending() || index === api.getCommited())) return
    setIndexTo(index)
  }, [index, setIndexTo])
  
  const offset = (value: number) => {
    onOffset?.(value)
    
    if (value === -1) shift()
    if (value === 1) push()
    
    hasBeenOffset.current = true;
  }
  
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollWidth, clientWidth, scrollLeft } = target;

    if (Math.floor(scrollLeft) <= 0) {
      offset(-1);
      return;
    }
    
    if (Math.ceil(scrollLeft) >= scrollWidth - clientWidth) {
      offset(1);
      return;
    }
  };
  
  useLayoutEffect(() => {
    if (!hasBeenOffset.current) return
    preserveScrollPosition()
  });
  
  return (
    <SnapScroller
      ref={mergeRefs([innerRef, ref])}
      defaultIndex={initial}
      apiRef={mergeRefs([apiRef, innerApiRef])}
      onScroll={mergeEventHandlers(onScroll, _onScroll)}
      {...props}
    >
      {indexes.map((index) => (
        <IndexedSnapScrollerProvider key={index} index={index}>
          {children}
        </IndexedSnapScrollerProvider>
      ))}
    </SnapScroller>
  )
}