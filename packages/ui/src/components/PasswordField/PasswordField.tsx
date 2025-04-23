'use client';

import {
  FC, useRef, useState,
} from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { IconButton } from '../IconButton';
import { mergeRefs } from '@adara-cs/utils';
import style from './style.module.css';

export type PasswordFieldProps = TextFieldProps

/** A PasswordField is a UI component that allows users to input passwords or secure pin codes */
export const PasswordField: FC<PasswordFieldProps> = ({
  disabled,
  size = 'medium',
  ref,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [shown, setShown] = useState(false)

  const onToggle = () => {
    setShown(!shown)
    inputRef.current?.focus()
    requestAnimationFrame(() => {
      inputRef.current?.setSelectionRange(-1, -1);
    })
  }

  return (
    <div className={style.wrapper}>
      <TextField
        ref={mergeRefs([inputRef, ref])}
        size={size}
        wrapperClassName={style.inputWrapper}
        disabled={disabled}
        type={shown ? 'text' : 'password'}
        {...props}
      />
      <IconButton className={style.controlButton} size={size} disabled={disabled} variant='secondary' appearance='transparent'
                  name={shown ? 'eyeClose' : 'eye'} onClick={onToggle}/>
    </div>
  )
}