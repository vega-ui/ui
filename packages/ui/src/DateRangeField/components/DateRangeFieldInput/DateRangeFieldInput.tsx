import { FC, FormEvent, useMemo } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useMaskito } from '@maskito/react';
import { useDateRangeFieldContext } from '../../contexts';
import { mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { getDateRangeMaskOptions } from '../../helpers';

export type DateRangeFieldInputProps = Omit<TextFieldInputProps, 'value' | 'defaultValue'>

/**
 * DateRangeFieldInput — the text input component for DateRangeField that
 * supports masked range entry.
 *
 * Purpose:
 * Provides a controlled text input for entering a start and end date, using
 * masking to enforce formatting and separators. The range comes from
 * `DateRangeField`; `onChange` and `onInput` still report each edit of the
 * text. When `min` or `max` change, the text is normalized again like typing
 * does, dispatching `input`.
 */
export const DateRangeFieldInput: FC<DateRangeFieldInputProps> = ({ ref, onInput, ...props }) => {
  const { template, calendar, rangeSeparator, inputRef, disabled, min, max, text, changeText } = useDateRangeFieldContext()
  
  const options = useMemo(() => getDateRangeMaskOptions({
    template,
    separator: rangeSeparator,
    calendar,
    min,
    max,
  }), [template, rangeSeparator, calendar, min, max]);
  
  const maskitoRef = useMaskito({ options });

  const onRangeInput = (event: FormEvent<HTMLInputElement>) => changeText?.(event.currentTarget.value)

  return (
    <TextFieldInput
      type='text'
      inputMode='numeric'
      disabled={disabled}
      value={text}
      onInput={mergeEventHandlers(onRangeInput, onInput)}
      ref={mergeRefs([maskitoRef, ref, inputRef])}
      {...props}
    />
  )
}