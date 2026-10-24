import { FC, PropsWithChildren, useRef, useState } from 'react';
import { addCalendarYears, getCalendarYearStart, getCalendarYearsDistance } from '@vega-ui/i18n';
import { IndexedSnapScrollerApiRef } from '../../../IndexedSnapScroller';
import { useYearPickerContext, YearPickerScrollerProvider } from '../../contexts';
import { formatISODate, getCurrentDate, mergeRefs } from '@vega-ui/utils';
import { DataGridPickerScroller, type DataGridPickerScrollerProps } from '../../../DataGridPicker';

export interface YearPickerScrollerProps extends DataGridPickerScrollerProps {
  /**
   * Called when a page of years is scrolled into view, with the first day of
   * the first year of that page as a `YYYY-MM-DD` string in the YearPicker's
   * calendar system.
   */
  onChangePeriod?(year: string): void

  /**
   * Initial year for uncontrolled usage outside a YearPicker,
   * given as a `YYYY-MM-DD` string of any day in it.
   * Defaults to the current year.
   */
  defaultYear?: string

  /**
   * Number of years on a page; must match the page size of the layout.
   * @default 12
   */
  period?: number
}

/**
 * YearPickerScroller is a semantic wrapper around IndexedSnapScroller
 * that provides paged, scroll-snap navigation for year grids.
 * Pages hold `period` consecutive years counted in the YearPicker's
 * calendar system from the year the scroller started on.
 */
export const YearPickerScroller: FC<PropsWithChildren<YearPickerScrollerProps>> = ({
  apiRef,
  defaultYear,
  period = 12,
  onChangePeriod,
  onScrollSnapChanging: _onScrollSnapChanging,
  ...props
}) => {
  const { year, calendar } = useYearPickerContext()
  
  const scrollerApiRef = useRef<IndexedSnapScrollerApiRef>(null)
  const [referenceYear] = useState(() => getCalendarYearStart(calendar, year || defaultYear || formatISODate(getCurrentDate())))
  
  const index = year ? Math.floor(getCalendarYearsDistance(calendar, referenceYear, year) / period) : undefined
  
  const onSnapChanging = (element: HTMLElement, index: number) => {
    onChangePeriod?.(addCalendarYears(calendar, referenceYear, index * period))
    _onScrollSnapChanging?.(element, index)
  }
  
  return (
    <YearPickerScrollerProvider referenceYear={referenceYear}>
      <DataGridPickerScroller
        index={index}
        defaultIndex={index ?? 0}
        apiRef={mergeRefs([apiRef, scrollerApiRef])}
        onScrollSnapChanging={onSnapChanging}
        {...props}
      />
    </YearPickerScrollerProvider>
  )
}
