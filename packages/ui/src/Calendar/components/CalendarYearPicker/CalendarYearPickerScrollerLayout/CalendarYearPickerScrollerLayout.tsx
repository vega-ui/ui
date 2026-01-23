import { FC } from 'react';
import { YearPickerScrollerLayout, YearPickerScrollerLayoutProps } from '../../../../YearPicker';
import { useCalendarContext } from '../../../contexts';

export type CalendarYearPickerScrollerLayoutProps = YearPickerScrollerLayoutProps

/**
 * `CalendarYearPickerScrollerLayout` is a calendar-scoped wrapper around
 * the low-level `YearPickerScrollerLayout` primitive. It defines the visual
 * and structural grid layout used inside the year picker’s scrolling
 * container while delegating all behavior to the underlying implementation.
 */
export const CalendarYearPickerScrollerLayout: FC<CalendarYearPickerScrollerLayoutProps>  = (props) => {
  const { referenceDate } = useCalendarContext()
  return <YearPickerScrollerLayout start={referenceDate.getFullYear()} {...props} />
}