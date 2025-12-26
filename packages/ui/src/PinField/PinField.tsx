import { FC, HTMLAttributes, Ref, useCallback, useRef, useState } from 'react';
import { clamp, csx } from '@vega-ui/utils';
import { useMaskito } from '@maskito/react';
import { MaskitoOptions } from '@maskito/core';
import { PinFieldProvider } from './contexts';
import { PinFieldSize } from './types.ts';
import style from './style.module.css'

export interface PinFieldProps extends HTMLAttributes<HTMLDivElement> {
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
   * Ref forwarded to the native `<input>` element.
   * Useful for focus or programmatic control.
   */
  ref?: Ref<HTMLDivElement>

  /**
   * Optional input mask that restricts characters for each digit.
   * Can be a RegExp or array of RegExp/string for per-character control.
   */
  mask?: Array<RegExp | string> | RegExp
  
  /**
   * Max pin value
   */
  maxLength: number
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
  ...props
}) => {
  const [value, setValue] = useState('');
  const [active, setActive] = useState(0)
  const [selectedAll, setSelectedAll] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const options: MaskitoOptions = {
    mask: mask ?? /^\d+$/
  }
  
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
      setValue={setValue}
      value={value}
      active={active}
      error={error}
    >
      <div className={csx(style.field, className)} ref={ref} {...props}>
        {children}
      </div>
    </PinFieldProvider>
  )
}