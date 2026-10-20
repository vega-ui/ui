import { FC } from 'react';
import { Calendar, CalendarProps } from '../../../Calendar';
import { useDateRangeFieldContext } from '../../contexts';
import { maskitoStringifyDate } from '@maskito/kit';
import { dispatchEvents, setValue as setNativeValue, formatISODate, parseISODate } from '@vega-ui/utils';

export type DateRangeFieldCalendarProps = CalendarProps<'range'>

/**
 * DateRangeFieldCalendar — a range-enabled calendar component integrated
 * with DateRangeField for coordinated date selection.
 *
 * Purpose:
 * Provides a visual calendar interface for selecting a start and end date
 * within a specified range while keeping the associated TextField input
 * synchronized.
 *
 * Features:
 * - Supports min/max date boundaries.
 * - Allows disabling specific dates through custom rules.
 * - Updates the shared input value when a date or range is selected.
 */
export const DateRangeFieldCalendar: FC<DateRangeFieldCalendarProps> = ({ onChangeValue: _onChangeValue, ...props }) => {
  const {
    max,
    min,
    date,
    inputRef,
    format,
    separator,
    changeDate,
    disabledDates,
    rangeSeparator,
    lastStringified
  } = useDateRangeFieldContext()
  
  const onChangeValue = (iso: [start: string, end: string]) => {
    _onChangeValue?.(iso)
    
    const value: [Date?, Date?] = [parseISODate(iso[0]), parseISODate(iso[1])]
    changeDate(value)
    
    const [start, end] = value
    
    const input = inputRef?.current
    if (!input) return

    const stringifiedStartDate = start ? maskitoStringifyDate(start, { mode: format, separator, min, max }) : ''
    const stringifiedEndDate = end ? maskitoStringifyDate(end, { mode: format, separator, min, max }) : ''
    const stringified = `${stringifiedStartDate}${stringifiedEndDate ? rangeSeparator : ''}${stringifiedEndDate}`
    
    lastStringified.current = stringified;
    setNativeValue(input, stringified)
    dispatchEvents(input)
  }
  
  return (
    <Calendar
      compact
      max={formatISODate(max)}
      min={formatISODate(min)}
      value={[formatISODate(date[0]), formatISODate(date[1])]}
      selection='range'
      onChangeValue={onChangeValue}
      disabledDates={disabledDates}
      {...props}
    />
  )
}