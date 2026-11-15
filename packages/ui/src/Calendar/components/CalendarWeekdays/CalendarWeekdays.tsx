import { FC, HTMLAttributes, ReactNode } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';
import { CalendarWeekdayProvider, useCalendarInternalContext } from '../../contexts';
import { DAYS_IN_WEEK, getFirstDayOfWeek, getWeekDayNames } from '@vega-ui/i18n';
import { GridRow } from '../../../Grid';

export interface CalendarWeekdaysProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Format of the weekday names (`Intl.DateTimeFormat` `weekday`).
   * @default "short"
   */
  format?: Intl.DateTimeFormatOptions['weekday']

  /**
   * Template rendered once per weekday, usually `<CalendarWeekday />`. Read
   * the weekday with `useCalendarWeekdayContext()`.
   */
  children: ReactNode
}

/**
 * `CalendarWeekdays` is the row of weekday names above `CalendarWeeks`, in the
 * locale of the `Calendar` and starting on the first day of its week. Place it
 * inside `CalendarDays` with a `CalendarWeekday` template.
 */
export const CalendarWeekdays: FC<CalendarWeekdaysProps> = ({ format = 'short', className, children, ...props }) => {
  const { locale } = useCalendarInternalContext()
  const firstDay = getFirstDayOfWeek(locale)

  return (
    <GridRow row={-1} className={csx(style.row, className)} {...props}>
      {getWeekDayNames(locale, format, firstDay).map((label, col) => (
        <CalendarWeekdayProvider key={col} col={col} weekday={(firstDay + col) % DAYS_IN_WEEK} label={label}>
          {children}
        </CalendarWeekdayProvider>
      ))}
    </GridRow>
  )
}
