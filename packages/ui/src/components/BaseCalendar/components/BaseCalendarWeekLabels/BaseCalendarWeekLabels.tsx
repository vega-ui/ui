import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type BaseCalendarWeekLabelsProps = HTMLAttributes<HTMLDivElement>

/**
 * `BaseCalendarWeekLabels` is the structural container for weekday header
 * cells in the calendar grid. It wraps a `<div>` that semantically
 * represents a header row and houses multiple `BaseCalendarWeekLabel`
 * components.
 */
export const BaseCalendarWeekLabels: FC<PropsWithChildren<BaseCalendarWeekLabelsProps>> = ({
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