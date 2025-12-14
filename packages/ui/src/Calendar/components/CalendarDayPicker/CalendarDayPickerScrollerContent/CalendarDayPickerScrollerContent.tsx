import { FC } from 'react';
import { DayPickerScrollerContent, DayPickerScrollerContentProps } from '../../../../DayPicker';

export type CalendarDayPickerScrollerContentProps = DayPickerScrollerContentProps

/**
 * `CalendarDayPickerScrollerContent` is a calendar-scoped alias for the
 * `DayPickerScrollerContent` primitive. It provides the structural wrapper
 * used inside `CalendarDayPickerScroller` to host virtualized or
 * scroll-snap–driven day rows.
 */
export const CalendarDayPickerScrollerContent: FC<CalendarDayPickerScrollerContentProps> = (props) => {
  return <DayPickerScrollerContent {...props} />
}