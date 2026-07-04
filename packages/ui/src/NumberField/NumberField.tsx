'use client';

import {
  FC,
  Ref, useEffect,
  useRef,
  KeyboardEvent,
  useCallback, useState, useLayoutEffect,
} from 'react';
import { TextField, TextFieldProps } from '../TextField';
import style from './style.module.css'
import { clamp, csx, dispatchEvents, mergeRefs, setValue } from '@vega-ui/utils';
import { useEventCallback } from '@vega-ui/hooks';
import { getNumberMaskOptions, getNumberValue } from './helpers';
import { useMaskito } from '@maskito/react';
import { NumberFieldProvider } from './contexts';

export interface NumberFieldProps extends TextFieldProps {
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
   * Ref forwarded to the element.
   */
  ref?: Ref<HTMLDivElement>

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
   * Allows the field to be empty (null/undefined) instead of defaulting to 0.
   * Useful for optional numeric inputs.
   */
  allowEmpty?: boolean
  
  /**
   * Maximum number of digits allowed after the decimal point.
   *
   * This property controls numeric precision when the value is entered
   * or adjusted via increment/decrement actions.
   *
   * It is commonly used for currency values, measurements, or ratings
   * where fractional precision must be constrained.
   *
   * Example:
   * - `maximumFractionDigits={0}` → integers only
   * - `maximumFractionDigits={2}` → up to two decimal places
   */
  maximumFractionDigits?: number
  
  /**
   * Disables the entire NumberField.
   */
  disabled?: boolean
}

/** A NumberField is a UI component that allows users to input numeric values, often with support for validation, increment/decrement buttons, and a specified range */
export const NumberField: FC<NumberFieldProps> = ({
  className,
  disabled,
  size = 'md',
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  precision = 0,
  allowEmpty = true,
  changeOnWheel = true,
  maximumFractionDigits = 2,
  children,
  ref,
  ...props
}) => {
  const [isMin, setIsMin] = useState(false);
  const [isMax, setIsMax] = useState(false);
  
  const maskitoOptions = getNumberMaskOptions({
    max,
    min,
    minusSign: '-',
    precision,
    allowEmpty,
    maximumFractionDigits
  })

  const innerInputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  
  const syncBoundaries = useCallback(() => {
    const input = innerInputRef.current;
    if (!input) return;
    
    const v = input.value === '' ? NaN : getNumberValue(input.value);

    setIsMin(Number.isFinite(v) ? v <= min : false);
    setIsMax(Number.isFinite(v) ? v >= max : false);
  }, [min, max])
  
  const inputRef = useMaskito({
    options: maskitoOptions
  })
  
  useLayoutEffect(syncBoundaries, [syncBoundaries]);
  
  const onInput = useCallback(() => {
    syncBoundaries();
  }, [syncBoundaries])
  
  const changeValue = useCallback((value: number) => {
    const input = innerInputRef.current
    if (!input) return
    
    const currentValue = input.value
    if (currentValue === String(value)) return;
    
    setValue(input, String(value))
    dispatchEvents(input)
  }, [])

  const increment = useCallback(() => {
    const input = innerInputRef.current
    if (!input) return
    
    const value = input.value
    
    if (value === '' || value === undefined) {
      const v = min !== Number.MIN_SAFE_INTEGER ? min : 0
      changeValue(v)
      return
    }

    const nextValue = clamp(min, getNumberValue(value) + step, max);
    changeValue(nextValue)
  }, [max, min, step, changeValue])

  const decrement = useCallback(() => {
    const input = innerInputRef.current
    if (!input) return
    
    const value = input.value
    
    if (value === '' || value === undefined) {
      const v = min !== Number.MIN_SAFE_INTEGER ? min : 0
      changeValue(v)
      return
    }

    const nextValue = clamp(min, getNumberValue(value) - step, max);
    changeValue(nextValue)
  }, [min, max, step, changeValue])

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      increment()
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      decrement()
    }
  }
  
  const onWheel = useEventCallback((e: WheelEvent) => {
    e.preventDefault()

    if (e.deltaY < 0) increment()
    else decrement()
  })

  useEffect(() => {
    const elem = wrapperRef.current
    if (!elem || !changeOnWheel) return

    elem.addEventListener('wheel', onWheel)
    return () => elem.removeEventListener('wheel', onWheel)
  }, [onWheel, changeOnWheel]);

  return (
    <NumberFieldProvider
      size={size}
      isMax={isMax}
      isMin={isMin}
      max={max}
      min={min}
      increment={increment}
      decrement={decrement}
      disabled={disabled}
      onInput={onInput}
      inputRef={mergeRefs([inputRef, innerInputRef])}
    >
      <TextField
        ref={mergeRefs([ref, wrapperRef])}
        size={size}
        className={csx(style.numberTextField, className)}
        onKeyDown={onKeyDown}
        {...props}
      >
        {children}
      </TextField>
    </NumberFieldProvider>
  )
}