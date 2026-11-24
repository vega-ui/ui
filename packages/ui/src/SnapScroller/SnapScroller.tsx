import { FC, HTMLAttributes, PropsWithChildren, Ref, useImperativeHandle } from 'react';
import { csx } from '@vega-ui/utils';
import type { SnapScrollerOrientation } from '@vega-ui/widgets/snap-scroller';
import { SnapScrollerProvider } from './contexts'
import { useSnapScroller } from './hooks';
import style from './style.module.css'
import { SnapScrollerApiRef } from './types';

export interface SnapScrollerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref to the scroller’s element.
   */
  ref?: Ref<HTMLDivElement>;
  
  /**
   * Ref to the scroller’s imperative API.
   * Provides `prev()`, `next()` and `scrollToElementByKey()` for programmatic control.
   */
  apiRef?: Ref<SnapScrollerApiRef>;
  
  /**
   * Initial index of the item to snap to on mount.
   */
  defaultIndex?: number

  /**
   * The axis the scroller scrolls and snaps along. A vertical scroller stacks its items in a column.
   *
   * @default 'horizontal'
   */
  orientation?: SnapScrollerOrientation
  
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
 * It detects the currently snapped child and exposes imperative navigation.
 *
 * Children must be direct scroller items and carry `data-index` so the
 * snapped page can be derived.
 */
export const SnapScroller: FC<PropsWithChildren<SnapScrollerProps>> = ({
  ref,
  className,
  onScrollSnapChange,
  onScrollSnapChanging,
  defaultIndex,
  orientation = 'horizontal',
  children,
  apiRef,
  ...props
}) => {
  const { handle, ref: mergedRef, api } = useSnapScroller({ ref, defaultIndex, orientation, onScrollSnapChange, onScrollSnapChanging })

  useImperativeHandle(apiRef, () => api, [api])

  return (
    <SnapScrollerProvider handle={handle}>
      <div
        ref={mergedRef}
        className={csx(className, style.scrollView)}
        data-orientation={orientation}
        {...handle.listen({}, props)}
      >
        {children}
      </div>
    </SnapScrollerProvider>
  )
}
