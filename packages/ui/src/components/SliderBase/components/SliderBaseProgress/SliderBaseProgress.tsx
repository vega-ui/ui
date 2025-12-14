'use client';

import { CSSProperties, FC, HTMLAttributes, PropsWithChildren } from 'react';
import style from './style.module.css';
import { csx } from '@vega-ui/utils';
import { SliderBaseOrientation, SliderBaseSize } from '../../types.ts';

export interface SliderBaseProgressProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Optional class name for custom styling the progress element.
   */
  className?: string

  /**
   * Current value of the slider.
   * Used to compute the length of the progress bar in single-thumb sliders.
   * Ignored if both `from` and `to` are provided (for range sliders).
   */
  value?: number

  /**
   * Starting value of the progress range (used in range sliders).
   */
  from?: number

  /**
   * Ending value of the progress range (used in range sliders).
   */
  to?: number

  /**
   * Maximum value of the slider.
   * Required for calculating proportional width or height of the progress bar.
   */
  max?: number

  /**
   * Visual size of the progress bar.
   * Typically maps to height or thickness of the track.
   */
  size?: SliderBaseSize

  /**
   * Whether the slider is disabled.
   */
  disabled?: boolean

  /**
   * Orientation of the slider.
   * Determines whether progress grows horizontally or vertically.
   */
  orientation?: SliderBaseOrientation
}

/** SliderBaseProgress is a UI subcomponent that visually represents the filled portion of a slider track.
 *  It spans from the start of the slider to the current thumb value, providing a visual cue of progress or selection.
 *  Commonly used in both single-value and range sliders, this component supports horizontal and vertical orientations,
 *  and can be styled independently to match size, variant, and state. */
export const SliderBaseProgress: FC<PropsWithChildren<SliderBaseProgressProps>> = ({ children, style: cssStyle, max: maxValue, orientation = 'horizontal', disabled, value = 0, from = 0, to = value, className, ...props }) => {
  const min = Math.min(from, to);
  const max = Math.max(from, to);
  const diff = Math.abs(to - from);

  return (
    <div
      className={csx(style.progress, className)}
      data-orientation={orientation}
      data-disabled={disabled}
      style={{
        ...cssStyle,
        '--slider-base-value': value,
        '--slider-base-progress-from': min,
        '--slider-base-progress-to': max,
        '--slider-base-progress-diff': diff,
        '--slider-base-max': maxValue,
      } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
}