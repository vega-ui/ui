import { FC, PropsWithChildren, useRef } from 'react';
import { IndexedSnapScrollerApiRef } from '../../../IndexedSnapScroller';
import { useYearPickerContext, YearPickerScrollerProvider } from '../../contexts';
import { getCurrentDate, mergeRefs } from '@vega-ui/utils';
import { getIndexByYear as defaultGetIndexByYear } from '../../helpers';
import { DataGridPickerScroller, type DataGridPickerScrollerProps } from '../../../DataGridPicker';

export interface YearPickerScrollerProps extends DataGridPickerScrollerProps {
  /**
   * A reference (anchor) year used as the logical origin for index calculation.
   *
   * All page indices are resolved relative to this year. Changing the
   * `referenceYear` effectively shifts the entire year grid timeline
   * without altering grouping or layout logic.
   *
   * @default 1970
   */
  referenceYear?: number
  
  /**
   * The initial year used to determine the default scroller page
   * when the component is uncontrolled.
   *
   * If no explicit `year` is provided via YearPicker context,
   * the scroller will resolve this year to a page index using
   * `getIndexByYear` and snap to the corresponding group on mount.
   *
   * Falls back to the current calendar year when omitted.
   */
  defaultYear?: number
  
  /**
   * Maps a calendar year to the corresponding scroller page index.
   * Use this to support custom grouping logic (variable page sizes,
   * non-contiguous groups, etc.).
   */
  getIndexByYear?(year: number, referenceYear: number): number
}

/**
 * YearPickerScroller is a semantic wrapper around IndexedSnapScroller
 * that provides paged, scroll-snap navigation for year grids.
 * It enables smooth decade-style scrolling, preserves the active page,
 * and integrates seamlessly with YearPicker layouts. The component
 * accepts all SnapScroller props and adds no custom logic of its own.
 */
export const YearPickerScroller: FC<PropsWithChildren<YearPickerScrollerProps>> = ({
  apiRef,
  referenceYear = 1970,
  defaultYear,
  getIndexByYear,
  ...props
}) => {
  const { year } = useYearPickerContext()
  
  const scrollerApiRef = useRef<IndexedSnapScrollerApiRef>(null)
  const currentYear = getCurrentDate().getFullYear()
  
  const getIndex = (year: number) => {
    if (getIndexByYear !== undefined) return getIndexByYear(year, referenceYear)
    return defaultGetIndexByYear(year, referenceYear)
  }
  
  const index = year !== undefined ? getIndex(year) : undefined
  const defaultIndex = index === undefined ? getIndex(defaultYear ?? currentYear) : undefined
  
  return (
    <YearPickerScrollerProvider referenceYear={referenceYear}>
      <DataGridPickerScroller
        index={index}
        defaultIndex={defaultIndex}
        apiRef={mergeRefs([apiRef, scrollerApiRef])}
        {...props}
      />
    </YearPickerScrollerProvider>
  )
}