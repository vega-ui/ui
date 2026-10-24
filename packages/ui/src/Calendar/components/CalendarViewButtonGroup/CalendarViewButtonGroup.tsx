import { FC, HTMLAttributes } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type CalendarViewButtonGroupProps = HTMLAttributes<HTMLDivElement>

/**
 * `CalendarViewButtonGroup` keeps the view buttons together in the middle of
 * `CalendarHeader`, between the previous and next buttons.
 */
export const CalendarViewButtonGroup: FC<CalendarViewButtonGroupProps> = ({ children, className, ...props }) => {
  return (
    <div className={csx(style.group, className)} {...props}>
      {children}
    </div>
  )
}
