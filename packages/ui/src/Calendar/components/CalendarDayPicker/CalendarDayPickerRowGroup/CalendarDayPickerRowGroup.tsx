import { FC } from 'react';
import { DayPickerRowGroup, DayPickerRowGroupProps } from '../../../../DayPicker';

export type CalendarDayPickerRowGroupProps = DayPickerRowGroupProps

/**
 * `CalendarDayPickerRowGroup` is a semantic wrapper around the underlying
 * `DayPickerRowGroup` component, providing a calendar-scoped alias for
 * grouping multiple day rows within `CalendarDayPicker`.
 */
export const CalendarDayPickerRowGroup: FC<CalendarDayPickerRowGroupProps> = (props) => {
  return <DayPickerRowGroup {...props} />
}