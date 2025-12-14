import { FC } from 'react';
import { CalendarBaseWeekLabel, CalendarBaseWeekLabelProps } from '../../../CalendarBase';

export type CalendarWeekLabelProps = CalendarBaseWeekLabelProps

/**
 * `CalendarWeekLabel` is a calendar-scoped alias for `CalendarBaseWeekLabel`,
 * used to render an individual weekday header cell (e.g., "Mon", "Tue")
 * within `CalendarWeekLabels`.
 */
export const CalendarWeekLabel: FC<CalendarWeekLabelProps> = (props) => {
  return <CalendarBaseWeekLabel {...props} />
}