import { FC } from 'react';
import { CalendarBasePickerButton, CalendarBasePickerButtonProps } from '../../../CalendarBase';
import { useCalendarContext } from '../../contexts';
import { CalendarView } from '../../types';
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import style from './style.module.css'

export interface CalendarViewButtonProps extends CalendarBasePickerButtonProps {
  /**
   * View the button opens: `'month'` for `CalendarMonths`, `'year'` for
   * `CalendarYears`. Pressing it again goes back to the days.
   */
  view: Exclude<CalendarView, 'day'>
}

/**
 * `CalendarViewButton` switches the `Calendar` between the days and the month
 * or year view. It is pressed (`aria-pressed`) while its view is shown.
 */
export const CalendarViewButton: FC<CalendarViewButtonProps> = ({ view, onClick: _onClick, className, disabled, ...props }) => {
  const { view: currentView, toggleView, disabled: calendarDisabled } = useCalendarContext()

  return (
    <CalendarBasePickerButton
      type='button'
      disabled={disabled || calendarDisabled}
      onClick={mergeEventHandlers(() => toggleView?.(view), _onClick)}
      aria-pressed={currentView === view}
      className={csx(style.button, className)}
      {...props}
    />
  )
}
