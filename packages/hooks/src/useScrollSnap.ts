import { RefObject, UIEvent, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useMutationObserver } from './useMutationObserver';
import { useResizeObserver } from './useResizeObserver';
import { useEventCallback } from './useEventCallback';
import { nearest } from '@vega-ui/utils';
import { useBiMap } from './useBiMap';

export type ScrollSnapAxis = 'x' | 'y';
export type ScrollSnapAlign = 'start' | 'center' | 'end';

const parsePx = (v: string | null | undefined) => {
  const n = parseFloat(v || '0');
  return Number.isFinite(n) ? n : 0;
}

const getScrollPaddingStart = (cs: CSSStyleDeclaration, axis: ScrollSnapAxis) => {
  if (axis === 'x') return parsePx(cs.scrollPaddingInlineStart || cs.scrollPaddingLeft);
  return parsePx(cs.scrollPaddingBlockStart || cs.scrollPaddingTop);
}

interface ScrollerLayout {
  padStart: number;
  rtl: boolean;
}

const readScrollerLayout = (scroller: HTMLElement, axis: ScrollSnapAxis, respectScrollPadding: boolean): ScrollerLayout => {
  const cs = getComputedStyle(scroller);
  
  return {
    padStart: respectScrollPadding ? getScrollPaddingStart(cs, axis) : 0,
    rtl: axis === 'x' && cs.direction === 'rtl',
  };
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

const defaultGetSnapPoint = (scroller: HTMLElement, el: HTMLElement, axis: ScrollSnapAxis, align: ScrollSnapAlign, { padStart, rtl }: ScrollerLayout) => {
  if (!scroller.contains(el)) {
    return axis === 'x' ? scroller.scrollLeft : scroller.scrollTop;
  }
  
  const viewportSize = axis === 'x' ? scroller.clientWidth : scroller.clientHeight;
  
  const elStartInScroll = getElementOffsetInScroller(scroller, el, axis);
  const elSize = axis === 'x' ? el.offsetWidth : el.offsetHeight;
  
  const elCenterInScroll = elStartInScroll + elSize / 2;
  const elEndInScroll = elStartInScroll + elSize;
  
  if (align === 'center') return elCenterInScroll - viewportSize / 2;
  
  if (rtl) {
    if (align === 'start') return elEndInScroll - viewportSize + padStart;
    return elStartInScroll;
  }
  
  if (align === 'start') return elStartInScroll - padStart;
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
  onSnapChanging: _onSnapChanging,
  onSnapChange: _onSnapChange,
  scrollEndDebounceMs = 80,
}: UseScrollSnapOptions<K, E>) => {
  const points = useBiMap<K, number>()
  const items = useBiMap<K, HTMLElement>()
  
  const setItemRef = useCallback((key: K) => (element: HTMLElement) => {
    items.set(key, element);
  }, [items])

  const removeItemRef = useCallback((key: K) => {
    items?.deleteByKey(key)
  }, [items])

  const onSnapChanging = useEventCallback(_onSnapChanging)
  const onSnapChange = useEventCallback(_onSnapChange)
  const customSnapPoint = useEventCallback(getSnapPoint)
  const hasCustomSnapPoint = getSnapPoint != null
  
  const committedKey = useRef<K | null>(null);
  const pendingKey = useRef<K | null>(null);
  
  const rafScrollId = useRef<number | null>(null);
  const rafMeasureId = useRef<number | null>(null);
  const endTimerId = useRef<number | null>(null);
  
  const hasNativeScrollEndRef = useRef(false);
  
  const calculateSnapPoint = useCallback((element: HTMLElement, layout?: ScrollerLayout) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    if (hasCustomSnapPoint) return customSnapPoint(scroller, element, axis, align);

    return defaultGetSnapPoint(scroller, element, axis, align, layout ?? readScrollerLayout(scroller, axis, respectScrollPadding));
  }, [respectScrollPadding, axis, align, hasCustomSnapPoint, customSnapPoint, scrollerRef])
  
  const getPointed = useCallback((scroller?: HTMLElement) => {
    const s = scroller ?? scrollerRef.current;
    if (!s) return;
    
    const scrollOffset = axis === 'x' ? s.scrollLeft : s.scrollTop;
    const pointsArray = Array.from(points.values()).sort((a, b) => a - b);

    const nearestIndex = nearest(pointsArray, scrollOffset)
    if (nearestIndex === -1) return { key: null, element: null }

    const nearestOffset = pointsArray[nearestIndex]

    const key = points.getByValue(nearestOffset) ?? null
    const element = (key !== null ? items.getByKey(key) : null) ?? null

    return { key, element }
  }, [axis, points, items, scrollerRef])
  
  const measurePoints = useCallback(() => {
    points.clear();
    
    const scroller = scrollerRef.current;
    if (!scroller) return;
    
    const layout = readScrollerLayout(scroller, axis, respectScrollPadding);
    
    for (const key of items.keys()) {
      const element = items.getByKey(key);
      if (!element) continue;

      const point = calculateSnapPoint(element, layout);
      if (point == null) continue;

      points.set(key, point);
    }
  }, [calculateSnapPoint, items, points, scrollerRef, axis, respectScrollPadding]);

  const measure = useCallback(() => {
    measurePoints();

    const pointed = getPointed();
    if (!pointed) return;

    const existsCommitted = committedKey.current !== null && items.getByKey(committedKey.current) != null;

    if (!existsCommitted) {
      committedKey.current = pointed.key;
      pendingKey.current = pointed.key;
    }
  }, [measurePoints, getPointed, items]);

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
    if (!points.size) measurePoints()

    const pointed = getPointed()
    if (!pointed) return;

    const { key, element } = pointed;

    if (key === committedKey.current) return;

    const changing = key !== pendingKey.current

    committedKey.current = key;
    pendingKey.current = key;
    if (!element || key === null) return;

    if (changing) onSnapChanging(element, key);
    onSnapChange(element, key);
  }, [onSnapChanging, onSnapChange, getPointed, measurePoints, points])
  
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

      const pointed = getPointed(target)
      if (!pointed) return;

      const { key, element } = pointed;

      if (key !== pendingKey.current) {
        pendingKey.current = key;
        if (element && key !== null) onSnapChanging(element, key);
      }

      // Native-like: commit only on real scroll end when possible
      if (!hasNativeScrollEndRef.current) scheduleCommitFallback();
    });
  }, [onSnapChanging, scheduleMeasure, scheduleCommitFallback, getPointed, points]);
  
  const scrollToElement = useCallback((el: HTMLElement, behavior: ScrollBehavior = 'auto') => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    
    if (!points.size) scheduleMeasure();
    
    const key = items.getByValue(el)
    const target = (key !== undefined ? points.getByKey(key) : undefined) ?? calculateSnapPoint(el);

    if (target == null || !Number.isFinite(target)) return;

    if (axis === 'y') {
      scroller.scrollTo({ top: target, behavior });
      return
    }
    
    scroller.scrollTo({ left: target, behavior });
  }, [axis, scheduleMeasure, calculateSnapPoint, items, points, scrollerRef])
  
  const scrollToElementByKey = useCallback((key: K, behavior: ScrollBehavior = 'auto') => {
    const item = items.getByKey(key as K)
    if (!item) return false
    
    if (behavior === 'instant') pendingKey.current = key
    scrollToElement(item, behavior)
    return true
  }, [scrollToElement, items])
  
  const getCommitted = useCallback(() => committedKey.current, [])
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
    getCommitted,
    getPending,
    measure
  };
};