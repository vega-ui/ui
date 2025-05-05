'use client';

import {
  FC,
  Ref, useEffect,
  useRef,
  KeyboardEvent,
  FormEvent,
  MouseEvent,
  FocusEvent,
  useCallback,
} from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { IconButton } from '../IconButton';
import style from './style.module.css'
import { csx, mergeRefs } from '@adara-cs/utils';
import { getNumberMaskOptions, getNumberValue, sizeMapper } from './utils';
import { useMaskito } from '@maskito/react';
import { useControlledState } from '@adara-cs/hooks';
import { maskitoTransform } from '@maskito/core';
import { MinusIcon, PlusIcon } from '@adara-cs/icons';

export type NumberFieldChangeEvent = WheelEvent | FormEvent | MouseEvent | KeyboardEvent | FocusEvent

export interface NumberFieldProps extends Omit<TextFieldProps, 'onChange'> {
  /**
   * Amount to increment or decrement the value by when using arrow keys or spinner controls.
   */
  step?: number

  /**
   * Minimum allowed value for the input.
   * Enforced both via HTML attributes and internal logic.
   */
  min?: number

  /**
   * Maximum allowed value for the input.
   */
  max?: number

  /**
   * Initial value of the input when uncontrolled.
   */
  defaultValue?: number

  /**
   * Ref forwarded to the underlying native input element.
   */
  ref?: Ref<HTMLInputElement>

  /**
   * Number of decimal places to round the input value to.
   * Useful for financial or scientific precision.
   */
  precision?: number

  /**
   * Enables changing the value with the mouse wheel when focused.
   */
  changeOnWheel?: boolean

  /**
   * Callback fired when the value changes.
   *
   * @param event - The original change event
   * @param value - The parsed numeric value
   */
  onChange?: (event: NumberFieldChangeEvent, value: number) => void

  /**
   * Allows the field to be empty (null/undefined) instead of defaulting to 0.
   * Useful for optional numeric inputs.
   */
  allowEmpty?: boolean
}

/** A NumberField is a UI component that allows users to input numeric values, often with support for validation, increment/decrement buttons, and a specified range */
export const NumberField: FC<NumberFieldProps> = ({
  className,
  disabled,
  size = 'medium',
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  precision = 0,
  ref,
  value: controlledValue,
  defaultValue = '',
  allowEmpty = true,
  changeOnWheel = true,
  onChange,
  ...props
}) => {
  const maskitoOptions = getNumberMaskOptions({
    max,
    min,
    minusSign: '-',
    precision,
    allowEmpty
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

  const valueNumber = value != undefined ? getNumberValue(value) : 0
  const inputValue = isNaN(valueNumber) ? 0 : valueNumber

  const isDecrementDisabled = inputValue <= min
  const isIncrementDisabled = inputValue >= max

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
      <IconButton disabled={disabled || isDecrementDisabled} iconSize={sizeMapper(size)} size={size}
                  className={csx(style.controlButton, style.controlButtonDown)} onClick={onDecrement}
                  variant='secondary' appearance='transparent'>
        <MinusIcon />
      </IconButton>
      <IconButton disabled={disabled || isIncrementDisabled} iconSize={sizeMapper(size)} size={size} onClick={onIncrement}
                  className={csx(style.controlButton, style.controlButtonUp)} variant='secondary'
                  appearance='transparent'>
        <PlusIcon />
      </IconButton>
    </div>
  )
}