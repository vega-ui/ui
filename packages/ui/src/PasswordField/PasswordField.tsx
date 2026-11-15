'use client';

import { FC } from 'react';
import { createInput } from '@vega-ui/core';
import { useSnapshot, useWidget, widgetEnvironment } from '../internals/widget';
import { TextField, TextFieldProps } from '../TextField';
import { PasswordFieldProvider } from './contexts';
import { passwordFieldWidget, TOGGLE_SHOWN } from '@vega-ui/widgets/password-field';

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
  const shown = useSnapshot(handle, (state) => state.shown)

  const toggleShow = () => void handle.send(createInput(TOGGLE_SHOWN))

  return (
    <PasswordFieldProvider
      handle={handle}
      shown={shown}
      toggleShow={toggleShow}
      disabled={disabled}
    >
      <TextField ref={ref} size={size} {...props}>
        {children}
      </TextField>
    </PasswordFieldProvider>
  )
}
