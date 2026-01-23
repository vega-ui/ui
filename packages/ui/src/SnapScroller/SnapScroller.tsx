import {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import style from './style.module.css'
import { csx, mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { SnapScrollerProvider } from './contexts';
import { useScrollSnap } from '@vega-ui/hooks';
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
   * Initial index of the item to snap to on mount.
   */
  defaultIndex?: number
  
  /**
   * Fired when a scroll snap operation has fully completed
   * and the scroller has settled on a new snap index.
   *
   * This callback is invoked after all scrolling and snapping
   * animations have finished and the active snap position
   * is considered stable.
   *
   * @param element - The root scroller element.
   * @param index - The resolved snap index after snapping completes.
   */
  onScrollSnapChange?(element: HTMLElement, index: number): void
  
  /**
   * Fired while a scroll snap operation is in progress and
   * the active snap index is still changing.
   *
   * This callback may be invoked multiple times during a
   * single scroll or swipe interaction as the scroller
   * approaches its final snap position.
   *
   * Useful for optimistic UI updates, previews, or
   * synchronizing transient state during scrolling.
   *
   * @param element - The root scroller element.
   * @param index - The current candidate snap index.
   */
  onScrollSnapChanging?(element: HTMLElement, index: number): void
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
  className,
  onScroll: _onScroll,
  onScrollSnapChange,
  onScrollSnapChanging,
  defaultIndex,
  children,
  apiRef,
  ...props
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  
  const {
    onScroll,
    itemRef,
    removeItemRef,
    scrollToElementByKey,
    getCommited,
    getPending,
    measure
  } = useScrollSnap<number, HTMLDivElement>({
    scrollerRef,
    onSnapChanging: onScrollSnapChanging,
    onSnapChange: onScrollSnapChange,
  })
  
  const didInitScroll = useRef(false)
  
  const scrollByDelta = (delta: number) => {
    const index = getCommited()
    if (index === undefined) return

    scrollToElementByKey(index + delta, 'smooth');
  };
  
  useImperativeHandle(apiRef, () => ({
    prev() {
      scrollByDelta(-1);
    },
    next() {
      scrollByDelta(1);
    },
    scrollToElementByKey,
    getCommited,
    getPending,
    measure,
  }));
  
  const setScrollRef = useCallback((element: HTMLDivElement) => {
    if (scrollerRef.current) return;
    scrollerRef.current = element;
    
    if (didInitScroll.current) return;
    didInitScroll.current = true;
    
    if (defaultIndex !== undefined) scrollToElementByKey(defaultIndex, 'instant');
  }, [defaultIndex]);

  return (
    <SnapScrollerProvider removeItemRef={removeItemRef} itemRef={itemRef}>
      <div
        onScroll={mergeEventHandlers(_onScroll, onScroll)}
        ref={mergeRefs([setScrollRef, ref])}
        className={csx(className, style.scrollView)}
        {...props}
      >
        {children}
      </div>
    </SnapScrollerProvider>
  )
}