import { FC } from 'react';
import { DayPickerCell, DayPickerCellProps } from '../../../DayPicker';

export type CalendarDayProps = DayPickerCellProps

/**
 * `CalendarDay` is a day cell of `CalendarWeeks`. Place it as the template of
 * `CalendarWeeks`; without children it shows the day number, with children it
 * shows them instead.
 */
export const CalendarDay: FC<CalendarDayProps> = (props) => {
  return <DayPickerCell {...props} />
}
