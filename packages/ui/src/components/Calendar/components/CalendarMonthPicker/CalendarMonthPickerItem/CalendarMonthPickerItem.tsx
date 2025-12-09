import { FC } from 'react';
import { MonthPickerItem, MonthPickerItemProps } from '../../../../MonthPicker';

export type CalendarMonthPickerItemProps = MonthPickerItemProps

export const CalendarMonthPickerItem: FC<CalendarMonthPickerItemProps> = (props) => {
  return <MonthPickerItem {...props} />
}