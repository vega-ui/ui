import { FC } from 'react';
import { MonthPickerLayout, MonthPickerLayoutProps } from '../../../MonthPicker';

export type CalendarMonthsGridProps = Omit<MonthPickerLayoutProps, 'locale'>

/**
 * `CalendarMonthsGrid` is the grid of the months of `CalendarMonths`, `cols`
 * months per row. Its children are the template of a month cell, usually
 * `<CalendarMonth />`.
 */
export const CalendarMonthsGrid: FC<CalendarMonthsGridProps> = (props) => {
  return <MonthPickerLayout {...props} />
}
