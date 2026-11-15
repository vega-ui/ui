import { FC, HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { useWidget, widgetEnvironment } from '../internals/widget';
import { PinFieldProvider } from './contexts';
import { pinFieldWidget } from '@vega-ui/widgets/pin-field';
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
  const handle = useWidget(pinFieldWidget, { maxLength, mask, disabled, value: controlledValue, defaultValue, onChangeValue }, widgetEnvironment)

  return (
    <PinFieldProvider
      handle={handle}
      maxLength={maxLength}
      disabled={disabled}
      size={size}
      placeholder={placeholder}
    >
      <div className={csx(style.field, className)} ref={ref} {...props}>
        {children}
      </div>
    </PinFieldProvider>
  )
}
