'use client';

import {
  FC, useRef, useState,
} from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { IconButton } from '../IconButton';
import { mergeRefs } from '@adara-cs/utils';

export type PasswordFieldProps = TextFieldProps

export const PasswordField: FC<PasswordFieldProps> = ({
  disabled,
  size = 'medium',
  ref,
  endSlot,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [shown, setShown] = useState(false)

  const onToggle = () => {
    setShown(!shown)
    inputRef.current?.focus()
  }

  return (
    <TextField
      ref={mergeRefs([ref, inputRef])}
      size={size}
      type={shown ? 'text' : 'password'}
      endSlot={
        <>
          {endSlot}
          <IconButton size={size} disabled={disabled} variant='secondary' appearance='transparent' name={shown ? 'eyeClose' : 'eye'} onClick={onToggle} />
        </>
      }
      disabled={disabled}
      {...props}
    />
  )
}