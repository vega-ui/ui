import { FC } from 'react';
import { YearPickerScrollerLayout, YearPickerScrollerLayoutProps } from '../../../../YearPicker';

export type CalendarYearPickerScrollerLayoutProps = YearPickerScrollerLayoutProps

/**
 * `CalendarYearPickerScrollerLayout` is a calendar-scoped wrapper around
 * the low-level `YearPickerScrollerLayout` primitive. It defines the visual
 * and structural grid layout used inside the year picker’s scrolling
 * container while delegating all behavior to the underlying implementation.
 */
export const CalendarYearPickerScrollerLayout: FC<CalendarYearPickerScrollerLayoutProps>  = (props) => {
  return <YearPickerScrollerLayout {...props} />
}