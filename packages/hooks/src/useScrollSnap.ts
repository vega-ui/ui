import { RefObject, UIEvent, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useMutationObserver } from './useMutationObserver';
import { useResizeObserver } from './useResizeObserver';
import { nearest } from '@vega-ui/utils';
import { useBiMap } from './useBiMap';

export type ScrollSnapAxis = 'x' | 'y';
export type ScrollSnapAlign = 'start' | 'center' | 'end';

const parsePx = (v: string | null | undefined) => {
  const n = parseFloat(v || '0');
  return Number.isFinite(n) ? n : 0;
}

const getScrollPaddingStart = (scroller: HTMLElement, axis: ScrollSnapAxis) => {
  const cs = getComputedStyle(scroller);
  if (axis === 'x') return parsePx(cs.scrollPaddingInlineStart || cs.scrollPaddingLeft);
  return parsePx(cs.scrollPaddingBlockStart || cs.scrollPaddingTop);
}

const getElementOffsetInScroller = (
  scroller: HTMLElement,
  el: HTMLElement,
  axis: ScrollSnapAxis,
) => {
  let offset = 0;
  let node: HTMLElement | null = el;
  
  while (node && node !== scroller) {
    offset += axis === 'x' ? node.offsetLeft : node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  
  return offset;
};

const defaultGetSnapPoint = (scroller: HTMLElement, el: HTMLElement, axis: ScrollSnapAxis, align: ScrollSnapAlign, respectScrollPadding: boolean) => {
  if (!scroller.contains(el)) {
    return axis === 'x' ? scroller.scrollLeft : scroller.scrollTop;
  }
  
  const viewportSize = axis === 'x' ? scroller.clientWidth : scroller.clientHeight;
  
  const elStartInScroll = getElementOffsetInScroller(scroller, el, axis);
  const elSize = axis === 'x' ? el.offsetWidth : el.offsetHeight;
  
  const elCenterInScroll = elStartInScroll + elSize / 2;
  const elEndInScroll = elStartInScroll + elSize;
  
  const padStart = respectScrollPadding ? getScrollPaddingStart(scroller, axis) : 0;
  
  if (align === 'start') return elStartInScroll - padStart;
  if (align === 'center') return elCenterInScroll - viewportSize / 2;
  return elEndInScroll - viewportSize;
};

export interface UseScrollSnapOptions<K, E> {
  scrollerRef: RefObject<E | null>;
  
  axis?: ScrollSnapAxis;
  align?: ScrollSnapAlign;
  
  getSnapPoint?: (scroller: HTMLElement, el: HTMLElement, axis: ScrollSnapAxis, align: ScrollSnapAlign) => number;
  respectScrollPadding?: boolean;
  
  onSnapChanging?: (el: HTMLElement, key: K) => void;
  onSnapChange?: (el: HTMLElement, key: K) => void;
  
  scrollEndDebounceMs?: number;
  enableNativeEvents?: boolean;
}

export const useScrollSnap = <K extends string | number, E extends HTMLElement>({
  scrollerRef,
  axis = 'x',
  align = 'start',
  getSnapPoint,
  respectScrollPadding = true,
  onSnapChanging,
  onSnapChange,
  scrollEndDebounceMs = 80,
}: UseScrollSnapOptions<K, E>) => {
  const points = useBiMap<K, number>()
  const items = useBiMap<K, HTMLElement>()
  
  const setItemRef = useCallback((key: K) => (element: HTMLElement) => {
    items.set(key, element);
  }, [])
  
  const removeItemRef = useCallback((key: K) => {
    items?.deleteByKey(key)
  }, [])
  
  const committedKey = useRef<K | null>(null);
  const pendingKey = useRef<K | null>(null);
  
  const rafScrollId = useRef<number | null>(null);
  const rafMeasureId = useRef<number | null>(null);
  const endTimerId = useRef<number | null>(null);
  
  const hasNativeScrollEndRef = useRef(false);
  
  const calculateSnapPoint = useCallback((element: HTMLElement) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    return getSnapPoint
      ? getSnapPoint(scroller, element, axis, align)
      : defaultGetSnapPoint(scroller, element, axis, align, respectScrollPadding);
  }, [respectScrollPadding, axis, align])
  
  const getPointed = useCallback((scroller?: HTMLElement) => {
    const s = scroller ?? scrollerRef.current;
    if (!s) return;
    
    const scrollOffset = axis === 'x' ? s.scrollLeft : s.scrollTop;
    const pointsArray = Array.from(points.values()).sort((a, b) => a - b);
    
    const nearestIndex = nearest(pointsArray, scrollOffset)
    const nearestOffset = pointsArray[nearestIndex]
    
    const key = points.getByValue(nearestOffset)
    const element = items.getByKey(key)
    
    return { key, element }
  }, [axis])
  
  const measure = useCallback(() => {
    points.clear();
    
    for (const key of items.keys()) {
      const element = items.getByKey(key);
      if (!element) continue;
      points.set(key, calculateSnapPoint(element));
    }
    
    const pointed = getPointed();
    const existsCommitted = committedKey.current !== undefined && items.getByKey(committedKey.current) != null;
    
    if (committedKey.current === undefined || !existsCommitted) {
      committedKey.current = pointed.key;
      pendingKey.current = pointed.key;
      return;
    }
    
    if (pointed.key !== committedKey.current) {
      committedKey.current = pointed.key;
      pendingKey.current = pointed.key;
    }
  }, [calculateSnapPoint, getPointed, items, points]);

  const scheduleMeasure = useCallback(() => {
    if (rafMeasureId.current != null) return;
    rafMeasureId.current = requestAnimationFrame(() => {
      rafMeasureId.current = null;
      measure();
    });
  }, [measure])

  useMutationObserver(scrollerRef, scheduleMeasure, {
    childList: true,
    subtree: true
  })
  
  useResizeObserver(scrollerRef, scheduleMeasure)
  
  const commit = useCallback(() => {
    const { key, element } = getPointed()
    
    if (key !== null && key === committedKey.current) return;
    
    committedKey.current = key;
    pendingKey.current = key;
    onSnapChange?.(element, key);
  }, [onSnapChange, getPointed])
  
  const scheduleCommitFallback = useCallback(() => {
    if (endTimerId.current != null) window.clearTimeout(endTimerId.current);
    endTimerId.current = window.setTimeout(commit, scrollEndDebounceMs);
  }, [commit, scrollEndDebounceMs])
  
  const onScroll = useCallback((e: UIEvent<HTMLElement>) => {
    const target = e.currentTarget;
    
    if (rafScrollId.current != null) return;
    rafScrollId.current = requestAnimationFrame(() => {
      rafScrollId.current = null;
      
      if (!points.size) scheduleMeasure();
      
      const { key, element } = getPointed(target)
      
      if (key !== pendingKey.current) {
        pendingKey.current = key;
        onSnapChanging?.(element, key);
      }

      // Native-like: commit only on real scroll end when possible
      if (!hasNativeScrollEndRef.current) scheduleCommitFallback();
    });
  }, [onSnapChanging, scheduleMeasure, scheduleCommitFallback]);
  
  const scrollToElement = useCallback((el: HTMLElement, behavior: ScrollBehavior = 'smooth') => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    
    if (!points.size) scheduleMeasure();
    
    const key = items.getByValue(el)
    const target = points.getByKey(key) ?? calculateSnapPoint(el);
    
    if (!Number.isFinite(target)) return;

    if (axis === 'y') {
      scroller.scrollTo({ top: target, behavior });
      return
    }
    
    scroller.scrollTo({ left: target, behavior });
  }, [axis, scheduleMeasure, calculateSnapPoint])
  
  const scrollToElementByKey = useCallback((key: K, behavior: ScrollBehavior = 'smooth') => {
    const item = items.getByKey(key as K)
    if (!item) return
    
    scrollToElement(item, behavior)
  }, [scrollToElement])
  
  const getCommited = useCallback(() => committedKey.current, [])
  const getPending = useCallback(() => pendingKey.current, [])
  
  useLayoutEffect(() => {
    scheduleMeasure();
  }, [scheduleMeasure])
  
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    
    hasNativeScrollEndRef.current = 'onscrollend' in scroller;
    if (!hasNativeScrollEndRef.current) return;
    
    const onScrollEnd = () => {
      if (endTimerId.current != null) {
        window.clearTimeout(endTimerId.current);
        endTimerId.current = null;
      }
      commit();
    };
    
    scroller.addEventListener('scrollend', onScrollEnd as EventListener);
    
    return () => {
      scroller.removeEventListener('scrollend', onScrollEnd as EventListener);
    };
  }, [commit, scrollerRef])
  
  useEffect(() => {
    return () => {
      if (rafScrollId.current != null) cancelAnimationFrame(rafScrollId.current);
      if (rafMeasureId.current != null) cancelAnimationFrame(rafMeasureId.current);
      if (endTimerId.current != null) window.clearTimeout(endTimerId.current);
    };
  }, [])

  return {
    itemRef: setItemRef,
    removeItemRef,
    onScroll,
    scrollToElement,
    scrollToElementByKey,
    getCommited,
    getPending,
    measure
  };
};