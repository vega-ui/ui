import { FC } from 'react';
import { Calendar, CalendarProps } from '../../../Calendar';
import { useDateRangeFieldContext } from '../../contexts';
import { maskitoStringifyDate } from '@maskito/kit';
import { dispatchEvents, setValue as setNativeValue } from '@vega-ui/utils';

export type DateRangeFieldCalendarProps = CalendarProps<'range'>

/**
 * DateRangeFieldCalendar — a range-enabled calendar component integrated
 * with DateRangeField for coordinated date selection.
 *
 * Purpose:
 * Provides a visual calendar interface for selecting a start and end date
 * within a specified range, while keeping the associated TextField input
 * synchronized.
 *
 * Features:
 * - Supports min/max date boundaries.
 * - Allows disabling specific dates through custom rules.
 * - Updates the shared input value when a date or range is selected.
 */
export const DateRangeFieldCalendar: FC<DateRangeFieldCalendarProps> = ({ onChange: _onChange, ...props }) => {
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
  
  const onChange = (value: [Date, Date] | [Date]) => {
    _onChange?.(value)
    changeDate(value)
    
    const [start, end] = value
    
    const input = inputRef?.current
    if (!input) return

    const stringifiedStartDate = start ? maskitoStringifyDate(start, { mode: format, separator, min, max }) : ''
    const stringifiedEndDate = end ? maskitoStringifyDate(end, { mode: format, separator, min, max }) : ''
    const stringified = `${stringifiedStartDate}${stringifiedEndDate ? rangeSeparator : ''}${stringifiedEndDate}`
    
    lastStringified.current = stringified;
    console.log(stringified)
    setNativeValue(input, stringified)
    dispatchEvents(input)
  }
  
  return (
    <Calendar
      compact
      to={max}
      from={min}
      value={date}
      selection='range'
      defaultDate={date?.[0]}
      onChange={onChange}
      disabled={disabledDates}
      defaultActiveDay={date?.[0]?.getTime()}
      {...props}
    />
  )
}