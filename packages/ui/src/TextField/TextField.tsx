import { FC, HTMLAttributes, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { TextFieldSize } from './types';
import { TextFieldProvider } from './contexts';

export interface TextFieldProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual size of the text field.
   * Affects padding, font size, and overall height.
   *
   * - 'sm': Compact input
   * - 'md': Default
   * - 'lg': Spacious layout
   */
  size?: TextFieldSize

  /**
   * Shows the input in an error state.
   */
  error?: boolean

  /**
   * Ref forwarded to wrapper element
   * Useful for programmatic control, focus, or integration.
   */
  ref?: Ref<HTMLDivElement>
}

/** A TextField is a UI component that allows users to input text, commonly used for forms, search bars, and other input tasks. It can support various types of data like single-line or multi-line input */
export const TextField: FC<TextFieldProps> = ({
  className,
  size = 'md',
  children,
  error,
  ...props
}) => {
  return (
    <TextFieldProvider error={error} size={size}>
      <div
        data-error={error}
        data-size={size}
        className={csx(style.field, className)}
        {...props}
      >
        {children}
      </div>
    </TextFieldProvider>
  )
}