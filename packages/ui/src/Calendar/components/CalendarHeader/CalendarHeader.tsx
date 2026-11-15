import { FC, HTMLAttributes } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';

export type CalendarHeaderProps = HTMLAttributes<HTMLDivElement>

export const CalendarHeader: FC<CalendarHeaderProps> = ({ className, ...props }) => {
  return <div className={csx(style.header, className)} {...props} />
}