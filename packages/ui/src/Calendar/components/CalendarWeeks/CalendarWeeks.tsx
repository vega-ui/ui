import { FC, ReactNode } from 'react';
import { DayPickerLayout, DayPickerScrollerLayout, DayPickerScrollerLayoutProps } from '../../../DayPicker';
import { useCalendarScrollerContext } from '../../contexts';

export interface CalendarWeeksProps extends Omit<DayPickerScrollerLayoutProps, 'rows' | 'locale' | 'weekStartsOn'> {
  /**
   * Template of a day cell, rendered once for every day of the month.
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
 * `CalendarWeeks` is the grid of days of a month, week by week. Inside
 * `CalendarDaysScrollerContent` it shows the month of the page; placed right in
 * `CalendarDays` it shows the month of the focused day. Its children are
 * the template of a day cell, usually `<CalendarDay />`.
 */
export const CalendarWeeks: FC<CalendarWeeksProps> = (props) => {
  const { inScroller } = useCalendarScrollerContext()

  if (inScroller) return <DayPickerScrollerLayout {...props} />

  return <DayPickerLayout {...props} />
}
