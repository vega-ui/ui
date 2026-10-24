import { FC, HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import {
  YearPicker,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from '../../../YearPicker';
import { useCalendarBaseContext } from '../../../CalendarBase';
import { useCalendarContext } from '../../contexts';
import style from './style.module.css'
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import { getCalendarYearStart } from '@vega-ui/i18n';

export interface CalendarYearsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Template of a year cell, rendered once for every year of the visible pages.
   * Read the year with `useCalendarYearContext()`; usually `<CalendarYear />`.
   */
  children: ReactNode

  /**
   * Format of the years (`Intl.DateTimeFormat` `year`).
   * @default "numeric"
   */
  format?: Intl.DateTimeFormatOptions['year']
}

/**
 * `CalendarYears` is the year view of `Calendar`: pages of years, swipeable,
 * in the calendar system of the `Calendar` (an era change gives two years).
 * Picking a year shows the same month of it; Escape goes back to the days.
 */
export const CalendarYears: FC<CalendarYearsProps> = ({ children, format, className, onKeyDown: _onKeyDown, ...props }) => {
  const {
    from,
    to,
    view,
    month,
    calendar,
    locale,
    yearPickerApiRef,
    scrollerYearApiRef,
    closeView,
    changeYear,
    disabled,
  } = useCalendarContext()
  const { size, variant } = useCalendarBaseContext()

  const year = getCalendarYearStart(calendar, month)

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape') return

    event.stopPropagation()
    closeView?.()
  }

  return (
    <YearPicker
      selection='single'
      data-visible={view === 'year'}
      selected={year}
      defaultActive={year}
      year={year}
      calendar={calendar}
      locale={locale}
      variant={variant}
      size={size}
      inert={view !== 'year'}
      from={from && getCalendarYearStart(calendar, from)}
      to={to && getCalendarYearStart(calendar, to)}
      className={csx(style.picker, className)}
      apiRef={yearPickerApiRef}
      onKeyDown={mergeEventHandlers(onKeyDown, _onKeyDown)}
      disabled={disabled ? () => true : undefined}
      onSelectCell={changeYear}
      {...props}
    >
      <YearPickerScroller apiRef={scrollerYearApiRef} inert={disabled}>
        <YearPickerScrollerContent>
          <YearPickerScrollerLayout format={format}>
            {children}
          </YearPickerScrollerLayout>
        </YearPickerScrollerContent>
      </YearPickerScroller>
    </YearPicker>
  )
}
