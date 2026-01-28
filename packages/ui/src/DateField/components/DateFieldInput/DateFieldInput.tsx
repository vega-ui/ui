import { FC, FormEvent, useMemo } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useMaskito } from '@maskito/react';
import { maskitoDateOptionsGenerator, maskitoParseDate } from '@maskito/kit';
import { useDateFieldContext } from '../../contexts';
import { mergeEventHandlers, mergeRefs } from '@vega-ui/utils';

export type DateFieldInputProps = TextFieldInputProps

/**
 * DateFieldInput — a masked date text input used inside DateField.
 *
 * Applies a date mask based on the current format and separator,
 * enforces min/max date constraints, and parses the input value on each
 * `input` event. When a valid date is entered, it calls `changeDate`
 * from context.
 *
 * Integrates with DateFieldContext for format, separator, boundaries,
 * change handler, and shared input ref. Merges internal and external refs
 * and `onInput` handlers.
 */
export const DateFieldInput: FC<DateFieldInputProps> = ({ ref, onInput: _onInput, ...props }) => {
  const { format, separator, inputRef, min, max, changeDate, lastStringified, disabled } = useDateFieldContext()
  
  const options = useMemo(() => maskitoDateOptionsGenerator({
    mode: format,
    separator,
    max,
    min
  }), [format, separator, min, max]);
  
  const innerInputRef = useMaskito({ options });
  
  const onInput = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    if (value === lastStringified.current) return;
    
    const parseDate = maskitoParseDate(value, { mode: format, separator, min, max });
    
    if (!parseDate) return
    changeDate?.(parseDate)
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