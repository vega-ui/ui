import { FC, PropsWithChildren } from 'react';
import { IndexedSnapScroller, IndexedSnapScrollerProps } from '../../../IndexedSnapScroller';

export type DayPickerScrollerProps = IndexedSnapScrollerProps

/**
 * DayPickerScroller is a thin wrapper around IndexedSnapScroller
 * that enables paged, swipe-driven navigation for DayPicker layouts.
 *
 * It provides horizontal (or vertical, if configured) scrolling between
 * month pages, while keeping each page tied to a logical “index” managed
 * by IndexedSnapScroller.
 *
 * This component adds no custom behavior — it simply binds the DayPicker
 * to the scroller system, making it possible to implement:
 * - infinite month scrolling,
 * - paged month transitions,
 * - offset-based grid generation.
 */
export const DayPickerScroller: FC<PropsWithChildren<DayPickerScrollerProps>> = (props) => {
  return <IndexedSnapScroller {...props} />
}