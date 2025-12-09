import { FC } from 'react';
import { MonthPickerRowGroup, MonthPickerRowGroupProps } from '../../../../MonthPicker';

export type CalendarMonthPickerRowGroupProps = MonthPickerRowGroupProps

/**
 * `CalendarMonthPickerRowGroup` is a calendar-scoped alias for
 * `MonthPickerRowGroup`, used to group multiple month rows inside
 * `CalendarMonthPicker`.
 */
export const CalendarMonthPickerRowGroup: FC<CalendarMonthPickerRowGroupProps> = (props) => {
  return <MonthPickerRowGroup {...props} />
}