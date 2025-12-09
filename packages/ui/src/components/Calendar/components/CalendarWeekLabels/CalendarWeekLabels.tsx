import { FC, PropsWithChildren } from 'react';
import { BaseCalendarWeekLabels, BaseCalendarWeekLabelsProps } from '../../../BaseCalendar';

export type CalendarWeekLabelsProps = BaseCalendarWeekLabelsProps

export const CalendarWeekLabels: FC<PropsWithChildren<CalendarWeekLabelsProps>> = (props) => {
  return <BaseCalendarWeekLabels {...props} />
}