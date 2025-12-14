import { DayPickerRow, DayPickerRowProps } from '../../../../DayPicker';
import { FC } from 'react';

export type CalendarDayPickerRowProps = DayPickerRowProps

/**
 * `CalendarDayPickerRow` is a lightweight wrapper around the underlying
 * `DayPickerRow` component, providing a calendar-scoped alias for
 * rendering a single horizontal row of day cells within `CalendarDayPicker`.
 */
export const CalendarDayPickerRow: FC<CalendarDayPickerRowProps> = (props) => {
  return <DayPickerRow {...props} />
}