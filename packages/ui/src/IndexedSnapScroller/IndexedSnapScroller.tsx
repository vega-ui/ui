import { FC, PropsWithChildren, Ref, UIEvent, useCallback, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
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
   * Number of pages appended when a scroll reaches the end of the window,
   * so a fast swipe keeps going. Once the scroll settles, the window is
   * re-centered on the snapped page.
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
   * Fires when the window grows at an edge.
   * - `-1` — the scroll settled on the first page (left/top edge)
   * - `+1` — the scroll reached the end (right/bottom edge)
   *
   * Useful for infinite loading: append/prepend pages based on the direction.
   */
  onOffset?(value: number): void;
}

/**
 * IndexedSnapScroller extends `SnapScroller` with virtualized,
 * index-based paging. It maintains a sliding window of page indexes:
 * pages are appended while a scroll reaches the end, and the window is
 * re-centered on the snapped page once the scroll settles, so pages never
 * move under an ongoing scroll. Each rendered child is wrapped in an
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
  onScrollSnapChange: _onScrollSnapChange,
  onScroll: _onScroll,
  onWheel: _onWheel,
  onTouchStart: _onTouchStart,
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
  
  const { indexes, extend, center, reset } = useIndexes({ start: initialStart, startDir, size, shift: indexShift })
  const hasBeenOffset = useRef(false)
  const anchor = useRef<{ key: number; offset: number } | null>(null)
  const syncedIndex = useRef(index)
  const target = useRef<number | null>(null)
  const scrollTarget = useRef<number | null>(null)
  const isRebuilding = useRef(false)

  const setIndexTo = useCallback((nextIndex: number) => {
    const api = innerApiRef.current
    if (!api) return;
    
    // If the item is in the window, just scroll to it
    if (indexes.includes(nextIndex)) {
      api.scrollToElementByKey(nextIndex, 'instant')
      return
    }
    
    // Otherwise, we reinitialize the index array
    const key = api.getCommitted()
    if (key == null) {
      center(nextIndex)
      return
    }

    const start = indexes[0]
    reset(computeStart(start, key, nextIndex))
  }, [indexes, reset, center])
  
  const preserveScrollPosition = useCallback(() => {
    if (!preserveScroll) return;
    
    const api = innerApiRef.current
    const scroller = innerRef.current
    if (!api || !scroller) return;
    
    hasBeenOffset.current = false;
    api.measure()
    
    const element = anchor.current && scroller.querySelector(`:scope > [data-index="${anchor.current.key}"]`)
    if (!anchor.current || !element) return
    
    const offset = element.getBoundingClientRect().left - scroller.getBoundingClientRect().left
    scroller.scrollTo({ left: scroller.scrollLeft + offset - anchor.current.offset, behavior: 'instant' })
  }, [preserveScroll])

  useLayoutEffect(() => {
    const api = innerApiRef.current
    if (!api) return
    
    if (index === undefined) return
    if (index === syncedIndex.current && !isRebuilding.current) return
    
    syncedIndex.current = index
    isRebuilding.current = false
    
    if (index === api.getPending() || index === api.getCommitted()) return
    
    isRebuilding.current = !indexes.includes(index)
    setIndexTo(index)
  }, [index, indexes, setIndexTo])
  
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollWidth, clientWidth, scrollLeft } = e.currentTarget;
    if (Math.abs(scrollLeft) < scrollWidth - clientWidth - 1) return;
    
    onOffset?.(1)
    extend(1)
  };
  
  const anchorTo = (key: number) => {
    const scroller = innerRef.current
    const element = scroller?.querySelector(`:scope > [data-index="${key}"]`)
    if (!scroller || !element) return
    
    anchor.current = { key, offset: element.getBoundingClientRect().left - scroller.getBoundingClientRect().left }
    hasBeenOffset.current = true;
  }
  
  const releaseTarget = () => {
    target.current = null
  }
  
  const step = (delta: number) => {
    const api = innerApiRef.current
    if (!api) return
    
    if (api.getCommitted() == null) api.measure()
    
    const base = target.current ?? api.getCommitted()
    if (base == null) return
    
    const next = base + delta
    target.current = next
    
    if (indexes.includes(next)) {
      api.scrollToElementByKey(next, 'smooth')
      return
    }
    
    anchorTo(indexes[0])
    scrollTarget.current = next
    extend(next < indexes[0] ? -1 : 1)
  }
  
  useImperativeHandle(apiRef, () => {
    const api = innerApiRef.current as SnapScrollerApiRef
    
    return {
      ...api,
      next() {
        step(1)
      },
      prev() {
        step(-1)
      },
      setIndexTo,
      index: api.getCommitted(),
    }
  })
  
  const onScrollSnapChange = (element: HTMLElement, key: number) => {
    _onScrollSnapChange?.(element, key)
    
    if (target.current !== null && key !== target.current) return
    target.current = null
    
    if (key === indexes[0]) onOffset?.(-1)
    
    const isCentered = indexes.length === size && indexes[centerOffset] === key
    if (isCentered) return
    
    anchorTo(key)
    flushSync(() => center(key))
  };
  
  useLayoutEffect(() => {
    if (!hasBeenOffset.current) return
    preserveScrollPosition()
  });
  
  useLayoutEffect(() => {
    const key = scrollTarget.current
    if (key === null || !indexes.includes(key)) return
    
    scrollTarget.current = null
    innerApiRef.current?.measure()
    innerApiRef.current?.scrollToElementByKey(key, 'smooth')
  });
  
  return (
    <SnapScroller
      ref={mergeRefs([innerRef, ref])}
      defaultIndex={initial}
      apiRef={innerApiRef}
      onScroll={mergeEventHandlers(onScroll, _onScroll)}
      onWheel={mergeEventHandlers(releaseTarget, _onWheel)}
      onTouchStart={mergeEventHandlers(releaseTarget, _onTouchStart)}
      onScrollSnapChange={onScrollSnapChange}
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