'use client';

import { FC, useRef } from 'react';
import { useControlledState } from '@vega-ui/hooks';
import { TextField, TextFieldProps } from '../TextField';
import { PasswordFieldProvider } from './contexts';

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
  const inputRef = useRef<HTMLInputElement>(null)
  const [shown, setShown] = useControlledState(controlledShown, defaultShown, onChangeShown)

  const toggleShow = () => setShown(!shown)

  return (
    <PasswordFieldProvider
      shown={shown}
      inputRef={inputRef}
      toggleShow={toggleShow}
      disabled={disabled}
    >
      <TextField ref={ref} size={size} {...props}>
        {children}
      </TextField>
    </PasswordFieldProvider>
  )
}
