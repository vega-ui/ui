import { FC } from 'react';
import { YearPickerCell, YearPickerCellProps } from '../../../YearPicker';

export type CalendarYearProps = YearPickerCellProps

/**
 * `CalendarYear` is a year cell of `CalendarYears`. Place it as the template
 * of `CalendarYears`; without children it shows the year.
 */
export const CalendarYear: FC<CalendarYearProps> = (props) => {
  return <YearPickerCell {...props} />
}
