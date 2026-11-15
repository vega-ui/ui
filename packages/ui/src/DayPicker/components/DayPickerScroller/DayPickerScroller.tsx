import { FC, PropsWithChildren } from 'react';
import { addCalendarMonths, getCalendarMonthsDistance } from '@vega-ui/i18n';
import { DayPickerScrollerProvider, useDayPickerContext } from '../../contexts';
import { IndexedSnapScroller, type IndexedSnapScrollerProps } from '../../../IndexedSnapScroller';

export interface DayPickerScrollerProps extends IndexedSnapScrollerProps {
  /**
   * Called when a month page is scrolled into view, with the first day of
   * that month as a `YYYY-MM-DD` string in the DayPicker's calendar system.
   */
  onChangePeriod?(month: string): void
}

/**
 * DayPickerScroller is a thin wrapper around IndexedSnapScroller
 * that enables paged, swipe-driven navigation for DayPicker layouts.
 *
 * It follows the month of the focused day of the DayPicker, and a month
 * scrolled into view moves the focused day to the same day of that month.
 * Each page index is a number of months from the month the scroller started
 * on, counted in the DayPicker's calendar system, so months of any length and
 * years of any number of months scroll the same way.
 */
export const DayPickerScroller: FC<PropsWithChildren<DayPickerScrollerProps>> = ({
  onChangePeriod,
  onScrollSnapChanging: _onScrollSnapChanging,
  ...props
}) => {
  const { month, anchor: referenceMonth, calendar, show } = useDayPickerContext()
  if (referenceMonth === undefined || month === undefined) return null

  const onSnapChanging = (element: HTMLElement, index: number) => {
    const next = addCalendarMonths(calendar, referenceMonth, index)

    show(next, element)
    onChangePeriod?.(next)
    _onScrollSnapChanging?.(element, index)
  }

  return (
    <DayPickerScrollerProvider referenceMonth={referenceMonth}>
      <IndexedSnapScroller
        index={getCalendarMonthsDistance(calendar, referenceMonth, month)}
        onScrollSnapChanging={onSnapChanging}
        {...props}
      />
    </DayPickerScrollerProvider>
  )
}
