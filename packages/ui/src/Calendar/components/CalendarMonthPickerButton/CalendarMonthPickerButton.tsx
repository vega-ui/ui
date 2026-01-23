import { FC } from 'react';
import { CalendarBasePickerButton, CalendarBasePickerButtonProps } from '../../../CalendarBase';
import { useCalendarContext } from '../../contexts';
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import style from './style.module.css'

export type CalendarMonthPickerButtonProps = CalendarBasePickerButtonProps

/**
 * `CalendarMonthPickerButton` is the calendar-scoped trigger for toggling
 * the month-picker view. It wraps `CalendarBasePickerButton` and wires it
 * into the `Calendar` state machine via `useCalendarContext()`.
 */
export const CalendarMonthPickerButton: FC<CalendarMonthPickerButtonProps> = ({ onClick: _onClick, className, ...props }) => {
  const { picker, toggleMonthPicker } = useCalendarContext()
  
  return (
    <CalendarBasePickerButton
      type='button'
      onClick={mergeEventHandlers(_onClick, toggleMonthPicker)}
      aria-pressed={picker === 'month'}
      className={csx(style.button, className)}
      {...props}
    />
  )
}