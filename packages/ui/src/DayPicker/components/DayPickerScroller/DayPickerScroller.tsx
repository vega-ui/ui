import { FC, PropsWithChildren, useRef, useState } from 'react';
import { addCalendarMonths, getCalendarMonthStart, getCalendarMonthsDistance } from '@vega-ui/i18n';
import { IndexedSnapScrollerApiRef } from '../../../IndexedSnapScroller';
import { DayPickerScrollerProvider, useDayPickerContext } from '../../contexts';
import { formatISODate, getCurrentDate, mergeRefs } from '@vega-ui/utils';
import { DataGridPickerScroller, type DataGridPickerScrollerProps } from '../../../DataGridPicker';

export interface DayPickerScrollerProps extends DataGridPickerScrollerProps {
  /**
   * Called when a month page is scrolled into view, with the first day of
   * that month as a `YYYY-MM-DD` string in the DayPicker's calendar system.
   */
  onChangePeriod?(month: string): void

  /**
   * Initial month for uncontrolled usage outside a DayPicker,
   * given as a `YYYY-MM-DD` string of any day in it.
   * Defaults to the current month.
   */
  defaultMonth?: string
}

/**
 * DayPickerScroller is a thin wrapper around IndexedSnapScroller
 * that enables paged, swipe-driven navigation for DayPicker layouts.
 *
 * It provides horizontal (or vertical, if configured) scrolling between
 * month pages. Each page index is a number of months from the month the
 * scroller started on, counted in the DayPicker's calendar system, so months
 * of any length and years of any number of months scroll the same way.
 */
export const DayPickerScroller: FC<PropsWithChildren<DayPickerScrollerProps>> = ({
  apiRef,
  defaultMonth,
  onChangePeriod,
  onScrollSnapChanging: _onScrollSnapChanging,
  ...props
}) => {
  const { month, calendar } = useDayPickerContext()

  const scrollerApiRef = useRef<IndexedSnapScrollerApiRef>(null)
  const [referenceMonth] = useState(() => getCalendarMonthStart(calendar, month || defaultMonth || formatISODate(getCurrentDate())))

  const index = month ? getCalendarMonthsDistance(calendar, referenceMonth, month) : undefined

  const onSnapChanging = (element: HTMLElement, index: number) => {
    onChangePeriod?.(addCalendarMonths(calendar, referenceMonth, index))
    _onScrollSnapChanging?.(element, index)
  }

  return (
    <DayPickerScrollerProvider referenceMonth={referenceMonth}>
      <DataGridPickerScroller
        index={index}
        defaultIndex={index ?? 0}
        apiRef={mergeRefs([apiRef, scrollerApiRef])}
        onScrollSnapChanging={onSnapChanging}
        {...props}
      />
    </DayPickerScrollerProvider>
  )
}
