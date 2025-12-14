import { FC, MouseEvent } from 'react';
import { BaseCalendarNextButton, BaseCalendarNextButtonProps } from '../../../BaseCalendar';
import { useCalendarContext } from '../../contexts';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type CalendarNextButtonProps = BaseCalendarNextButtonProps

/**
 * `CalendarNextButton` is the calendar-scoped "next" navigation control
 * used to advance the visible month in the day-picker view. It wraps
 * `BaseCalendarNextButton` and integrates tightly with the calendar’s
 * navigation, range constraints, and picker-mode state.
 */
export const CalendarNextButton: FC<CalendarNextButtonProps> = ({ disabled, className, onClick: _onClick, ...props }) => {
  const { to, year, month, picker, next } = useCalendarContext()
  
  const outOfRangeTo = to ? (year >= to.getFullYear() && month >= to.getMonth()) : false
  const _disabled = disabled || (picker !== 'day' || outOfRangeTo)
  
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    _onClick?.(e)
    next?.()
  }
  
  return (
    <BaseCalendarNextButton
      type='button'
      disabled={_disabled}
      className={csx(style.button, className)}
      data-visible={picker === 'day' && !outOfRangeTo}
      onClick={onClick}
      {...props}
    />
  )
}