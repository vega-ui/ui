import {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
  UIEvent,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';
import style from './style.module.css'
import { csx, mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { SnapScrollerProvider } from './providers';
import { useRefMap } from '@vega-ui/hooks';
import { SnapScrollerApiRef } from './types';

export interface SnapScrollerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref to the scroller’s element.
   */
  ref?: Ref<HTMLDivElement>;
  
  /**
   * Ref to the scroller’s imperative API.
   * Provides `element`, `prev()` and `next()` methods for programmatic control.
   */
  apiRef?: Ref<SnapScrollerApiRef>;
  
  /**
   * Preserve the currently snapped item after content changes
   * (e.g., when pages are prepended/appended). If `true`, the scroller will
   * restore the same snapped index using an immediate `scrollIntoView`.
   *
   * @default true
   */
  preserveScroll?: boolean;
  
  /**
   * Fires when the scroll position reaches the start or the end of the content.
   * - `-1` — reached the start (left/top edge)
   * - `+1` — reached the end (right/bottom edge)
   *
   * Useful for infinite loading: append/prepend pages based on the direction.
   */
  onOffset?(value: number): void;
  
  /**
   * Fires when the snapped item (by `scroll-snap-align: start`) changes.
   * Receives the snapped page/index number extracted from the item’s `data-index`.
   */
  onSnap?(index: number): void;
}

/**
 * SnapScroller is a scroll container optimized for CSS Scroll Snap.
 * It detects the currently snapped child, exposes imperative navigation,
 * and supports infinite scrolling by notifying when the viewport reaches edges.
 *
 * Children must be direct scroller items and carry `data-index` so the
 * snapped page can be derived.
 */
export const SnapScroller: FC<PropsWithChildren<SnapScrollerProps>> = ({
  ref,
  onOffset,
  className,
  onScroll: _onScroll,
  onSnap,
  preserveScroll = true,
  children,
  apiRef,
  ...props
}) => {
  const { itemRef, getItem } = useRefMap<number, HTMLElement>()
  
  const index = useRef<number | undefined>(undefined)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const lastDelta = useRef(0)
  
  const scroll = (offsetWidth: number, element?: HTMLDivElement) => {
    const scroller: HTMLDivElement | null = element ?? scrollerRef.current
    if (!scroller) return
    scroller.scrollTo({ left: offsetWidth, behavior: 'instant' })
  }

  const scrollToMiddle = (element?: HTMLDivElement) => {
    const scroller = element ?? scrollerRef.current
    if (!scroller) return

    const middle = Math.trunc(scroller.scrollWidth / 2)
    if (middle) scroll(middle, scroller)
  }

  const setScrollRef = useCallback((element: HTMLDivElement) => {
    if (scrollerRef.current) return
    scrollToMiddle(element)
    scrollerRef.current = element
  }, [])
  
  const getSnappedStart = (scroller: HTMLElement) => {
    const r = scroller.getBoundingClientRect();
    const x = r.left + 1;
    const y = r.top + Math.min(r.height - 1, Math.max(1, r.height / 2));
    let el = document.elementFromPoint(x, y) as HTMLElement | null;
    
    if (!el) return null;
    while (el && el.parentElement !== scroller) el = el.parentElement;
    return el && el.parentElement === scroller ? el : null;
  }
  
  const getSnappedIndex = (element: HTMLElement) => {
    const snappedElement = getSnappedStart(element)
    if (!snappedElement) return
    
    const index = snappedElement.dataset.index
    if (index === undefined) return
    
    return Number(index)
  }
  
  const scrollTo = (to: number, behavior?: ScrollBehavior) => {
    const item = getItem(to)
    item?.scrollIntoView({ behavior: behavior ?? 'smooth', inline: 'nearest', block: 'nearest' })
  }

  const scrollByDelta = (delta: number) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    
    const current = getSnappedIndex(scroller)
    if (current === undefined) return
    
    scrollTo(current + delta)
  }
  
  useImperativeHandle(apiRef, () => ({
    prev() {
      scrollByDelta(-1)
    },
    next() {
      scrollByDelta(1)
    },
    to(index: number, behavior?: ScrollBehavior) {
      scrollTo(index, behavior)
    }
  }))
  
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const { scrollWidth, clientWidth, scrollLeft } = target
    
    const snapped = getSnappedIndex(target)

    if (snapped !== undefined && snapped !== index.current && lastDelta.current === 0) {
      onSnap?.(snapped)
      index.current = snapped
    }
    
    if (Math.floor(scrollLeft) <= 0 && lastDelta.current !== -1) {
      onOffset?.(-1);
      lastDelta.current = -1;
      return
    }
    
    if (Math.ceil(scrollLeft) >= scrollWidth - clientWidth && lastDelta.current !== 1) {
      onOffset?.(1);
      lastDelta.current = 1;
      return
    }
  }
  
  useLayoutEffect(() => {
    if (!preserveScroll || lastDelta.current === 0) return
    
    const el = scrollerRef.current;
    if (!el) return;
    
    const current = index.current
    if (current === undefined) return;
    
    const next = getItem(current);
    
    requestAnimationFrame(() => {
      lastDelta.current = 0;
      next?.scrollIntoView({ behavior: 'instant', inline: 'nearest', block: 'nearest' });
    })
  });

  return (
    <SnapScrollerProvider itemRef={itemRef}>
      <div
        onScroll={mergeEventHandlers(onScroll, _onScroll)}
        ref={mergeRefs([setScrollRef, ref])}
        className={csx(className, style.scrollView)}
        {...props}
      >
        {children}
      </div>
    </SnapScrollerProvider>
  )
}