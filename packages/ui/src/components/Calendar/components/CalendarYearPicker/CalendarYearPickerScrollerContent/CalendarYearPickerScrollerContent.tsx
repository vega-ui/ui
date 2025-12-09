import { FC } from 'react';
import { YearPickerScrollerContent, YearPickerScrollerProps } from '../../../../YearPicker';

export type CalendarYearPickerScrollerContentProps = YearPickerScrollerProps

/**
 * `CalendarYearPickerScrollerContent` is the calendar-scoped alias for
 * `YearPickerScrollerContent`, representing the inner scrollable content
 * container of the year-picker’s virtualized or snap-based scrolling
 * system.
 */
export const CalendarYearPickerScrollerContent: FC<CalendarYearPickerScrollerContentProps> = (props) => {
  return <YearPickerScrollerContent {...props} />
}