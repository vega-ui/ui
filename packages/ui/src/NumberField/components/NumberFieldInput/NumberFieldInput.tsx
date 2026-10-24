import { FC } from 'react';
import style from '../../style.module.css';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { csx, mergeRefs } from '@vega-ui/utils';
import { useNumberFieldContext } from '../../contexts';

export type NumberFieldInputProps = TextFieldInputProps

/**
 * `NumberFieldInput` is the low-level input component used inside `NumberField`.
 *
 * It renders a numeric `<input>` element based on `TextFieldInput` and connects
 * it to the surrounding `NumberField` context.
 *
 * This component is intentionally **uncontrolled by default** and relies on
 * the native input behavior for value management, enabling seamless integration
 * with HTML forms and browser-level validation.
 *
 * `NumberFieldInput` is designed to be used only as a child of `NumberField`.
 */
export const NumberFieldInput: FC<NumberFieldInputProps> = ({ ref, disabled, className, ...props }) => {
  const { disabled: _disabled, max, min, inputRef } = useNumberFieldContext()
  
  return (
    <TextFieldInput
      aria-valuemax={max}
      aria-valuemin={min}
      ref={mergeRefs([inputRef, ref])}
      inputMode='numeric'
      disabled={disabled ?? _disabled}
      className={csx(style.numberTextField, className)}
      {...props}
    />
  )
}