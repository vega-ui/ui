import {
  forwardRef,
  useRef,
} from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { IconButton } from '../IconButton';
import style from './style.module.css'
import { mergeRefs } from '../../utils/margeRefs';
import { csx } from '../../utils/css';
import { sizeMapper } from './utils';

export interface NumberTextFieldProps extends TextFieldProps {
  step?: number
  min?: number
  max?: number
}

export const NumberField = forwardRef<HTMLInputElement, NumberTextFieldProps>(({
  className,
  disabled,
  size = 'medium',
  startSlot,
  endSlot,
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
    <TextField
      ref={mergeRefs([inputRef, ref])}
      size={size}
      type='number'
      min={min}
      max={max}
      className={csx(style.numberTextField, className)}
      startSlotClassName={style.startSlot}
      endSlotClassName={style.endSlot}
      disabled={disabled}
      startSlot={
        <>
          <IconButton disabled={disabled} iconSize={sizeMapper(size)} size={size} className={style.controlButton} onClick={onStepDown} variant='secondary' appearance='transparent' name='minus' />
          {startSlot && <div className={style.startSlotWrapper}>{startSlot}</div>}
        </>
      }
      endSlot={
        <>
          {endSlot && <div className={style.endSlotWrapper}>{endSlot}</div>}
          <IconButton disabled={disabled} iconSize={sizeMapper(size)} size={size} onClick={onStepUp} className={style.controlButton} variant='secondary' appearance='transparent' name='plus' />
        </>
      }
      {...props}
    />
  )
})