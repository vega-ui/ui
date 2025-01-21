import {
  forwardRef,
  useRef,
} from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { IconButton } from '../IconButton';
import style from './style.module.css'
import { csx, mergeRefs } from '@adara-cs/utils';
import { sizeMapper } from './utils';

export interface NumberFieldProps extends TextFieldProps {
  step?: number
  min?: number
  max?: number
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(({
  className,
  disabled,
  size = 'medium',
  min = 0,
  max,
  step,
  ...props
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const onStepUp = () => {
    inputRef.current?.stepUp(step)
  }

  const onStepDown = () => {
    inputRef.current?.stepDown(step)
  }

  return (
    <div className={style.wrapper}>
      <TextField
        ref={mergeRefs([inputRef, ref])}
        size={size}
        type='number'
        min={min}
        max={max}
        className={csx(style.numberTextField, className)}
        wrapperClassName={style.inputWrapper}
        disabled={disabled}
        {...props}
      />
      <IconButton disabled={disabled} iconSize={sizeMapper(size)} size={size}
                  className={csx(style.controlButton, style.controlButtonDown)} onClick={onStepDown}
                  variant='secondary' appearance='transparent' name='minus'/>
      <IconButton disabled={disabled} iconSize={sizeMapper(size)} size={size} onClick={onStepUp}
                  className={csx(style.controlButton, style.controlButtonUp)} variant='secondary'
                  appearance='transparent' name='plus'/>
    </div>
  )
})