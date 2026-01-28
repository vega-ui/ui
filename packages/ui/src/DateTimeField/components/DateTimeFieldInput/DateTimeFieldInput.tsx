import { FC, FormEvent, useMemo } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useMaskito } from '@maskito/react';
import { maskitoDateTimeOptionsGenerator } from '@maskito/kit';
import { useDateTimeFieldContext } from '../../contexts';
import { mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { parseDateTime } from '../../helpers';

export type DateTimeFieldInputProps = TextFieldInputProps

/**
 * DateTimeFieldInput — a masked text input for entering date and time values.
 *
 * Purpose:
 * Provides controlled text-based entry for a DateTimeField using an input mask,
 * while keeping the parsed date and time values synchronized with shared field state.
 *
 * This component represents the input side of the DateTimeField and works in
 * tandem with the calendar component to maintain a consistent date–time state.
 */
export const DateTimeFieldInput: FC<DateTimeFieldInputProps> = ({ ref, onInput: _onInput, ...props }) => {
  const {
    dateFormat,
    dateSeparator,
    timeStep,
    timeFormat,
    separator,
    inputRef,
    min,
    max,
    changeDate,
    changeTime,
    lastStringified,
    disabled
  } = useDateTimeFieldContext()
  
  const options = useMemo(() => maskitoDateTimeOptionsGenerator({
    max,
    min,
    timeStep,
    dateSeparator,
    dateMode: dateFormat,
    timeMode: timeFormat,
    dateTimeSeparator: separator,
  }), [dateFormat, timeFormat, dateSeparator, timeStep, separator, min, max]);
  
  const innerInputRef = useMaskito({ options });
  
  const onInput = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    if (value === lastStringified.current) return;
    
    const { time, date } = parseDateTime(value, { format: dateFormat, separator: dateSeparator, min, max })
    
    if (date) changeDate(date)
    if (time) changeTime(time)
  }
  
  return (
    <TextFieldInput
      type='text'
      inputMode='numeric'
      disabled={disabled}
      onInput={mergeEventHandlers(onInput, _onInput)}
      ref={mergeRefs([innerInputRef, ref, inputRef])}
      {...props}
    />
  )
}