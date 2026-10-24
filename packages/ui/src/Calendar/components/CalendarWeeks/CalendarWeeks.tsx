import { FC, ReactNode } from 'react';
import { DayPickerScroller, DayPickerScrollerContent, DayPickerScrollerLayout, DayPickerScrollerProps } from '../../../DayPicker';
import { useCalendarContext } from '../../contexts';

export interface CalendarWeeksProps extends Omit<DayPickerScrollerProps, 'apiRef' | 'onChangePeriod' | 'defaultMonth'> {
  /**
   * Template of a day cell, rendered once for every day of the visible months.
   * Read the day with `useCalendarDayContext()`; usually `<CalendarDay />`.
   */
  children: ReactNode

  /**
   * Format of the day numbers (`Intl.DateTimeFormat` `day`).
   * @default "numeric"
   */
  format?: Intl.DateTimeFormatOptions['day']

  /**
   * Whether days of the previous and next months fill the empty cells.
   * @default false
   */
  includeOverflowDays?: boolean
}

/**
 * `CalendarWeeks` is the grid of days of `CalendarDays`, week by week,
 * swipeable between months. Its children are the template of a day cell,
 * usually `<CalendarDay />`, so days can render any content while the
 * grid stays managed by the calendar.
 */
export const CalendarWeeks: FC<CalendarWeeksProps> = ({ children, format, includeOverflowDays, ...props }) => {
  const { scrollerApiRef, changePeriod, disabled } = useCalendarContext()

  return (
    <DayPickerScroller apiRef={scrollerApiRef} onChangePeriod={changePeriod} inert={disabled} {...props}>
      <DayPickerScrollerContent>
        <DayPickerScrollerLayout format={format} includeOverflowDays={includeOverflowDays}>
          {children}
        </DayPickerScrollerLayout>
      </DayPickerScrollerContent>
    </DayPickerScroller>
  )
}
