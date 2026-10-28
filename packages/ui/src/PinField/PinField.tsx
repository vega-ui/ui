import { FC, HTMLAttributes, Ref, useCallback, useMemo, useRef, useState } from 'react';
import { clamp, csx, mergeRefs } from '@vega-ui/utils';
import { useControlledState, useFormReset } from '@vega-ui/hooks';
import { useMaskito } from '@maskito/react';
import { MaskitoOptions } from '@maskito/core';
import { PinFieldProvider } from './contexts';
import { PinFieldSize } from './types';
import style from './style.module.css'

export interface PinFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /**
   * Controlled code.
   */
  value?: string

  /**
   * Initial code for uncontrolled usage. Defaults to `''`.
   */
  defaultValue?: string

  /**
   * Called with the code when it changes.
   */
  onChangeValue?(value: string): void

  /**
   * Disables the input field, making it non-interactive.
   * Also applies a visual disabled style.
   */
  disabled?: boolean

  /**
   * Placeholder character shown when the field is empty.
   */
  placeholder?: string

  /**
   * Visual size of the pin input.
   * Affects dimensions and font size.
   */
  size?: PinFieldSize

  /**
   * Shows the field in an error state.
   */
  error?: boolean

  /**
   * Ref to the root element.
   */
  ref?: Ref<HTMLDivElement>

  /**
   * Characters the field accepts: a RegExp for the whole value, or an array
   * with a RegExp or a fixed character per position. Defaults to digits.
   */
  mask?: Array<RegExp | string> | RegExp
  
  /**
   * Number of characters in the code. Defaults to `4`.
   */
  maxLength?: number
}

/** A PinField is a UI component that allows users to input OTP/Pin codes, commonly used for forms. */
export const PinField: FC<PinFieldProps> = ({
  className,
  placeholder,
  error,
  size = 'md',
  ref,
  mask,
  children,
  disabled,
  maxLength = 4,
  value: controlledValue,
  defaultValue = '',
  onChangeValue,
  ...props
}) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useControlledState(controlledValue, defaultValue, onChangeValue)
  const [active, setActive] = useState(0)
  const [selectedAll, setSelectedAll] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const options = useMemo<MaskitoOptions>(() => ({
    mask: mask ?? /^\d+$/,
  }), [mask])
  
  const inputMaskitoRef = useMaskito({ options });
  
  const syncActive = useCallback((index?: number) => {
    const input = inputRef.current;
    if (!input || input.selectionStart === null) return;
    
    const selectionStart = index ?? input.selectionStart ?? 0;
    const clampedSelectedStart = clamp(0, selectionStart, maxLength - 1);

    input.selectionStart = clampedSelectedStart;
    input.selectionEnd = clampedSelectedStart + 1
    
    setActive(clamp(0, input.selectionStart, maxLength - 1));
  }, [maxLength])

  useFormReset(rootRef, () => {
    if (controlledValue !== undefined) return
    setValue(defaultValue)
  })

  return (
    <PinFieldProvider
      maxLength={maxLength}
      disabled={disabled}
      size={size}
      placeholder={placeholder}
      innerInputRef={inputRef}
      selectedAll={selectedAll}
      setSelectedAll={setSelectedAll}
      inputRef={inputMaskitoRef}
      syncActive={syncActive}
      setActive={setActive}
      value={value}
      setValue={setValue}
      active={active}
      error={error}
    >
      <div className={csx(style.field, className)} ref={mergeRefs([rootRef, ref])} {...props}>
        {children}
      </div>
    </PinFieldProvider>
  )
}