import { FC } from 'react';
import { MonthPickerRow, MonthPickerRowProps } from '../../../../MonthPicker';

export type CalendarMonthPickerRowProps = MonthPickerRowProps

/**
 * `CalendarMonthPickerRow` is a calendar-scoped alias for `MonthPickerRow`,
 * representing a single horizontal row of month cells inside
 * `CalendarMonthPicker`. It forwards all props directly to the underlying
 * `MonthPickerRow` component without altering behavior or layout.
 */
export const CalendarMonthPickerRow: FC<CalendarMonthPickerRowProps> = (props) => {
  return <MonthPickerRow {...props} />
}