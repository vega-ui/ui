import { FC } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useOutput } from '../../../internals/widget';
import { usePasswordFieldContext } from '../../contexts';
import { passwordFieldWidget } from '@vega-ui/widgets/password-field';

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
export const PasswordFieldInput: FC<PasswordFieldInputProps> = ({ disabled, ...props }) => {
  const { handle, disabled: _disabled } = usePasswordFieldContext()
  const attrs = useOutput(handle, passwordFieldWidget.output.input)
  
  return (
    <TextFieldInput
      disabled={disabled ?? _disabled}
      {...attrs}
      {...props}
    />
  )
}