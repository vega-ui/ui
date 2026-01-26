'use client';

import { CSSProperties, FC, HTMLAttributes } from 'react';
import style from './style.module.css';
import { csx } from '@vega-ui/utils';
import { SliderBaseOrientation, SliderBaseSize, SliderBaseVariant } from '../../types';

export interface SliderBaseThumbProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The minimum allowed value for the slider.
   * Defines the start of the thumb’s valid movement range.
   */
  min?: number

  /**
   * The maximum allowed value for the slider.
   * Defines the end of the thumb’s valid movement range.
   */
  max?: number

  /**
   * The current value of the slider represented by this thumb.
   * Determines the thumb’s position along the track.
   */
  value?: number

  /**
   * Direction in which the thumb moves along the track.
   * `'horizontal'` is left-to-right; `'vertical'` is bottom-to-top.
   */
  orientation?: SliderBaseOrientation

  /**
   * Visual size of the thumb.
   * Typically maps to a token scale in the design system.
   */
  size?: SliderBaseSize

  /**
   * Visual variant for styling.
   */
  variant?: SliderBaseVariant

  /**
   * Whether the thumb is disabled and non-interactive.
   * Applies both functional and visual restrictions.
   */
  disabled?: boolean
}


/** SliderBaseThumb is a UI subcomponent that represents the draggable thumb handle of a slider.
 *  It allows users to interact with the slider by clicking and dragging to adjust the value.
 *  This component is positioned along the slider track based on the current value and responds to pointer events.
 *  It is designed to be composed within a custom slider and styled independently, supporting both horizontal and vertical orientations. */
export const SliderBaseThumb: FC<SliderBaseThumbProps> = ({ className, value, disabled, max, min, orientation = 'horizontal', variant = 'primary', size = 'md', style: cssStyle, ...props }) => {
  return (
    <div
      role='slider'
      tabIndex={0}
      data-size={size}
      data-variant={variant}
      aria-valuemin={min}
      aria-valuenow={value}
      aria-valuemax={max}
      aria-orientation={orientation}
      aria-disabled={disabled}
      data-disabled={disabled}
      data-orientation={orientation}
      className={csx(style.thumb, className)}
      style={{
        ...cssStyle,
        '--slider-base-value': value,
        '--slider-base-max': max,
        '--slider-base-min': min
      } as CSSProperties}
      {...props}
    />
  )
}