import { FC } from 'react';
import { CalendarBaseControlIconButton, CalendarBaseControlIconButtonProps } from '../../../CalendarBase';
import { useCalendarContext } from '../../contexts';
import style from './style.module.css'
import { csx, mergeEventHandlers } from '@vega-ui/utils';

export type CalendarNextButtonProps = CalendarBaseControlIconButtonProps

/**
 * `CalendarNextButton` is the calendar-scoped "next" navigation control
 * used to advance the visible month in the day-picker view. It wraps
 * `CalendarBaseNextButton` and integrates tightly with the calendar’s
 * navigation, range constraints, and picker-mode state.
 */
export const CalendarNextButton: FC<CalendarNextButtonProps> = ({ disabled, className, onClick: _onClick, ...props }) => {
  const { to, year, month, picker, nextPeriod } = useCalendarContext()
  
  const outOfRangeTo = to ? (year >= to.getFullYear() && month >= to.getMonth()) : false
  const _disabled = disabled || (picker !== 'day' || outOfRangeTo)
  
  return (
    <CalendarBaseControlIconButton
      type='button'
      disabled={_disabled}
      className={csx(style.button, className)}
      data-visible={picker === 'day' && !outOfRangeTo}
      onClick={mergeEventHandlers(_onClick, nextPeriod)}
      {...props}
    />
  )
}