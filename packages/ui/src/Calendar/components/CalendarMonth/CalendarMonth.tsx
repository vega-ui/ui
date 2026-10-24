import { FC } from 'react';
import { MonthPickerCell, MonthPickerCellProps } from '../../../MonthPicker';

export type CalendarMonthProps = MonthPickerCellProps

/**
 * `CalendarMonth` is a month cell of `CalendarMonths`. Place it as the template
 * of `CalendarMonths`; without children it shows the month name.
 */
export const CalendarMonth: FC<CalendarMonthProps> = (props) => {
  return <MonthPickerCell {...props} />
}
