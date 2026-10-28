import { FC } from 'react';
import { Calendar, CalendarProps } from '../../../Calendar';
import { useDateRangeFieldContext } from '../../contexts';
import { formatTemplateRange, writeInputValue } from '@vega-ui/utils';

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
    template,
    calendar,
    locale,
    disabledDates,
    rangeSeparator
  } = useDateRangeFieldContext()
  
  const onChangeValue = (iso: [start: string, end: string]) => {
    _onChangeValue?.(iso)
    
    const input = inputRef?.current
    if (!input) return

    writeInputValue(input, formatTemplateRange(calendar, iso, template, rangeSeparator))
  }
  
  return (
    <Calendar
      compact
      max={max}
      min={min}
      value={date}
      calendar={calendar}
      locale={locale}
      selection='range'
      onChangeValue={onChangeValue}
      disabledDates={disabledDates}
      {...props}
    />
  )
}