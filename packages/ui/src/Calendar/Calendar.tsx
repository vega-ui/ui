import { useCallback, useMemo, useRef, useState } from 'react';
import { IndexedSnapScrollerApiRef } from '../IndexedSnapScroller';
import { CalendarProvider } from './contexts';
import { useControlledState, useEventCallback } from '@vega-ui/hooks';
import { CalendarDatesDisabled, CalendarPicker, CalendarSelection, CalendarValue } from './types';
import { DataGridApiRef } from '../DataGrid';
import { CalendarBase, CalendarBaseProps } from '../CalendarBase';
import { focusPickerValue, getAvailableDate } from './helpers';
import { formatISODate, getClampedDate, getCurrentDate, getMonthStart, isSameMonth, normalizeDate, parseISODate, parseISODateTimestamps } from '@vega-ui/utils';

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
   * - 'range'    — a `[start, end]` tuple, `''` marks an unset bound
   *
   * Default: `'single'`
   */
  selection?: S;
  
  /**
   * Controls which picker view is currently active.
   * - 'day' — standard calendar grid
   * - 'month' — month selection view
   * - 'year' — year selection view
   *
   * When controlled, it overrides the internal picker state.
   */
  picker?: CalendarPicker;
  
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
   * Uncontrolled initial picker view.
   * Used only on the first render when `picker` is not controlled.
   *
   * Default: `'day'`
   */
  defaultPicker?: CalendarPicker;
  
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
   * Fires when the active picker view changes.
   * Useful for synchronizing UI (e.g., closing external popovers or
   * updating analytics on mode switches).
   */
  onChangePicker?(picker: CalendarPicker): void;
  
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
 * the visible month is given by any of its days.
 *
 * Keyboard focus starts on the selected day when it is in the visible month,
 * otherwise on today, otherwise on the first available day of the month.
 */
export const Calendar = <S extends CalendarSelection>({
  max,
  min,
  value,
  picker,
  disabled,
  disabledDates,
  size = 'xs',
  defaultValue,
  month: _month,
  defaultMonth,
  variant = 'secondary',
  selection = 'single' as S,
  defaultPicker = 'day',
  onChangePicker,
  onChangeMonth,
  onChangeValue,
  children,
  ...props
}: CalendarProps<S>) => {
  const currentDate = getCurrentDate()
  
  const firstSelected = [value ?? defaultValue].flat().map(date => parseISODate(date)).find(Boolean)
  const initialMonth = defaultMonth || formatISODate(firstSelected ?? currentDate)
  
  const [month, setMonth] = useControlledState(_month, initialMonth, onChangeMonth)
  const [activePicker, setActivePicker] = useControlledState(picker, defaultPicker, onChangePicker)
  
  const date = useMemo(() => getMonthStart(parseISODate(month) ?? getCurrentDate()), [month])
  
  const setDate = (next: Date) => {
    if (!isSameMonth(next, date)) setMonth(formatISODate(getMonthStart(next)))
  }
  
  const from = parseISODate(min)
  const to = parseISODate(max)
  
  const [activeDay, setActiveDay] = useState(() => {
    const today = normalizeDate(currentDate)
    
    if (firstSelected && isSameMonth(firstSelected, date)) return firstSelected.getTime()
    if (isSameMonth(today, date)) return today.getTime()
    
    return (getAvailableDate(date, { from, to, disabled: disabledDates }) ?? date).getTime()
  })

  const dayPickerApiRef = useRef<DataGridApiRef<number>>(null)
  const monthPickerApiRef = useRef<DataGridApiRef<number>>(null)
  const yearPickerApiRef = useRef<DataGridApiRef<number>>(null)
  
  const scrollerApiRef = useRef<IndexedSnapScrollerApiRef>(null)
  const yearScrollerApiRef = useRef<IndexedSnapScrollerApiRef>(null)
  
  const getAvailableByDate = (year: number, month: number) => {
    const date = new Date(activeDay).getDate()
    
    const lastDay = new Date(year, month + 1, 0).getDate()
    const candidate = new Date(year, month, Math.min(date, lastDay))
    
    return getAvailableDate(candidate, { from, to, disabled: disabledDates })
  }
  
  const focusAvailable = (year: number, month: number) => {
    const resolved = getAvailableByDate(year, month)
    if (resolved) requestAnimationFrame(() => focusPickerValue(dayPickerApiRef.current, resolved.getTime()))
  }
  
  const openDayPicker = useCallback(() => {
    setActivePicker('day')
  }, [setActivePicker])
  
  const closePicker = useCallback(() => {
    openDayPicker()
    requestAnimationFrame(() => {
      focusPickerValue(dayPickerApiRef.current, activeDay)
    })
  }, [openDayPicker, activeDay])
  
  const changePeriod = (y: number, m: number) => {
    const d = new Date(date)
    d.setFullYear(y)
    d.setMonth(m)
    
    setDate(d)
    
    const resolved = getAvailableByDate(y, m)
    if (!resolved) return
    
    requestAnimationFrame(() => setActiveDay(resolved.getTime()))
  }

  const changeMonth = (value: number) => {
    const d = new Date(date)
    d.setMonth(value)
    
    setDate(d)
    
    openDayPicker()
    focusAvailable(d.getFullYear(), value)
  }
  
  const changeYear = (value: number) => {
    const clamped = getClampedDate(new Date(value, date.getMonth()), from, to)
    const clampedMonth = clamped.getMonth()
    const d = new Date(date)
    
    if (clampedMonth !== date.getMonth()) {
      d.setMonth(clampedMonth)
      setDate(d)
    }
    
    d.setFullYear(value)
    
    setDate(d)
    
    openDayPicker()
    focusAvailable(value, clampedMonth)
  }
  
  const onSelectDay = useEventCallback((day: number | number[]) => {
    if (!Array.isArray(day)) {
      onChangeValue?.(formatISODate(new Date(day)) as CalendarValue<S>)
      return
    }

    const dates = day.map(d => formatISODate(new Date(d)))
    const next = selection === 'range' ? [dates[0] ?? '', dates[1] ?? ''] : dates
    onChangeValue?.(next as CalendarValue<S>)
  })
  
  const toggleMonthPicker = useCallback(() => {
    if (activePicker === 'month') {
      openDayPicker()
      return
    }
    
    setActivePicker('month')
    requestAnimationFrame(() => focusPickerValue(monthPickerApiRef.current, date.getMonth()))
  }, [activePicker, date, openDayPicker, setActivePicker])

  const toggleYearPicker = useCallback(() => {
    if (activePicker === 'year') {
      openDayPicker()
      return
    }
    
    setActivePicker('year')
    requestAnimationFrame(() => focusPickerValue(yearPickerApiRef.current, date.getFullYear()))
  }, [activePicker, date, openDayPicker, setActivePicker])
  
  const nextPeriod = useCallback(() => scrollerApiRef.current?.next(), [])
  const nextYearGroup = useCallback(() => yearScrollerApiRef.current?.next(), [])
  const prevPeriod = useCallback(() => scrollerApiRef.current?.prev(), [])
  const prevYearGroup = useCallback(() => yearScrollerApiRef.current?.prev(), [])
  
  return (
    <CalendarProvider
      to={to}
      value={parseISODateTimestamps(value)}
      from={from}
      disabled={disabled}
      disabledDates={disabledDates}
      year={date.getFullYear()}
      month={date.getMonth()}
      nextPeriod={nextPeriod}
      nextYearGroup={nextYearGroup}
      prevPeriod={prevPeriod}
      prevYearGroup={prevYearGroup}
      defaultValue={parseISODateTimestamps(defaultValue)}
      selection={selection}
      activeDay={activeDay}
      picker={activePicker}
      referenceDate={new Date(1970, 0, 1)}
      changePicker={setActivePicker}
      changeActiveDay={setActiveDay}
      scrollerApiRef={scrollerApiRef}
      scrollerYearApiRef={yearScrollerApiRef}
      dayPickerApiRef={dayPickerApiRef}
      yearPickerApiRef={yearPickerApiRef}
      monthPickerApiRef={monthPickerApiRef}
      closeMonthPicker={closePicker}
      closeYearPicker={closePicker}
      changeYear={changeYear}
      changeMonth={changeMonth}
      changePeriod={changePeriod}
      onSelectDay={onSelectDay}
      toggleMonthPicker={toggleMonthPicker}
      toggleYearPicker={toggleYearPicker}
    >
      <CalendarBase
        size={size}
        variant={variant}
        aria-disabled={disabled || undefined}
        data-disabled={disabled || undefined}
        {...props}
      >
        {children}
      </CalendarBase>
    </CalendarProvider>
  )
}