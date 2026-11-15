import { FC, HTMLAttributes } from 'react';
import { csx } from '@vega-ui/utils';
import { DayPicker } from '../../../DayPicker';
import { useCalendarInternalContext, useCalendarPartsContext } from '../../contexts';
import style from './style.module.css';

export type CalendarDaysProps = Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'>

/**
 * `CalendarDays` is the day view of `Calendar`, in the locale and calendar
 * system of the `Calendar`. Place `CalendarWeekdays` and `CalendarWeeks` in it.
 * Its state (focused day, selection, disabled dates) comes from the `Calendar`.
 * It is named by `CalendarHeading` when the calendar has one.
 *
 * Keyboard navigation follows the WAI-ARIA date picker pattern: arrows move
 * by a day or a week, Home / End to the first or last day of the week,
 * PageUp / PageDown to the same day of the previous / next month, and
 * Shift+PageUp / Shift+PageDown to the same day of the previous / next year.
 */
export const CalendarDays: FC<CalendarDaysProps> = ({ children, className, ...props }) => {
  const { view, headingId } = useCalendarInternalContext()
  const { days } = useCalendarPartsContext()

  return (
    <DayPicker
      {...days}
      inert={view !== 'day'}
      aria-labelledby={headingId}
      data-visible={view === 'day'}
      className={csx(style.picker, className)}
      {...props}
    >
      {children}
    </DayPicker>
  )
}
