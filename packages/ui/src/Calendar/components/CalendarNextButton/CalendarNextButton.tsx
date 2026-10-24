import { FC } from 'react';
import { ChevronRight } from '@vega-ui/icons';
import { Icon } from '../../../Icon';
import { CalendarBaseControlIconButton, CalendarBaseControlIconButtonProps } from '../../../CalendarBase';
import { useCalendarContext } from '../../contexts';
import style from './style.module.css'
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import { addCalendarMonths } from '@vega-ui/i18n';

export type CalendarNextButtonProps = CalendarBaseControlIconButtonProps

/**
 * `CalendarNextButton` shows the next page of the current view: the next
 * month in the days, the next page of years in the years. It is hidden in the
 * months and when the next month is after `max`.
 *
 * It shows a chevron by default; pass `children` to replace it. The icon has
 * no text, so give the button an `aria-label`.
 */
export const CalendarNextButton: FC<CalendarNextButtonProps> = ({ children, disabled, className, onClick: _onClick, ...props }) => {
  const { to, month, calendar, view, next, disabled: calendarDisabled } = useCalendarContext()
  
  const outOfRange = view === 'day' && to !== undefined && addCalendarMonths(calendar, month, 1) > to
  const visible = view !== 'month' && !outOfRange
  
  return (
    <CalendarBaseControlIconButton
      type='button'
      disabled={disabled || calendarDisabled || !visible}
      className={csx(style.button, className)}
      data-visible={visible}
      onClick={mergeEventHandlers(next, _onClick)}
      {...props}
    >
      {children ?? <Icon className={style.icon}><ChevronRight /></Icon>}
    </CalendarBaseControlIconButton>
  )
}
