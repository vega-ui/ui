import { FC } from 'react';
import { ChevronLeft } from '@vega-ui/icons';
import { Icon } from '../../../Icon';
import { CalendarBaseControlIconButton, type CalendarBaseControlIconButtonProps } from '../../../CalendarBase';
import { useCalendarContext } from '../../contexts';
import style from './style.module.css'
import { csx, mergeEventHandlers } from '@vega-ui/utils';

export type CalendarPrevButtonProps = CalendarBaseControlIconButtonProps

/**
 * `CalendarPrevButton` shows the previous page of the current view: the
 * previous month in the days, the previous page of years in the years. It is
 * hidden in the months and when the previous month is before `min`.
 *
 * It shows a chevron by default; pass `children` to replace it. The icon has
 * no text, so give the button an `aria-label`.
 */
export const CalendarPrevButton: FC<CalendarPrevButtonProps> = ({ children, disabled, className, onClick: _onClick, ...props }) => {
  const { from, month, view, prev, disabled: calendarDisabled } = useCalendarContext()
  
  const outOfRange = view === 'day' && from !== undefined && from >= month
  const visible = view !== 'month' && !outOfRange
  
  return (
    <CalendarBaseControlIconButton
      type='button'
      disabled={disabled || calendarDisabled || !visible}
      className={csx(className, style.button)}
      data-visible={visible}
      onClick={mergeEventHandlers(prev, _onClick)}
      {...props}
    >
      {children ?? <Icon className={style.icon}><ChevronLeft /></Icon>}
    </CalendarBaseControlIconButton>
  )
}
