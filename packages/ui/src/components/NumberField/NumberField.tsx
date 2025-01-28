import {
  forwardRef,
  useRef,
} from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { IconButton } from '../IconButton';
import style from './style.module.css'
import { csx, mergeRefs } from '@adara-cs/utils';
import { sizeMapper } from './utils';
import { useMaskito } from '@maskito/react';

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
  const innerInputRef = useRef<HTMLInputElement>(null)

  const inputRef = useMaskito({
    options: {
      mask: /^\d+$/,
    }
  })

  const onStepUp = () => {
    innerInputRef.current?.stepUp(step)
  }

  const onStepDown = () => {
    innerInputRef.current?.stepDown(step)
  }

  return (
    <div className={style.wrapper}>
      <TextField
        ref={mergeRefs([inputRef, ref, innerInputRef])}
        size={size}
        type='number'
        inputMode='numeric'
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