import { FC, MouseEvent } from 'react';
import { BaseCalendarPickerButton, BaseCalendarPickerButtonProps } from '../../../BaseCalendar';
import { useCalendarContext } from '../../contexts';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export type CalendarMonthPickerButtonProps = BaseCalendarPickerButtonProps

/**
 * `CalendarMonthPickerButton` is the calendar-scoped trigger for toggling
 * the month-picker view. It wraps `BaseCalendarPickerButton` and wires it
 * into the `Calendar` state machine via `useCalendarContext()`.
 */
export const CalendarMonthPickerButton: FC<CalendarMonthPickerButtonProps> = ({ onClick: _onClick, className, ...props }) => {
  const { picker, onMonthPickerClick } = useCalendarContext()
  
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    _onClick?.(e)
    onMonthPickerClick?.()
  }
  
  return (
    <BaseCalendarPickerButton
      onClick={onClick}
      type='button'
      aria-pressed={picker === 'month'}
      className={csx(style.button, className)}
      {...props}
    />
  )
}