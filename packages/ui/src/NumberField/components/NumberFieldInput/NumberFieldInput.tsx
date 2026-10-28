import { FC, FormEvent } from 'react';
import style from '../../style.module.css';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { csx, mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { useNumberFieldContext } from '../../contexts';

export type NumberFieldInputProps = Omit<TextFieldInputProps, 'value' | 'defaultValue'>

/**
 * `NumberFieldInput` is the low-level input component used inside `NumberField`.
 *
 * It renders a numeric `<input>` element based on `TextFieldInput` and connects
 * it to the surrounding `NumberField` context.
 *
 * The number comes from `NumberField`; `onChange` and `onInput` still report
 * each edit of the text.
 *
 * `NumberFieldInput` is designed to be used only as a child of `NumberField`.
 */
export const NumberFieldInput: FC<NumberFieldInputProps> = ({ ref, disabled, className, onInput, ...props }) => {
  const { disabled: _disabled, max, min, inputRef, text, changeText } = useNumberFieldContext()

  const onNumberInput = (event: FormEvent<HTMLInputElement>) => changeText?.(event.currentTarget.value)

  return (
    <TextFieldInput
      aria-valuemax={max}
      aria-valuemin={min}
      value={text}
      ref={mergeRefs([inputRef, ref])}
      inputMode='numeric'
      disabled={disabled ?? _disabled}
      className={csx(style.numberTextField, className)}
      onInput={mergeEventHandlers(onNumberInput, onInput)}
      {...props}
    />
  )
}