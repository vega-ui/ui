import { FC } from 'react';
import { CalendarBaseWeekLabel, CalendarBaseWeekLabelProps } from '../../../CalendarBase';
import { useCalendarWeekdayContext } from '../../contexts';

export type CalendarWeekdayProps = CalendarBaseWeekLabelProps

/**
 * `CalendarWeekday` is a weekday name of `CalendarWeekdays`. Place it as the
 * template of `CalendarWeekdays`; without children it shows the weekday name.
 */
export const CalendarWeekday: FC<CalendarWeekdayProps> = ({ children, ...props }) => {
  const { label } = useCalendarWeekdayContext()

  return <CalendarBaseWeekLabel {...props}>{children ?? label}</CalendarBaseWeekLabel>
}
