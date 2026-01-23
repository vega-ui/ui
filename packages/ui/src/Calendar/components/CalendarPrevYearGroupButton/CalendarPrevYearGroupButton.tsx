import { FC } from 'react';
import { CalendarBaseControlIconButton, type CalendarBaseControlIconButtonProps } from '../../../CalendarBase';
import { useCalendarContext } from '../../contexts';
import style from './style.module.css'
import { csx, mergeEventHandlers } from '@vega-ui/utils';

export type CalendarPrevYearGroupButtonProps = CalendarBaseControlIconButtonProps

/**
 * `CalendarPrevYearGroupButton` is a control button used within the Calendar
 * to navigate to the previous group of years.
 *
 * The button is context-aware and only becomes interactive when the calendar
 * is in `year` picker mode. In all other picker modes, the button is disabled
 * and visually hidden via a `data-visible` attribute.
 *
 * Internally, it composes `CalendarBaseControlIconButton` and merges an optional
 * external `onClick` handler with the calendar context action responsible for
 * switching to the previous year group.
 */
export const CalendarPrevYearGroupButton: FC<CalendarPrevYearGroupButtonProps> = ({ disabled, className, onClick: _onClick, ...props }) => {
  const { picker, prevYearGroup } = useCalendarContext()
  
  const _disabled = disabled || picker !== 'year'

  return (
    <CalendarBaseControlIconButton
      type='button'
      disabled={_disabled}
      className={csx(style.button, className)}
      data-visible={picker === 'year'}
      onClick={mergeEventHandlers(_onClick, prevYearGroup)}
      {...props}
    />
  )
}