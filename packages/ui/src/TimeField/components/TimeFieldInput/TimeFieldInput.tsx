import { FC, FormEvent, useMemo } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useMaskito } from '@maskito/react';
import { mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { useTimeFieldContext } from '../../contexts';
import { getTimeMaskOptions } from '../../helpers';

export type TimeFieldInputProps = Omit<TextFieldInputProps, 'value' | 'defaultValue'>

/**
 * TimeFieldInput — the masked text input of a TimeField.
 *
 * The time comes from `TimeField`; `onChange` and `onInput` still report
 * each edit of the text. When `min` or `max` change, the text is normalized
 * again like typing does, dispatching `input`.
 */
export const TimeFieldInput: FC<TimeFieldInputProps> = ({ ref, onInput, ...props }) => {
  const { template, min, max, step, text, changeText, inputRef } = useTimeFieldContext()

  const options = useMemo(() => getTimeMaskOptions({ template, min, max, step }), [template, min, max, step]);

  const maskitoRef = useMaskito({ options });

  const onTimeInput = (event: FormEvent<HTMLInputElement>) => changeText?.(event.currentTarget.value)

  return (
    <TextFieldInput
      type='text'
      inputMode='numeric'
      value={text}
      onInput={mergeEventHandlers(onTimeInput, onInput)}
      ref={mergeRefs([maskitoRef, ref, inputRef])}
      {...props}
    />
  )
}
