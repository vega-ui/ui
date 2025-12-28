import { FC, HTMLAttributes } from 'react';
import { usePinFieldContext } from '../../contexts';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { PinFieldSize } from '../../types';

export interface PinFieldSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Controls the visual size of the separator.
   * Aligns with the size of the surrounding `PinField` elements.
   */
  size?: PinFieldSize
}


/** The PinFieldSeparator component provides a visual divider between segments of a PinField, helping group input characters (e.g., in formats like 1234 — 5678) and supporting configurable sizing for layout consistency */
export const PinFieldSeparator: FC<PinFieldSeparatorProps> = ({
  size,
  className,
  ...props
}) => {
  const { size: _size } = usePinFieldContext()

  return (
    <div
      role='separator'
      data-size={size ?? _size}
      className={csx(style.separator, className)}
      {...props}
    />
  )
}