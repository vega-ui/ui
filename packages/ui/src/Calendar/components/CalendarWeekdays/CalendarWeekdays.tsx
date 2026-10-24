import { FC, ReactNode } from 'react';
import { CalendarBaseWeekLabels, CalendarBaseWeekLabelsProps } from '../../../CalendarBase';
import { CalendarWeekdayProvider, useCalendarContext } from '../../contexts';
import { DAYS_IN_WEEK, getFirstDayOfWeek, getWeekDayNames } from '@vega-ui/i18n';

export interface CalendarWeekdaysProps extends Omit<CalendarBaseWeekLabelsProps, 'children'> {
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
export const CalendarWeekdays: FC<CalendarWeekdaysProps> = ({ format = 'short', children, ...props }) => {
  const { locale } = useCalendarContext()
  const firstDay = getFirstDayOfWeek(locale)

  return (
    <CalendarBaseWeekLabels {...props}>
      {getWeekDayNames(locale, format, firstDay).map((label, col) => (
        <CalendarWeekdayProvider key={col} col={col} weekday={(firstDay + col) % DAYS_IN_WEEK} label={label}>
          {children}
        </CalendarWeekdayProvider>
      ))}
    </CalendarBaseWeekLabels>
  )
}
