'use client';

import { FC } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { useWidget, widgetEnvironment } from '../internals/widget';
import { TextField, TextFieldProps } from '../TextField';
import { PasswordFieldProvider } from './contexts';
import { passwordFieldWidget } from '@vega-ui/widgets/password-field';

export interface PasswordFieldProps extends TextFieldProps {
  /**
   * Disables the password field.
   * Prevents user input and interaction and applies the disabled visual state.
   */
  disabled?: boolean

  /**
   * Controls whether the password is shown as plain text.
   * When set, the component becomes controlled.
   */
  shown?: boolean

  /**
   * Initial visibility for uncontrolled usage.
   */
  defaultShown?: boolean

  /**
   * Called when the visibility is toggled.
   */
  onChangeShown?(shown: boolean): void
}

/** A PasswordField is a UI component that allows users to input passwords or secure pin codes. */
export const PasswordField: FC<PasswordFieldProps> = ({
  ref,
  size,
  disabled,
  shown: controlledShown,
  defaultShown = false,
  onChangeShown,
  children,
  ...props
}) => {
  const handle = useWidget(passwordFieldWidget, { shown: controlledShown, defaultShown, onChangeShown }, widgetEnvironment)
  const mergedRef = useMergeRefs([handle.root, ref])

  return (
    <PasswordFieldProvider handle={handle} disabled={disabled}>
      <TextField ref={mergedRef} size={size} {...handle.listen({}, props)}>
        {children}
      </TextField>
    </PasswordFieldProvider>
  )
}
