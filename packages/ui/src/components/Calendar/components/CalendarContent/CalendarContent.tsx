import { FC, HTMLAttributes } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { useCalendarBaseContext } from '../../../CalendarBase';

export type CalendarContentProps = HTMLAttributes<HTMLDivElement>

/**
 * `CalendarContent` is the main layout container for the calendar body.
 * It is typically used to wrap day, month, and year pickers, and
 * propagates the current calendar `size` from `CalendarBase` via the
 * `data-size` attribute so that the internal layout and density can be
 * styled consistently.
 */
export const CalendarContent: FC<CalendarContentProps> = ({ className, children, ...props }) => {
  const { size } = useCalendarBaseContext()
 
  return (
    <div className={csx(style.content, className)} data-size={size} {...props}>
      {children}
    </div>
  )
}