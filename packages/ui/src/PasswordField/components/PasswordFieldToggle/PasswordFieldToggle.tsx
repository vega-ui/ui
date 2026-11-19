import { FC } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { Button, ButtonProps, ButtonShape } from '../../../Button';
import { useTextFieldContext } from '../../../TextField/contexts';
import { useOutput } from '../../../internals/widget';
import { usePasswordFieldContext } from '../../contexts';
import { passwordFieldWidget, TOGGLE } from '@vega-ui/widgets/password-field';
import style from './style.module.css';
import { csx } from '@vega-ui/utils';

export type PasswordFieldToggleProps = ButtonProps

/**
 * `PasswordFieldToggle` is the button of a `PasswordField` that shows and hides the password. It keeps the focus and exposes the visibility with `aria-pressed`, so give it a fixed name such as "Show password". Pass `PasswordFieldShownIcon` and `PasswordFieldHiddenIcon` as its children, with `square` for an icon alone, or render your own element with `asChild`.
 */
export const PasswordFieldToggle: FC<PasswordFieldToggleProps & ButtonShape> = ({ ref, disabled, className, children, type = 'button', ...props }) => {
  const { size } = useTextFieldContext()
  const { handle, disabled: _disabled } = usePasswordFieldContext()
  const attrs = useOutput(handle, passwordFieldWidget.output.toggle)
  const mergedRef = useMergeRefs([handle.part(TOGGLE), ref])

  return (
    <Button
      ref={mergedRef}
      type={type}
      size={size}
      className={csx(style.button, className)}
      disabled={disabled ?? _disabled}
      variant='secondary'
      appearance='transparent'
      {...handle.merge(attrs, props)}
    >
      {children}
    </Button>
  )
}