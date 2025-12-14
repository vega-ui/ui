import { FC } from 'react';
import { DayPickerItem, DayPickerItemProps } from '../../../../DayPicker';

export type CalendarDayPickerItemProps = DayPickerItemProps

/**
 * `CalendarDayPickerItem` is a thin wrapper around the low-level
 * `DayPickerItem` component. It provides a calendar-scoped alias for
 * rendering individual day cells inside `CalendarDayPicker`, without
 * adding additional logic or behavior.
 */
export const CalendarDayPickerItem: FC<CalendarDayPickerItemProps> = (props) => {
  return <DayPickerItem {...props} />
}