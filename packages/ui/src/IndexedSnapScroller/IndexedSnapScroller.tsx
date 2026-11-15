import { FC, PropsWithChildren, Ref, useImperativeHandle } from 'react';
import { useSnapshot } from '../internals/widget';
import { csx } from '@vega-ui/utils';
import { SnapScrollerProvider } from '../SnapScroller/contexts'
import { useSnapScroller } from '../SnapScroller/hooks'
import { windowOf } from '@vega-ui/widgets/snap-scroller';
import { SnapScrollerProps } from '../SnapScroller';
import style from './style.module.css'
import { IndexedSnapScrollerProvider } from './contexts';
import { IndexedSnapScrollerApiRef } from './types';

export interface IndexedSnapScrollerProps extends SnapScrollerProps {
  /**
   * Starting index used to generate the initial sequence of pages.
   * Acts as the logical origin for the sliding index window.
   *
   * @default -2
   */
  start?: number;
  
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
   * restore the same snapped index using an immediate `scrollTo`.
   *
   * @default true
   */
  preserveScroll?: boolean;
  
  /**
   * Exposes the imperative API of the scroller.
   *
   * Allows programmatic control such as scrolling to an index,
   * rebuilding the window around it when needed.
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
  shift = 2,
  onOffset,
  preserveScroll = true,
  onScrollSnapChange,
  onScrollSnapChanging,
  defaultIndex,
  className,
  ref,
  children,
  apiRef,
  index,
  ...props
}) => {
  const { handle, ref: mergedRef, api } = useSnapScroller({
    ref,
    defaultIndex,
    pages: { start, size, shift },
    index,
    preserveScroll,
    onOffset,
    onScrollSnapChange,
    onScrollSnapChanging,
  })
  const indexes = useSnapshot(handle, windowOf)

  useImperativeHandle(apiRef, () => api, [api])

  return (
    <SnapScrollerProvider handle={handle}>
      <div
        ref={mergedRef}
        tabIndex={-1}
        className={csx(className, style.scrollView)}
        {...handle.listen({}, props)}
      >
        {indexes.map((index) => (
          <IndexedSnapScrollerProvider key={index} index={index}>
            {children}
          </IndexedSnapScrollerProvider>
        ))}
      </div>
    </SnapScrollerProvider>
  )
}
