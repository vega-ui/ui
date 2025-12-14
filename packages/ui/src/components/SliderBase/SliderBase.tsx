import {
  FC,
  HTMLAttributes,
  CSSProperties, Ref
} from 'react';

import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { SliderBaseOrientation, SliderBaseSize, SliderBaseVariant } from './types.ts';

export interface SliderBaseProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The current numeric value of the slider thumb.
   * Should be within the range defined by `min` and `max`.
   * Can be controlled externally or used in conjunction with internal state.
   */
  value?: number

  /**
   * The maximum value of the slider range.
   * Defaults to 100 if not provided.
   */
  max?: number

  /**
   * The minimum value of the slider range.
   * Defaults to 0 if not provided.
   */
  min?: number

  /**
   * The step interval between allowed values.
   * Use `'any'` to allow free movement without snapping to steps.
   */
  step?: number | 'any'

  /**
   * Optional class name for applying custom styles to the root slider container.
   */
  className?: string

  /**
   * Visual size of the slider.
   * Typically maps to height or thumb size in design tokens.
   */
  size?: SliderBaseSize

  /**
   * Optional React ref to access the root slider DOM node.
   */
  ref?: Ref<HTMLDivElement>

  /**
   * Visual styling variant.
   * Useful for differentiating appearance across themes or modes.
   */
  variant?: SliderBaseVariant

  /**
   * Whether the slider is disabled and non-interactive.
   */
  disabled?: boolean

  /**
   * Direction in which the slider operates.
   * `'horizontal'` renders the slider from left to right (default),
   * `'vertical'` renders it from bottom to top.
   */
  orientation?: SliderBaseOrientation
}

/** SliderBase is a low-level UI component that provides the core structure and logic for building custom sliders.
 *  It represents a track along which a thumb can move, allowing users to select a numeric value within a defined range.
 *  Typically used in forms, settings, and interactive controls like volume, brightness, or data range selectors.
 *  This component does not include value management or visual decoration by default, and is intended to be composed into higher-level sliders. */
export const SliderBase: FC<SliderBaseProps> = ({
  className,
  min = 0,
  max = 100,
  value,
  size = 'md',
  variant = 'primary',
  disabled = false,
  orientation = 'horizontal',
  children,
  style: cssStyle,
  ref,
  ...props
}) => {
  return (
    <div
      className={csx(style.slider, className)}
      data-disabled={disabled}
      data-size={size}
      data-variant={variant}
      data-orientation={orientation}
      ref={ref}
      style={{
        ...cssStyle,
        '--slider-base-value': value,
        '--slider-base-max': max,
        '--slider-base-min': min
      } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}