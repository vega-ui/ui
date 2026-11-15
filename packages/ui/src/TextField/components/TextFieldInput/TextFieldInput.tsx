import { FC, InputHTMLAttributes, Ref } from 'react';
import style from './style.module.css';
import { csx } from '@vega-ui/utils';
import { useTextFieldContext } from '../../contexts';

export interface TextFieldInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Ref forwarded to the underlying native `<input>` element.
   */
  ref?: Ref<HTMLInputElement>
}

/**
 * `TextFieldInput` is the native `<input>` element used inside `TextField`.
 *
 * It reads `size` from `TextFieldContext` and exposes it as `data-size` to
 * enable consistent styling across all composed TextField layouts.
 * `aria-invalid` on the input or a failed native validation the user has
 * seen (`:user-invalid`, or `[data-user-edited]:invalid` for a field that
 * writes its text itself) shows the field in an error state.
 *
 * The component is intentionally minimal: it forwards all standard input
 * attributes to the underlying element and supports an optional `ref` for
 * focus management and integration with form libraries.
 *
 * `TextFieldInput` is designed to be composed as a child of `TextField`,
 * alongside optional leading/trailing actions (icons, buttons, counters).
 */
export const TextFieldInput: FC<TextFieldInputProps> = ({ ref, className, ...props }) => {
  const { size } = useTextFieldContext()
  
  return (
    <input
      ref={ref}
      data-size={size}
      className={csx(style.input, className)}
      {...props}
    />
  )
}