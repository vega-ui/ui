import { FC, MouseEvent } from 'react';
import { CalendarBasePickerButton, type CalendarBasePickerButtonProps } from '../../../CalendarBase';
import { useCalendarContext } from '../../contexts';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export type CalendarYearPickerButtonProps = CalendarBasePickerButtonProps;

/**
 * `CalendarYearPickerButton` is the calendar-scoped trigger for opening or
 * toggling the year-picker view. It wraps `CalendarBasePickerButton` and
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
    <CalendarBasePickerButton
      type='button'
      aria-pressed={picker === 'year'}
      onClick={onClick}
      className={csx(style.button, className)}
      {...props}
    />
  )
}