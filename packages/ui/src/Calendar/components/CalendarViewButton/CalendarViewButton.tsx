import { FC, MouseEvent } from 'react';
import { Button, ButtonProps } from '../../../Button';
import { useOutput } from '../../../internals/widget';
import { useCalendarInternalContext } from '../../contexts';
import { CalendarView } from '../../types';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export interface CalendarViewButtonProps extends ButtonProps {
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
  const { handle, widget, toggleView, disabled: calendarDisabled, size, variant } = useCalendarInternalContext()
  const attrs = useOutput(handle, view === 'month' ? widget.output.monthView : widget.output.yearView)

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    _onClick?.(event)
    if (!event.defaultPrevented) toggleView(view)
  }

  return (
    <Button
      type='button'
      size={size satisfies ButtonProps['size']}
      variant={variant}
      appearance='transparent'
      disabled={disabled || calendarDisabled}
      onClick={onClick}
      className={csx(style.button, className)}
      {...attrs}
      {...props}
    />
  )
}
