import { FC } from 'react';
import { YearPickerItem, YearPickerItemProps } from '../../../../YearPicker';

export type CalendarYearPickerItemProps = YearPickerItemProps

/**
 * `CalendarYearPickerItem` is a calendar-scoped alias for the underlying
 * `YearPickerItem` component. It represents a single year cell within the
 * `CalendarYearPicker` grid.
 */
export const CalendarYearPickerItem: FC<CalendarYearPickerItemProps> = (props) => {
  return <YearPickerItem {...props} />
}