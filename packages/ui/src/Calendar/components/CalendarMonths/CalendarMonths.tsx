import { FC, HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { MonthPicker, MonthPickerLayout } from '../../../MonthPicker';
import { useCalendarBaseContext } from '../../../CalendarBase';
import { useCalendarContext } from '../../contexts';
import style from './style.module.css'
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import { getCalendarMonthStart } from '@vega-ui/i18n';

export interface CalendarMonthsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Template of a month cell, rendered once for every month of the visible year.
   * Read the month with `useCalendarMonthContext()`; usually `<CalendarMonth />`.
   */
  children: ReactNode

  /**
   * Number of columns of the month grid.
   * @default 3
   */
  cols?: number

  /**
   * Format of the month names (`Intl.DateTimeFormat` `month`).
   * @default "long"
   */
  format?: Intl.DateTimeFormatOptions['month']
}

/**
 * `CalendarMonths` is the month view of `Calendar`: the months of the visible
 * year, 12 or 13 depending on the calendar system. Picking a month shows its
 * days; Escape goes back to the days without changing the month.
 */
export const CalendarMonths: FC<CalendarMonthsProps> = ({ children, cols, format, onKeyDown: _onKeyDown, className, ...props }) => {
  const {
    from,
    to,
    view,
    month,
    calendar,
    locale,
    monthPickerApiRef,
    closeView,
    changeMonth,
    disabled,
  } = useCalendarContext()
  const { size, variant } = useCalendarBaseContext()

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape') return

    event.stopPropagation()
    closeView?.()
  }

  return (
    <MonthPicker
      year={month}
      calendar={calendar}
      locale={locale}
      from={from && getCalendarMonthStart(calendar, from)}
      to={to && getCalendarMonthStart(calendar, to)}
      apiRef={monthPickerApiRef}
      inert={view !== 'month'}
      variant={variant}
      size={size}
      data-visible={view === 'month'}
      className={csx(style.picker, className)}
      defaultActive={month}
      selected={month}
      selection='single'
      disabled={disabled ? () => true : undefined}
      onSelectCell={changeMonth}
      onKeyDown={mergeEventHandlers(onKeyDown, _onKeyDown)}
      {...props}
    >
      <MonthPickerLayout cols={cols} format={format}>
        {children}
      </MonthPickerLayout>
    </MonthPicker>
  )
}
