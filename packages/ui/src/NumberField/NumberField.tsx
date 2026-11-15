'use client';

import { FC, Ref } from 'react';
import { createInput } from '@vega-ui/core';
import { useSnapshot, useWidget, widgetEnvironment } from '../internals/widget';
import { TextField, TextFieldProps } from '../TextField';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { NumberFieldProvider } from './contexts';
import { DECREMENT, INCREMENT, isMaxOf, isMinOf, numberFieldWidget } from '@vega-ui/widgets/number-field';

export interface NumberFieldProps extends Omit<TextFieldProps, 'defaultValue'> {
  /**
   * Controlled value. `NaN` means the field is empty.
   */
  value?: number

  /**
   * Initial value for uncontrolled usage. Defaults to `NaN`, an empty field.
   */
  defaultValue?: number

  /**
   * Called with the number when it changes, `NaN` when the field is emptied.
   */
  onChangeValue?(value: number): void

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
  allowEmpty = true,
  changeOnWheel = true,
  maximumFractionDigits = 2,
  children,
  ref,
  value: controlledValue,
  defaultValue = NaN,
  onChangeValue,
  ...props
}) => {
  const handle = useWidget(numberFieldWidget, {
    min,
    max,
    step,
    maximumFractionDigits,
    allowEmpty,
    changeOnWheel,
    value: controlledValue,
    defaultValue,
    onChangeValue,
  }, widgetEnvironment)
  const isMin = useSnapshot(handle, isMinOf)
  const isMax = useSnapshot(handle, isMaxOf)

  const increment = () => handle.send(createInput(INCREMENT))
  const decrement = () => handle.send(createInput(DECREMENT))

  return (
    <NumberFieldProvider
      handle={handle}
      size={size}
      isMax={isMax}
      isMin={isMin}
      max={max}
      min={min}
      increment={increment}
      decrement={decrement}
      disabled={disabled}
    >
      <TextField
        ref={ref}
        size={size}
        className={csx(style.numberTextField, className)}
        {...props}
      >
        {children}
      </TextField>
    </NumberFieldProvider>
  )
}
