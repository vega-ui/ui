'use client';

import { CSSProperties, FC, HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { WheelPickerProvider } from './contexts';
import style from './style.module.css';
import { WheelPickerSize } from './types';
import { useTextFieldContext } from '../TextField/contexts';

export interface WheelPickerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * How many rows of each column are visible: the selected one in the middle and the same number above and below it. Use an odd number.
   * @default 5
   */
  rows?: number

  /**
   * Height of the rows and size of the text, on the scale of the other fields.
   * Inside the popover of a field, such as a TimeField or a DateTimeField, it follows the size of the field.
   * @default the size of the field around it, otherwise 'md'
   */
  size?: WheelPickerSize

  /**
   * Ref forwarded to the root element.
   */
  ref?: Ref<HTMLDivElement>
}

/** WheelPicker lays out columns of options that turn like wheels around one selection band, for a time, a duration or a value with its unit. Name it with aria-label or aria-labelledby, and each column too */
export const WheelPicker: FC<WheelPickerProps> = ({ rows = 5, size, className, style: inline, children, ref, ...props }) => {
  const field = useTextFieldContext()

  return (
    <WheelPickerProvider rows={rows}>
      <div
        ref={ref}
        role='group'
        data-size={size ?? field.size ?? 'md'}
        className={csx(style.picker, className)}
        style={{ '--wheel-picker-rows': rows, ...inline } as CSSProperties}
        {...props}
      >
        {children}
      </div>
    </WheelPickerProvider>
  )
}
