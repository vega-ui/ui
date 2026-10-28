import { FC, FormEvent, useMemo } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useMaskito } from '@maskito/react';
import { useDateFieldContext } from '../../contexts';
import { mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { getDateMaskOptions } from '../../helpers';

export type DateFieldInputProps = Omit<TextFieldInputProps, 'value' | 'defaultValue'>

/**
 * DateFieldInput — a masked date text input used inside DateField.
 *
 * Applies a date mask based on the current format, separator and calendar
 * system and enforces min/max date constraints. The date comes from
 * `DateField`; `onChange` and `onInput` still report each edit of the text.
 * When `min` or `max` change, the text is normalized again like typing does,
 * dispatching `input`.
 *
 * Integrates with DateFieldContext for format, separator, boundaries,
 * change handler, and shared input ref. Merges internal and external refs.
 */
export const DateFieldInput: FC<DateFieldInputProps> = ({ ref, onInput, ...props }) => {
  const { template, calendar, inputRef, min, max, text, changeText, disabled } = useDateFieldContext()
  
  const options = useMemo(() => getDateMaskOptions({
    template,
    calendar,
    min,
    max,
  }), [template, calendar, min, max]);
  
  const maskitoRef = useMaskito({ options });

  const onDateInput = (event: FormEvent<HTMLInputElement>) => changeText?.(event.currentTarget.value)

  return (
    <TextFieldInput
      type='text'
      inputMode='numeric'
      disabled={disabled}
      value={text}
      onInput={mergeEventHandlers(onDateInput, onInput)}
      ref={mergeRefs([maskitoRef, ref, inputRef])}
      {...props}
    />
  )
}