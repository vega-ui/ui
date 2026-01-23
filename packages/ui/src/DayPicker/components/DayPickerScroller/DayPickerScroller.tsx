import { FC, PropsWithChildren, useRef } from 'react';
import { IndexedSnapScrollerApiRef } from '../../../IndexedSnapScroller';
import { useDayPickerContext } from '../../contexts';
import { getIndexByDate as defaultGetIndexByDate, getDateByIndex as defaultGetDateByIndex } from '../../helpers';
import { DayPickerScrollerProvider } from '../../contexts';
import { getCurrentDate, mergeRefs } from '@vega-ui/utils';
import { DataGridPickerScroller, type DataGridPickerScrollerProps } from '../../../DataGridPicker';

export interface DayPickerScrollerProps extends DataGridPickerScrollerProps {
  /**
   * Anchor date used as a stable reference point for date-to-index mapping.
   *
   * The picker converts calendar dates into linear indexes (e.g. month or day offsets)
   * and uses this anchor as index `0`. Keeping the anchor stable ensures that the same
   * date always maps to the same index, which is important for restoring position
   * when reopening the picker or loading a value from persistence.
   *
   * Only the calendar portion of the date is used (year/month/day depending on the
   * picker mode). Time components should be considered irrelevant.
   */
  referenceDate?: Date
  
  /**
   * Called when the visible month or year changes.
   *
   * Fired whenever the `DayPickerScroller` updates the currently displayed
   * month or year as a result of user interaction (e.g. scrolling, keyboard navigation).
   *
   * Note: The `month` value follows the JavaScript `Date` convention:
   * `0` = January, `11` = December.
   */
  onChangePeriod?(year: number, month: number): void
  
  /**
   * Initial visible year for uncontrolled usage.
   *
   * Used only when neither `year` nor `month` is controlled via context.
   * Defines the year of the initially visible month page.
   */
  defaultYear?: number
  
  /**
   * Initial visible month for uncontrolled usage.
   *
   * Uses JavaScript month indexing:
   * `0` = January, `11` = December.
   *
   * Applied together with `defaultYear` to compute the initial page index.
   */
  defaultMonth?: number
  
  /**
   * Custom function that maps a calendar date to a scroller index.
   *
   * This allows overriding the default linear date-to-index mapping,
   * enabling alternative calendar systems, custom paging strategies,
   * or non-Gregorian timelines.
   *
   * The returned index must be stable: the same `(year, month)` pair
   * should always resolve to the same index.
   */
  getIndexByDate?(year: number, month: number): number
  
  /**
   * Inverse mapping function for `getIndexByDate`.
   *
   * Converts a scroller index back into a calendar year and month.
   * Used when the scroller changes pages to determine which period
   * should become visible.
   *
   * Must be consistent with `getIndexByDate` to ensure correct
   * navigation and focus restoration.
   */
  getDateByIndex?(index: number): { year: number; month: number }
}

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
export const DayPickerScroller: FC<PropsWithChildren<DayPickerScrollerProps>> = ({
  apiRef,
  defaultYear,
  defaultMonth,
  referenceDate,
  onChangePeriod,
  getIndexByDate,
  getDateByIndex,
  onScrollSnapChanging: _onScrollSnapChanging,
  ...props
}) => {
  const { year, month } = useDayPickerContext()

  const scrollerApiRef = useRef<IndexedSnapScrollerApiRef>(null)
  const reference = referenceDate ?? new Date(1970, 0, 1)
  const current = getCurrentDate()
  
  const getIndex = (year: number = current.getFullYear(), month: number = current.getMonth()) => {
    if (getIndexByDate !== undefined) return getIndexByDate(year, month)
    return defaultGetIndexByDate(reference, year, month)
  }
  
  const index = year !== undefined || month !== undefined ? getIndex(year, month) : undefined
  const defaultIndex = index === undefined ? getIndex(defaultYear, defaultMonth) : index
  
  const onSnapChanging = (element: HTMLElement, index: number) => {
    const { year, month } = getDateByIndex ? getDateByIndex(index) : defaultGetDateByIndex(index, reference)
    
    onChangePeriod?.(year, month)
    _onScrollSnapChanging?.(element, index)
  }
  
  return (
    <DayPickerScrollerProvider referenceDate={reference}>
      <DataGridPickerScroller
        index={index}
        defaultIndex={defaultIndex}
        apiRef={mergeRefs([apiRef, scrollerApiRef])}
        onScrollSnapChanging={onSnapChanging}
        {...props}
      />
    </DayPickerScrollerProvider>
  )
}