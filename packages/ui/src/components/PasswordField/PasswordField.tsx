'use client';

import {
  FC, useRef, useState,
} from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { IconButton } from '../IconButton';
import { csx, mergeRefs } from '@adara-cs/utils';
import style from './style.module.css';

export type PasswordFieldProps = TextFieldProps

export const PasswordField: FC<PasswordFieldProps> = ({
  disabled,
  size = 'medium',
  ref,
  className,
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
        className={csx(style.numberTextField, className)}
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