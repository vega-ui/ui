import { useRef, useState, useCallback } from 'react';
import { getCurrentDate } from '@vega-ui/utils';
import { IndexedSnapScrollerApiRef } from '../IndexedSnapScroller/types.ts';
import { CalendarProvider } from './contexts';
import { useControlledState } from '@vega-ui/hooks';
import { CalendarDatesDisabled, CalendarPicker, CalendarSelection } from './types.ts';
import { DataGridApiRef } from '../DataGrid';
import { BaseCalendar, BaseCalendarProps } from '../BaseCalendar';
import {
  computeStart,
  focusPickerValue,
  getClampedIndex,
  getDateByIndex,
  getFirstDayInMonth,
} from './helpers';

type CalendarValue<S extends CalendarSelection> = S extends 'single' ? Date : S extends 'range' ? [Date, Date] : Date[]

export interface CalendarProps<S extends CalendarSelection = 'single'> extends Omit<BaseCalendarProps, 'onChange'> {
  /**
   * Upper date boundary for navigation and selection.
   * - Months and years beyond this date become unavailable.
   * - Day, Month, and Year pickers use this to disable or clamp navigation.
   */
  to?: Date;
  
  /**
   * Lower date boundary for navigation and selection.
   * - Months and years before this date become unavailable.
   * - All pickers respect this constraint when computing active ranges.
   */
  from?: Date;
  
  /**
   * Selection mode.
   * Determines the structure of the returned `value`:
   * - 'single'   — a single `Date`
   * - 'multiple' — an array of `Date`
   * - 'range'    — a tuple `[start: Date | null, end: Date | null]`
   *
   * Default: `'single'`
   */
  selection?: S;
  
  /**
   * Controls which picker view is currently active.
   * - 'day'   — standard calendar grid
   * - 'month' — month selection view
   * - 'year'  — year selection view
   *
   * When controlled, it overrides the internal picker state.
   */
  picker?: CalendarPicker;
  
  /**
   * Controlled selection value.
   * Shape depends on the `selection` mode:
   * - single:   `Date | undefined`
   * - multiple: `Date[] | undefined`
   * - range:    `[Date | null, Date | null] | undefined`
   */
  value?: CalendarValue<S>;
  
  /**
   * Uncontrolled initial picker view.
   * Used only on first render when `picker` is not controlled.
   *
   * Default: `'day'`
   */
  defaultPicker?: CalendarPicker;
  
  /**
   * Disables specific dates.
   * Can be:
   * - a single `Date`
   * - an array of `Date`
   * - a predicate `(date: Date) => boolean`
   *
   * Used to gray out or prevent interaction with certain days in the grid.
   */
  disabled?: CalendarDatesDisabled;
  
  /**
   * Fires when the visible year changes (e.g., via scrolling or picker).
   * This event represents *view navigation*, not selection.
   */
  onYearChange?(year: number): void;
  
  /**
   * Fires when the visible month changes (e.g., via arrow navigation,
   * scrolling, or month picker). The argument is the month index
   * (0–11) of the currently displayed month.
   */
  onMonthChange?(month: number): void;
  
  /**
   * Fires when the selected value changes.
   * The value type depends on the selected mode:
   * - 'single'   → `Date | undefined`
   * - 'multiple' → `Date[]`
   * - 'range'    → `[Date | null, Date | null]`
   */
  onChange?(value: CalendarValue<S>): void;
  
  /**
   * Fires when the active picker view changes.
   * Useful for synchronizing UI (e.g., closing external popovers or
   * updating analytics on mode switches).
   */
  onChangePicker?(picker: CalendarPicker): void;
}

/**
 * `Calendar` is the high-level, fully featured calendar component that
 * composes:
 * - the visual shell from `BaseCalendar`, and
 * - all calendar interaction logic via `CalendarContext`.
 *
 * It coordinates day, month, and year views; synchronizes scroll-based
 * navigation with visible dates; and manages controlled/uncontrolled
 * selection state for single, multiple, and range selection modes.
 */
export const Calendar = <S extends CalendarSelection>({
  to,
  from,
  value,
  picker,
  disabled,
  size = 'xs',
  variant = 'secondary',
  selection = 'single' as S,
  defaultPicker = 'day',
  onChangePicker,
  onMonthChange,
  onYearChange,
  onChange,
  children,
  ...props
}: CalendarProps<S>) => {
  const baseMonth = new Date().getMonth()
  const baseYear = new Date().getFullYear()
  const baseDay = getCurrentDate().getTime()
  
  const [activePicker, setActivePicker] = useControlledState(picker, defaultPicker, onChangePicker)
  
  const [activeDay, setActiveDay] = useState(baseDay)
  const [activeMonth, setActiveMonth] = useState(baseMonth)
  const [activeYear, setActiveYear] = useState(baseYear)
  
  const dayPickerApiRef = useRef<DataGridApiRef<number>>(null)
  const monthPickerApiRef = useRef<DataGridApiRef<number>>(null)
  const yearPickerApiRef = useRef<DataGridApiRef<number>>(null)
  const apiRef = useRef<IndexedSnapScrollerApiRef>(null)

  const next = useCallback(() => {
    apiRef.current?.next()
  }, [])
  
  const prev = useCallback(() => {
    apiRef.current?.prev()
  }, [])
  
  const [index, setIndex] = useState(0)
  
  const { year, month } = getDateByIndex(index, baseYear, baseMonth)
  
  const focusFirst = (year: number, month: number) => {
    const firstDay = getFirstDayInMonth({ year, month, from, to, disabled })
    if (!firstDay) return;
    
    setActiveDay(firstDay.getTime())
    requestAnimationFrame(() => {
      focusPickerValue(dayPickerApiRef.current, firstDay.getTime())
    })
  }
  
  const changeIndex = (nextIndex: number) => {
    const start = apiRef.current?.indexes[0]
    if (start === undefined) return
    
    const nextStart = computeStart(start, index, nextIndex)
    apiRef.current?.reset(nextStart, true);
    setIndex(nextIndex)
  }
  
  const syncActive = useCallback((index: number) => {
    const { year, month } = getDateByIndex(index, baseYear, baseMonth)
    const active = new Date(activeDay)
    
    const currentYear = active.getFullYear()
    const currentMonth = active.getMonth()
    
    if (currentYear !== year || currentMonth !== month) {
      const firstDay = getFirstDayInMonth({ year, month, from, to, disabled })
      if (!firstDay) return;
      
      setActiveDay(firstDay.getTime())
      if (year !== currentYear) setActiveYear(year)
      if (month !== currentMonth) setActiveYear(month)
    }
  }, [baseYear, baseMonth, activeDay, from, to, disabled])
  
  const onSnap = useCallback((snapped: number) => {
    setIndex(snapped)
    syncActive(snapped)
  }, [syncActive])
  
  const restoreActive = useCallback(() => {
    requestAnimationFrame(() => {
      focusPickerValue(dayPickerApiRef.current, activeDay)
    })
  }, [activeDay])
  
  const closeAllPickers = useCallback(() => {
    setActivePicker('day')
  }, [])
  
  const closePicker = useCallback(() => {
    closeAllPickers()
    restoreActive()
  }, [restoreActive, closeAllPickers])
  
  const onSelectMonth = useCallback((value: number) => {
    onMonthChange?.(value)
    
    const targetIndex = index + (value - month)
    changeIndex(targetIndex)
    
    closeAllPickers()
    focusFirst(year, value)
  }, [year, value])
  
  const onSelectYear = useCallback((value: number) => {
    onYearChange?.(value)
    
    const targetIndex = index + ((value - year) * 12)
    const clamped = getClampedIndex(targetIndex, { year: value, month, baseMonth, baseYear, to, from })
    changeIndex(clamped)
    
    const { year: y, month: m } = getDateByIndex(clamped, baseYear, baseMonth)
    if (m !== month) setActiveMonth(m)
    
    closeAllPickers()
    focusFirst(y, m)
  }, [index, year, month, baseYear, baseMonth, from, to, closeAllPickers])
  
  const onSelectDay = useCallback((day: number | number[]) => {
    const value = Array.isArray(day) ? day.map(d => new Date(d)) : new Date(day)
    onChange?.(value as CalendarValue<S>)
  }, [])
  
  const onMonthPickerClick = useCallback(() => {
    if (activePicker === 'month') {
      closePicker()
      return
    }
    
    requestAnimationFrame(() => focusPickerValue(monthPickerApiRef.current, month))
    setActivePicker('month')
  }, [activePicker, month, closePicker])
  
  const onYearPickerClick = useCallback(() => {
    if (activePicker === 'year') {
      closePicker()
      return
    }
    
    requestAnimationFrame(() => focusPickerValue(yearPickerApiRef.current, year))
    setActivePicker('year')
  }, [activePicker, year, closePicker])
  
  return (
    <CalendarProvider
      from={from}
      to={to}
      year={year}
      next={next}
      prev={prev}
      value={value}
      month={month}
      selection={selection}
      activeDay={activeDay}
      picker={activePicker}
      activeYear={activeYear}
      activeMonth={activeMonth}
      changePicker={setActivePicker}
      changeActiveDay={setActiveDay}
      changeActiveYear={setActiveYear}
      changeActiveMonth={setActiveMonth}
      scrollerApiRef={apiRef}
      dayPickerApiRef={dayPickerApiRef}
      yearPickerApiRef={yearPickerApiRef}
      monthPickerApiRef={monthPickerApiRef}
      closeMonthPicker={closePicker}
      closeYearPicker={closePicker}
      onSelectYear={onSelectYear}
      onSelectMonth={onSelectMonth}
      onSelectDay={onSelectDay}
      onSnap={onSnap}
      onMonthPickerClick={onMonthPickerClick}
      onYearPickerClick={onYearPickerClick}
    >
      <BaseCalendar size={size} variant={variant} {...props}>
        {children}
      </BaseCalendar>
    </CalendarProvider>
  )
}