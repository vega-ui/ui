import { FC } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { MONTH_VIEW_BUTTON, YEAR_VIEW_BUTTON } from '@vega-ui/widgets/calendar';
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
export const CalendarViewButton: FC<CalendarViewButtonProps> = ({ view, ref, className, disabled, ...props }) => {
  const { handle, widget, disabled: calendarDisabled, size, variant } = useCalendarInternalContext()
  const attrs = useOutput(handle, view === 'month' ? widget.output.monthView : widget.output.yearView)
  const mergedRef = useMergeRefs([handle.part(view === 'month' ? MONTH_VIEW_BUTTON : YEAR_VIEW_BUTTON), ref])

  return (
    <Button
      ref={mergedRef}
      type='button'
      size={size satisfies ButtonProps['size']}
      variant={variant}
      appearance='transparent'
      disabled={disabled || calendarDisabled}
      className={csx(style.button, className)}
      {...handle.merge(attrs, props)}
    />
  )
}
