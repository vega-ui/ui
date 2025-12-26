import { FC } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { usePasswordFieldContext } from '../../contexts';
import { mergeRefs } from '@vega-ui/utils';

export type PasswordFieldInputProps = TextFieldInputProps

/**
 * `PasswordFieldInput` is the input element used within `PasswordField`.
 *
 * It switches between `type="password"` and `type="text"` based on the current
 * visibility state from `PasswordField` context and forwards refs to the
 * underlying input element.
 *
 * The component remains fully composable and does not manage state itself,
 * relying on context for visibility and disabled state.
 */
export const PasswordFieldInput: FC<PasswordFieldInputProps> = ({ ref, disabled, ...props }) => {
  const { shown, inputRef, disabled: _disabled } = usePasswordFieldContext()
  
  return (
    <TextFieldInput
      disabled={disabled ?? _disabled}
      type={shown ? 'text' : 'password'}
      ref={mergeRefs([ref, inputRef])}
      {...props}
    />
  )
}