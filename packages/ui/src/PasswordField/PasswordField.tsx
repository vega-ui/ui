'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { PasswordFieldProvider } from './contexts';

export interface PasswordFieldProps extends TextFieldProps {
  /**
   * Disables the password field.
   * Prevents user input and interaction, and applies the disabled visual state.
   */
  disabled?: boolean
}

/** A PasswordField is a UI component that allows users to input passwords or secure pin codes */
export const PasswordField: FC<PasswordFieldProps> = ({
  ref,
  size,
  disabled,
  children,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [shown, setShown] = useState(false)

  const toggleShow = useCallback(() => {
    setShown(p => !p)
    inputRef.current?.focus()
    requestAnimationFrame(() => {
      inputRef.current?.setSelectionRange(-1, -1);
    })
  }, [])

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