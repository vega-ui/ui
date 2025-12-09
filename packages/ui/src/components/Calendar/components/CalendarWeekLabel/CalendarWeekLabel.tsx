import { FC } from 'react';
import { BaseCalendarWeekLabel, BaseCalendarWeekLabelProps } from '../../../BaseCalendar';

export type CalendarWeekLabelProps = BaseCalendarWeekLabelProps

/**
 * `CalendarWeekLabel` is a calendar-scoped alias for `BaseCalendarWeekLabel`,
 * used to render an individual weekday header cell (e.g., "Mon", "Tue")
 * within `CalendarWeekLabels`.
 */
export const CalendarWeekLabel: FC<CalendarWeekLabelProps> = (props) => {
  return <BaseCalendarWeekLabel {...props} />
}