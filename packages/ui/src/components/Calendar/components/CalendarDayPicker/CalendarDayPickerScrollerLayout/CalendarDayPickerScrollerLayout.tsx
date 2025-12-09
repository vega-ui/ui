import { DayPickerScrollerLayout, DayPickerScrollerLayoutProps } from '../../../../DayPicker';
import { FC } from 'react';

export type CalendarDayPickerScrollerLayoutProps = DayPickerScrollerLayoutProps

/**
 * `CalendarDayPickerScrollerLayout` is a calendar-scoped wrapper around
 * the `DayPickerScrollerLayout` primitive. It defines the structural
 * blueprint for laying out day rows inside a scrollable day picker while
 * delegating all mechanics to the underlying `DayPicker` system.
 */
export const CalendarDayPickerScrollerLayout: FC<CalendarDayPickerScrollerLayoutProps> = (props) => {
  return <DayPickerScrollerLayout {...props} />
}