import { FC } from 'react';
import { CalendarBaseControlIconButton, type CalendarBaseControlIconButtonProps } from '../../../CalendarBase';
import { useCalendarContext } from '../../contexts';
import style from './style.module.css'
import { csx, mergeEventHandlers } from '@vega-ui/utils';

export type CalendarPrevButtonProps = CalendarBaseControlIconButtonProps

/**
 * `CalendarPrevButton` is the calendar-integrated "previous" navigation
 * control, responsible for moving the visible month backward in the
 * day-picker view. It wraps `CalendarBaseControlIconButton` and applies calendar
 * state, range constraints, and picker-mode awareness.
 */
export const CalendarPrevButton: FC<CalendarPrevButtonProps> = ({ disabled, className, onClick: _onClick, ...props }) => {
  const { from, year, month, picker, prevPeriod } = useCalendarContext()
  
  const outOfRangeFrom = from ? (year <= from.getFullYear() && month <= from.getMonth()) : false
  const _disabled = disabled || (picker !== 'day' || outOfRangeFrom)
  
  return (
    <CalendarBaseControlIconButton
      type='button'
      disabled={_disabled}
      className={csx(className, style.button)}
      data-visible={picker === 'day' && !outOfRangeFrom}
      onClick={mergeEventHandlers(_onClick, prevPeriod)}
      {...props}
    />
  )
}