import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IndexedSnapScrollerApiRef } from '../IndexedSnapScroller';
import { CalendarProvider } from './contexts';
import { useControlledState, useEventCallback } from '@vega-ui/hooks';
import { CalendarDatesDisabled, CalendarView, CalendarSelection, CalendarValue } from './types';
import { DataGridApiRef } from '../DataGrid';
import { CalendarBase, CalendarBaseProps } from '../CalendarBase';
import { focusPickerValue, getAvailableDate } from './helpers';
import { formatISODate, getCurrentDate, parseISODate, sanitizeISODates } from '@vega-ui/utils';
import {
  CalendarSystem,
  getCalendarMonthStart,
  getCalendarYearStart,
  getSameDayInCalendarMonth,
  getSameMonthInCalendarYear,
  isSameCalendarMonth,
  getDefaultLocale,
  gregorianCalendar,
} from '@vega-ui/i18n';

export interface CalendarProps<S extends CalendarSelection = 'single'> extends Omit<CalendarBaseProps, 'onChange' | 'defaultValue'> {
  /**
   * Latest selectable date as a `YYYY-MM-DD` string.
   * - Months and years beyond this date become unavailable.
   * - Day, Month, and Year pickers use this to disable or clamp navigation.
   */
  max?: string;
  
  /**
   * Earliest selectable date as a `YYYY-MM-DD` string.
   * - Months and years before this date become unavailable.
   * - All pickers respect this constraint when computing active ranges.
   */
  min?: string;
  
  /**
   * Selection mode.
   * Determines the structure of `value`, all dates are `YYYY-MM-DD` strings:
   * - 'single'   — a string, `''` when nothing is selected
   * - 'multiple' — an array of strings
   * - 'range'    — a `[start, end]` tuple with `start` not after `end`, `''` marks an unset bound
   *
   * Default: `'single'`
   */
  selection?: S;
  
  /**
   * Controlled visible view:
   * - 'day' — the days of the visible month (`CalendarDays`)
   * - 'month' — the months of the visible year (`CalendarMonths`)
   * - 'year' — pages of years (`CalendarYears`)
   */
  view?: CalendarView;
  
  /**
   * Controlled selection value, shaped by the `selection` mode.
   * Malformed or non-existent dates are treated as unselected.
   */
  value?: CalendarValue<S>;
  
  /**
   * Uncontrolled initial selection value, shaped by the `selection` mode.
   */
  defaultValue?: CalendarValue<S>;
  
  /**
   * Initial view for uncontrolled usage.
   *
   * Default: `'day'`
   */
  defaultView?: CalendarView;
  
  /**
   * Disables the whole calendar: no date can be selected and navigation is off.
   */
  disabled?: boolean;
  
  /**
   * Dates that cannot be selected, as `YYYY-MM-DD` strings:
   * - a single date
   * - an array of dates
   * - a predicate `(date: string) => boolean`
   */
  disabledDates?: CalendarDatesDisabled;
  
  /**
   * Fires when the user changes the selection.
   * The value is shaped by the `selection` mode.
   */
  onChangeValue?(value: CalendarValue<S>): void;
  
  /**
   * Fires when the visible view changes.
   */
  onChangeView?(view: CalendarView): void;
  
  /**
   * Controlled visible month, given as a `YYYY-MM-DD` string of any day
   * in that month.
   */
  month?: string;
  
  /**
   * Initial visible month for uncontrolled usage, given as a `YYYY-MM-DD`
   * string of any day in that month.
   *
   * Default: the month of the selected date, otherwise the current month
   */
  defaultMonth?: string;
  
  /**
   * Fires with the first day of the visible month as a `YYYY-MM-DD` string
   * when the visible month changes
   * (e.g., via scrolling or the month and year pickers).
   * This event represents view navigation, not selection.
   */
  onChangeMonth?(month: string): void;
  
  /**
   * Calendar system the calendar is shown in. Values stay `YYYY-MM-DD` days.
   * Defaults to the Gregorian calendar.
   */
  calendar?: CalendarSystem;
  
  /**
   * BCP 47 locale of month and day names and of the first day of the week,
   * e.g. `de-DE`. Applies to all parts of the calendar and sets `lang` on the root.
   * Defaults to the locale of the runtime, like `Intl`.
   */
  locale?: string;
}

/**
 * `Calendar` is the high-level, fully featured calendar component that
 * composes:
 * - the visual shell from `CalendarBase`, and
 * - all calendar interaction logic via `CalendarContext`.
 *
 * It coordinates day, month, and year views; synchronizes scroll-based
 * navigation with visible dates; and manages controlled/uncontrolled
 * selection state for single, multiple, and range selection modes.
 *
 * All dates in its API are `YYYY-MM-DD` strings, like native date inputs;
 * the visible month is given by any of its days. Months, years and their
 * names follow the `calendar` system, so the same API works with any
 * calendar of the world.
 *
 * Keyboard focus starts on the selected day when it is in the visible month,
 * otherwise on today, otherwise on the first available day of the month.
 */
export const Calendar = <S extends CalendarSelection = 'single'>({
  max,
  min,
  value,
  view: _view,
  disabled,
  disabledDates,
  size = 'xs',
  defaultValue,
  month: _month,
  defaultMonth,
  calendar = gregorianCalendar,
  locale: _locale,
  variant = 'secondary',
  selection = 'single' as S,
  defaultView = 'day',
  onChangeView,
  onChangeMonth,
  onChangeValue,
  children,
  ...props
}: CalendarProps<S>) => {
  const locale = _locale ?? getDefaultLocale()
  const today = formatISODate(getCurrentDate())
  
  const firstSelected = [value ?? defaultValue].flat().find(date => parseISODate(date))
  
  const [month, setMonth] = useControlledState(_month, defaultMonth || firstSelected || today, onChangeMonth)
  const [view, setView] = useControlledState(_view, defaultView, onChangeView)
  
  const visibleMonth = useMemo(
    () => getCalendarMonthStart(calendar, parseISODate(month) ? month : today),
    [calendar, month, today]
  )
  
  const showMonth = (next: string) => {
    if (!isSameCalendarMonth(calendar, next, visibleMonth)) setMonth(getCalendarMonthStart(calendar, next))
  }
  
  const from = parseISODate(min) ? min : undefined
  const to = parseISODate(max) ? max : undefined
  
  const [activeDay, setActiveDay] = useState(() => {
    if (firstSelected && isSameCalendarMonth(calendar, firstSelected, visibleMonth)) return firstSelected
    if (isSameCalendarMonth(calendar, today, visibleMonth)) return today
    
    return getAvailableDate(calendar, visibleMonth, { from, to, disabled: disabledDates }) ?? visibleMonth
  })

  const dayPickerApiRef = useRef<DataGridApiRef<string>>(null)
  const monthPickerApiRef = useRef<DataGridApiRef<string>>(null)
  const yearPickerApiRef = useRef<DataGridApiRef<string>>(null)
  
  const scrollerApiRef = useRef<IndexedSnapScrollerApiRef>(null)
  const yearScrollerApiRef = useRef<IndexedSnapScrollerApiRef>(null)
  
  const scheduledDay = useRef<string | null>(null)
  
  useEffect(() => {
    if (activeDay === scheduledDay.current) scheduledDay.current = null
  }, [activeDay])
  
  const getAvailableInMonth = (month: string, day = activeDay) =>
    getAvailableDate(calendar, getSameDayInCalendarMonth(calendar, day, month), { from, to, disabled: disabledDates })
  
  const focusAvailable = (month: string) => {
    const resolved = getAvailableInMonth(month)
    if (resolved) requestAnimationFrame(() => focusPickerValue(dayPickerApiRef.current, resolved))
  }
  
  const openDays = useCallback(() => {
    setView('day')
  }, [setView])
  
  const closeView = useCallback(() => {
    openDays()
    requestAnimationFrame(() => {
      focusPickerValue(dayPickerApiRef.current, activeDay)
    })
  }, [openDays, activeDay])
  
  const changePeriod = (month: string) => {
    showMonth(month)
    
    const resolved = getAvailableInMonth(month, scheduledDay.current ?? activeDay)
    if (!resolved) return
    
    scheduledDay.current = resolved
    requestAnimationFrame(() => setActiveDay(resolved))
  }

  const changeMonth = (month: string) => {
    showMonth(month)
    
    openDays()
    focusAvailable(month)
  }
  
  const changeYear = (year: string) => {
    let month = getSameMonthInCalendarYear(calendar, visibleMonth, year)
    
    if (from && month < getCalendarMonthStart(calendar, from)) month = getCalendarMonthStart(calendar, from)
    if (to && month > getCalendarMonthStart(calendar, to)) month = getCalendarMonthStart(calendar, to)
    
    showMonth(month)
    
    openDays()
    focusAvailable(month)
  }
  
  const onSelectDay = useEventCallback((day: string | string[]) => {
    if (!Array.isArray(day)) {
      onChangeValue?.(day as CalendarValue<S>)
      return
    }

    if (selection !== 'range') {
      onChangeValue?.(day as CalendarValue<S>)
      return
    }

    const [start = '', end = ''] = day
    onChangeValue?.([start, end] as CalendarValue<S>)
  })
  
  const toggleView = useCallback((next: Exclude<CalendarView, 'day'>) => {
    if (view === next) {
      openDays()
      return
    }
    
    setView(next)
    
    if (next === 'month') {
      requestAnimationFrame(() => focusPickerValue(monthPickerApiRef.current, visibleMonth))
      return
    }
    
    requestAnimationFrame(() => focusPickerValue(yearPickerApiRef.current, getCalendarYearStart(calendar, visibleMonth)))
  }, [view, calendar, visibleMonth, openDays, setView])
  
  const getViewScroller = useCallback(() => {
    if (view === 'day') return scrollerApiRef.current
    if (view === 'year') return yearScrollerApiRef.current
  }, [view])
  
  const prev = useCallback(() => getViewScroller()?.prev(), [getViewScroller])
  const next = useCallback(() => getViewScroller()?.next(), [getViewScroller])
  
  return (
    <CalendarProvider
      to={to}
      value={sanitizeISODates(value)}
      from={from}
      disabled={disabled}
      disabledDates={disabledDates}
      month={visibleMonth}
      calendar={calendar}
      locale={locale}
      prev={prev}
      next={next}
      defaultValue={sanitizeISODates(defaultValue)}
      selection={selection}
      activeDay={activeDay}
      view={view}
      changeActiveDay={setActiveDay}
      scrollerApiRef={scrollerApiRef}
      scrollerYearApiRef={yearScrollerApiRef}
      dayPickerApiRef={dayPickerApiRef}
      yearPickerApiRef={yearPickerApiRef}
      monthPickerApiRef={monthPickerApiRef}
      closeView={closeView}
      changeYear={changeYear}
      changeMonth={changeMonth}
      changePeriod={changePeriod}
      onSelectDay={onSelectDay}
      toggleView={toggleView}
    >
      <CalendarBase
        size={size}
        variant={variant}
        aria-disabled={disabled || undefined}
        data-disabled={disabled || undefined}
        lang={_locale}
        {...props}
      >
        {children}
      </CalendarBase>
    </CalendarProvider>
  )
}
