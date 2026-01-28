import { FC } from 'react';
import { Calendar, CalendarProps } from '../../../Calendar';
import { useDateFieldContext } from '../../contexts';
import { maskitoStringifyDate } from '@maskito/kit';
import { dispatchEvents, setValue as setNativeValue } from '@vega-ui/utils';

export type DateFieldCalendarProps = CalendarProps

/**
 * DateFieldCalendar — Calendar adapter for DateField.
 *
 * Reads current value and constraints from DateFieldContext and writes the
 * selected date back into the underlying text input by setting the native
 * input value and dispatching input/change events.
 */
export const DateFieldCalendar: FC<DateFieldCalendarProps> = ({ onChange: _onChange, ...props }) => {
  const {
    max,
    min,
    inputRef,
    format,
    separator,
    date,
    disabledDates,
    changeDate,
    lastStringified
  } = useDateFieldContext()
  
  const onChange = (value: Date) => {
    _onChange?.(value)
    
    const input = inputRef?.current
    if (!input) return
    
    const stringified = maskitoStringifyDate(value, { mode: format, separator, min, max });
    lastStringified.current = stringified;
    
    changeDate(value)
    
    setNativeValue(input, stringified)
    dispatchEvents(input)
  }
  
  return (
    <Calendar
      compact
      to={max}
      from={min}
      value={date}
      date={date}
      defaultDate={date}
      onChange={onChange}
      onChangeDate={onChange}
      disabled={disabledDates}
      defaultActiveDay={date?.getTime()}
      {...props}
    />
  )
}