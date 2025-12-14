import { FC } from 'react';
import { YearPickerRowGroup, YearPickerRowGroupProps } from '../../../../YearPicker';

export type CalendarYearPickerRowGroupProps = YearPickerRowGroupProps

/**
 * `CalendarYearPickerRowGroup` is a calendar-scoped alias for the
 * underlying `YearPickerRowGroup` component. It serves as a structural
 * container for grouping multiple `CalendarYearPickerRow` elements inside
 * the year picker.
 */
export const CalendarYearPickerRowGroup: FC<CalendarYearPickerRowGroupProps> = (props) => {
  return <YearPickerRowGroup {...props} />
}