import { FC, PropsWithChildren } from 'react';
import { addCalendarYears, getCalendarYearsDistance } from '@vega-ui/i18n';
import { useMergeRefs } from '@vega-ui/hooks';
import { useYearPickerContext } from '../../contexts';
import { GridScroller, type GridScrollerProps } from '../../../Grid';

export interface YearPickerScrollerProps extends GridScrollerProps {
  /**
   * Called when a page of years is scrolled into view, with the first day of
   * the first year of that page as a `YYYY-MM-DD` string in the YearPicker's
   * calendar system.
   */
  onChangePeriod?(year: string): void
}

/**
 * YearPickerScroller is a semantic wrapper around IndexedSnapScroller
 * that provides paged, scroll-snap navigation for year grids.
 * Pages hold `period` consecutive years of the YearPicker, counted in its
 * calendar system from the first focused year. It shows the page of the
 * focused year; scrolling to another page moves the focus to the same
 * place on it, and PageUp / PageDown move the focus by one page of years.
 */
export const YearPickerScroller: FC<PropsWithChildren<YearPickerScrollerProps>> = ({
  onChangePeriod,
  onScrollSnapChanging: _onScrollSnapChanging,
  ref,
  ...props
}) => {
  const { year, anchor, calendar, period, show, pages } = useYearPickerContext()
  const mergedRef = useMergeRefs([pages, ref])

  if (year === undefined || anchor === undefined) return null

  const index = Math.floor(getCalendarYearsDistance(calendar, anchor, year) / period)

  const onSnapChanging = (element: HTMLElement, next: number) => {
    if (next !== index) show(addCalendarYears(calendar, year, (next - index) * period), element)
    onChangePeriod?.(addCalendarYears(calendar, anchor, next * period))
    _onScrollSnapChanging?.(element, next)
  }

  return <GridScroller ref={mergedRef} index={index} onScrollSnapChanging={onSnapChanging} {...props} />
}
