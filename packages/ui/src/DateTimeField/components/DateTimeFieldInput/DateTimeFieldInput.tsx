import { FC, FormEvent, useMemo } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useMaskito } from '@maskito/react';
import { useDateTimeFieldContext } from '../../contexts';
import { mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { getDateTimeMaskOptions } from '../../helpers';

export type DateTimeFieldInputProps = Omit<TextFieldInputProps, 'value' | 'defaultValue'>

/**
 * DateTimeFieldInput — a masked text input for entering date and time values.
 *
 * Purpose:
 * Provides controlled text-based entry for a DateTimeField using an input mask,
 * while keeping the parsed date and time values synchronized with shared field state.
 *
 * This component represents the input side of the DateTimeField and works in
 * tandem with the calendar component to maintain a consistent date–time state.
 *
 * The date and time come from `DateTimeField`; `onChange` and `onInput` still
 * report each edit of the text. When `min` or `max` change, the text is
 * normalized again like typing does, dispatching `input`.
 */
export const DateTimeFieldInput: FC<DateTimeFieldInputProps> = ({ ref, onInput, ...props }) => {
  const {
    template,
    calendar,
    timeStep,
    inputRef,
    min,
    max,
    text,
    changeText,
    disabled
  } = useDateTimeFieldContext()
  
  const options = useMemo(() => getDateTimeMaskOptions({
    template,
    calendar,
    min,
    max,
    step: timeStep,
  }), [template, calendar, min, max, timeStep]);
  
  const maskitoRef = useMaskito({ options });

  const onDateTimeInput = (event: FormEvent<HTMLInputElement>) => changeText?.(event.currentTarget.value)

  return (
    <TextFieldInput
      type='text'
      inputMode='numeric'
      disabled={disabled}
      value={text}
      onInput={mergeEventHandlers(onDateTimeInput, onInput)}
      ref={mergeRefs([maskitoRef, ref, inputRef])}
      {...props}
    />
  )
}