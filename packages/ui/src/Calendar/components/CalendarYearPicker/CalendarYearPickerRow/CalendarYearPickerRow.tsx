import { FC } from 'react';
import { YearPickerRow, YearPickerRowProps } from '../../../../YearPicker';

export type CalendarYearPickerRowProps = YearPickerRowProps

/**
 * `CalendarYearPickerRow` is a calendar-scoped wrapper for `YearPickerRow`,
 * representing a horizontal row of year cells inside `CalendarYearPicker`.
 */
export const CalendarYearPickerRow: FC<CalendarYearPickerRowProps> = (props) => {
  return <YearPickerRow {...props} />
}