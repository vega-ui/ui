import { FC, HTMLAttributes } from 'react';
import { usePinFieldContext } from '../../hooks';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export interface PinFieldSeparator extends HTMLAttributes<HTMLDivElement> {
  /**
   * Optional class name applied to the separator element.
   * Useful for styling margins, borders, or visual dividers.
   */
  className?: string

  /**
   * Controls the visual size of the separator.
   * Aligns with the size of the surrounding `PinField` elements.
   */
  size?: 'small' | 'medium' | 'large'
}


/** The PinFieldSeparator component provides a visual divider between segments of a PinField, helping group input characters (e.g., in formats like 1234 — 5678) and supporting configurable sizing for layout consistency */
export const PinFieldSeparator: FC<PinFieldSeparator> = ({
  size,
  className,
  ...props
}) => {
  const { size: _size } = usePinFieldContext()

  return (
    <div
      {...props}
      role='separator'
      data-size={size ?? _size}
      className={csx(style.separator, className)}
    />
  )
}