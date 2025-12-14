import { FC, MouseEvent } from 'react';
import { BaseCalendarPrevButton, BaseCalendarPrevButtonProps } from '../../../BaseCalendar';
import { useCalendarContext } from '../../contexts';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type CalendarPrevButtonProps = BaseCalendarPrevButtonProps

/**
 * `CalendarPrevButton` is the calendar-integrated "previous" navigation
 * control, responsible for moving the visible month backward in the
 * day-picker view. It wraps `BaseCalendarPrevButton` and applies calendar
 * state, range constraints, and picker-mode awareness.
 */
export const CalendarPrevButton: FC<CalendarPrevButtonProps> = ({ disabled, className, onClick: _onClick, ...props }) => {
  const { from, year, month, picker, prev } = useCalendarContext()
  
  const outOfRangeFrom = from ? (year <= from.getFullYear() && month <= from.getMonth()) : false
  const _disabled = disabled || (picker !== 'day' || outOfRangeFrom)
  
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    _onClick?.(e)
    prev?.()
  }
  
  return (
    <BaseCalendarPrevButton
      type='button'
      disabled={_disabled}
      className={csx(className, style.button)}
      data-visible={picker === 'day' && !outOfRangeFrom}
      onClick={onClick}
      {...props}
    />
  )
}