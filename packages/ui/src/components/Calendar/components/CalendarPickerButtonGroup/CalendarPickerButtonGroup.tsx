import { FC, HTMLAttributes } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type CalendarPickerButtonGroupProps = HTMLAttributes<HTMLDivElement>

/**
 * `CalendarPickerButtonGroup` is a structural wrapper used to group
 * picker-trigger buttons—typically `CalendarMonthPickerButton` and
 * `CalendarYearPickerButton`—within the calendar header.
 */
export const CalendarPickerButtonGroup: FC<CalendarPickerButtonGroupProps> = ({ children, className, ...props }) => {
  return (
    <div className={csx(style.group, className)} {...props}>
      {children}
    </div>
  )
}