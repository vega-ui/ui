import { FC } from 'react';
import { MonthPickerLayout, MonthPickerLayoutProps } from '../../../../MonthPicker';

export type CalendarMonthPickerLayoutProps = MonthPickerLayoutProps

/**
 * `CalendarMonthPickerLayout` is a calendar-scoped wrapper around the
 * low-level `MonthPickerLayout` primitive. It provides the structural
 * layout for month cells within `CalendarMonthPicker` while preserving the
 * original rendering, focus handling, and grid mechanics of the underlying
 * month picker.
 */
export const CalendarMonthPickerLayout: FC<CalendarMonthPickerLayoutProps> = (props) => {
  return <MonthPickerLayout {...props} />
}