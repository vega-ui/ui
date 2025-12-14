import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type CalendarBaseWeekLabelsProps = HTMLAttributes<HTMLDivElement>

/**
 * `CalendarBaseWeekLabels` is the structural container for weekday header
 * cells in the calendar grid. It wraps a `<div>` that semantically
 * represents a header row and houses multiple `CalendarBaseWeekLabel`
 * components.
 */
export const CalendarBaseWeekLabels: FC<PropsWithChildren<CalendarBaseWeekLabelsProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div role='row' className={csx(style.row, className)} {...props}>
      {children}
    </div>
  )
}