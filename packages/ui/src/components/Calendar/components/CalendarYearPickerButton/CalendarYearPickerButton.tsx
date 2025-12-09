import { FC, MouseEvent } from 'react';
import { BaseCalendarPickerButton, type BaseCalendarPickerButtonProps } from '../../../BaseCalendar';
import { useCalendarContext } from '../../hooks';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export type CalendarYearPickerButtonProps = BaseCalendarPickerButtonProps;

/**
 * `CalendarYearPickerButton` is the calendar-scoped trigger for opening or
 * toggling the year-picker view. It wraps `BaseCalendarPickerButton` and
 * connects user interaction to the `Calendar` state machine through
 * `useCalendarContext()`.
 */
export const CalendarYearPickerButton: FC<CalendarYearPickerButtonProps> = ({ onClick: _onClick, className, ...props }) => {
  const { picker, onYearPickerClick } = useCalendarContext()
  
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    _onClick?.(e)
    onYearPickerClick?.()
  }
  
  return (
    <BaseCalendarPickerButton
      type='button'
      aria-pressed={picker === 'year'}
      onClick={onClick}
      className={csx(style.button, className)}
      {...props}
    />
  )
}