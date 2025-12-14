import { FC, PropsWithChildren } from 'react';
import { CalendarBaseWeekLabels, CalendarBaseWeekLabelsProps } from '../../../CalendarBase';

export type CalendarWeekLabelsProps = CalendarBaseWeekLabelsProps

export const CalendarWeekLabels: FC<PropsWithChildren<CalendarWeekLabelsProps>> = (props) => {
  return <CalendarBaseWeekLabels {...props} />
}