import { FC, HTMLAttributes } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type CalendarHeaderProps = HTMLAttributes<HTMLDivElement>

export const CalendarHeader: FC<CalendarHeaderProps> = ({ children, className, ...props }) => {
  return (
    <div className={csx(style.header, className)} {...props}>
      {children}
    </div>
  )
}