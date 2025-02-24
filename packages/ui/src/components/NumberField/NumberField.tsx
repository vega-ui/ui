'use client';

import {
  FC,
  Ref, useEffect,
  useRef,
  KeyboardEvent,
  FormEvent,
  MouseEvent, useCallback,
} from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { IconButton } from '../IconButton';
import style from './style.module.css'
import { csx, mergeRefs } from '@adara-cs/utils';
import { getNumberValue, sizeMapper } from './utils';
import { useMaskito } from '@maskito/react';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { useControlledState } from '@adara-cs/hooks';
import { maskitoTransform } from '@maskito/core';

export type NumberFieldChangeEvent = WheelEvent | FormEvent | MouseEvent | KeyboardEvent

export interface NumberFieldProps extends Omit<TextFieldProps, 'onChange'> {
  step?: number
  min?: number | string
  max?: number | string
  defaultValue?: number
  ref?: Ref<HTMLInputElement>
  precision?: number
  changeOnWheel?: boolean
  onChange?: (event: NumberFieldChangeEvent, value: number) => void
}

export const NumberField: FC<NumberFieldProps> = ({
  className,
  disabled,
  size = 'medium',
  min: minValue = Number.MIN_SAFE_INTEGER,
  max: maxValue = Number.MAX_SAFE_INTEGER,
  step = 1,
  precision = 0,
  ref,
  value: controlledValue,
  defaultValue = '',
  changeOnWheel = true,
  onChange,
  ...props
}) => {
  const max = getNumberValue(maxValue)
  const min = getNumberValue(minValue)

  const maskitoOptions = maskitoNumberOptionsGenerator({
    max,
    min,
    minusSign: '-',
    precision
  })

  const [value, setValue] = useControlledState<string | number | undefined>(controlledValue, defaultValue)
  const innerInputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const inputRef = useMaskito({
    options: maskitoOptions
  })

  const increment = useCallback(() => {
    if (value === '' || value === undefined) {
      const v = min !== Number.MIN_SAFE_INTEGER ? min : 0

      setValue(v)
      return v
    }

    const nextValue = getNumberValue(value) + step;
    if (max !== undefined && nextValue > max) return
    setValue(nextValue)

    return nextValue
  }, [max, min, setValue, step, value])

  const decrement = useCallback(() => {
    if (value === '' || value === undefined) {
      const v = min !== Number.MIN_SAFE_INTEGER ? min : 0

      setValue(v)
      return v
    }

    const nextValue = getNumberValue(value) - step
    if (min !== undefined && nextValue < min) return
    setValue(nextValue)

    return nextValue
  }, [min, setValue, step, value])

  const onKeyDown = (e: KeyboardEvent) => {
    let v: number | undefined

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      v = increment()
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      v = decrement()
    }

    if (v !== undefined) onChange?.(e, v)
  }

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    setValue(value)
    onChange?.(e, getNumberValue(value))
  }

  useEffect(() => {
    if (!changeOnWheel) return

    const elem = wrapperRef.current

    const cb = (e: WheelEvent) => {
      e.preventDefault()

      const value = e.deltaY < 0 ? increment() : decrement()
      if (value !== undefined) onChange?.(e, value)
    }

    elem?.addEventListener('wheel', cb)

    return () => {
      elem?.removeEventListener('wheel', cb)
    }
  }, [increment, decrement, changeOnWheel, onChange]);

  const onIncrement = (e: MouseEvent) => {
    const value = increment()
    if (value !== undefined) onChange?.(e, value)
  }

  const onDecrement = (e: MouseEvent) => {
    const value = decrement()
    if (value !== undefined) onChange?.(e, value)
  }

  return (
    <div className={style.wrapper} onKeyDown={onKeyDown} ref={wrapperRef}>
      <TextField
        ref={mergeRefs([inputRef, ref, innerInputRef])}
        size={size}
        inputMode='numeric'
        aria-valuemax={max}
        aria-valuemin={min}
        value={maskitoTransform(String(value), maskitoOptions)}
        onInput={onInput}
        className={csx(style.numberTextField, className)}
        wrapperClassName={style.inputWrapper}
        disabled={disabled}
        {...props}
      />
      <IconButton disabled={disabled} iconSize={sizeMapper(size)} size={size}
                  className={csx(style.controlButton, style.controlButtonDown)} onClick={onDecrement}
                  variant='secondary' appearance='transparent' name='minus'/>
      <IconButton disabled={disabled} iconSize={sizeMapper(size)} size={size} onClick={onIncrement}
                  className={csx(style.controlButton, style.controlButtonUp)} variant='secondary'
                  appearance='transparent' name='plus'/>
    </div>
  )
}