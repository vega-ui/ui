import { FC } from 'react';
import { CalendarBaseControlIconButton, CalendarBaseControlIconButtonProps } from '../../../CalendarBase';
import { useCalendarContext } from '../../contexts';
import style from './style.module.css'
import { csx, mergeEventHandlers } from '@vega-ui/utils';

export type CalendarNextYearGroupButtonProps = CalendarBaseControlIconButtonProps

/**
 * `CalendarNextYearGroupButton` is a control button used within the Calendar
 * to navigate to the next group of years.
 *
 * The button is context-aware and is only interactive when the calendar
 * is in `year` picker mode. In other picker modes, the button is disabled
 * and marked as not visible via the `data-visible` attribute.
 *
 * This component composes `CalendarBaseControlIconButton` and safely merges
 * an optional external `onClick` handler with the internal calendar action
 * responsible for switching to the next year group.
 */
export const CalendarNextYearGroupButton: FC<CalendarNextYearGroupButtonProps> = ({ disabled, className, onClick: _onClick, ...props }) => {
  const { picker, nextYearGroup } = useCalendarContext()
  
  const _disabled = disabled || picker !== 'year'
  
  return (
    <CalendarBaseControlIconButton
      type='button'
      disabled={_disabled}
      className={csx(style.button, className)}
      data-visible={picker === 'year'}
      onClick={mergeEventHandlers(_onClick, nextYearGroup)}
      {...props}
    />
  )
}