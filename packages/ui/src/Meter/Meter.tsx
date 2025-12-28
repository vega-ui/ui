import { CSSProperties, FC, HTMLAttributes } from 'react';

import { csx } from '@vega-ui/utils';
import { getMeterState } from './helpers';
import { MeterSize, MeterVariant } from './types.ts';
import styles from './style.module.css'

export interface MeterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual size of the meter component.
   * Typically maps to predefined size tokens in a design system.
   */
  size?: MeterSize

  /**
   * Visual variant of the meter (e.g., for styling themes).
   */
  variant?: MeterVariant

  /**
   * Maximum possible value of the meter.
   * Default is 100.
   */
  max?: number

  /**
   * Minimum possible value of the meter.
   * Default is 0.
   */
  min?: number

  /**
   * The current numeric value displayed by the meter.
   * Required. Clamped between `min` and `max`.
   */
  value: number

  /**
   * Visually hidden accessible label for screen readers,
   * describing the current value (e.g., "60% fuel").
   */
  valueText?: string

  /**
   * Whether the meter should expand to fill the width with its container.
   */
  fullWidth?: boolean

  /**
   * The "optimal" value for the meter.
   * Used to determine which region (low, high, optimum) is preferred.
   */
  optimum?: number

  /**
   * The lower threshold for suboptimal values.
   * If the value is below this, it may be considered "bad".
   */
  low?: number

  /**
   * The upper threshold for suboptimal values.
   * If the value is above this, it may be considered "bad" (if optimum is low).
   */
  high?: number
}

/** Meter is a UI component used to display a scalar measurement within a known range, often represents values like disk usage, temperature, or performance levels relative to a minimum and maximum threshold. */
export const Meter: FC<MeterProps> = ({
  className,
  size = 'md',
  variant = 'primary',
  min = 0,
  max = 1,
  value,
  valueText,
  fullWidth,
  optimum,
  low,
  high,
  style,
  ...props
}) => {
  const state = getMeterState({ value, optimum, low, high, min, max })
  const mergedStyle = { ...style, '--meter-value': value, '--meter-max': max } as CSSProperties

  return (
    <div
      role='meter'
      data-state={state}
      data-full-width={fullWidth}
      aria-valuetext={valueText}
      aria-valuenow={value}
      aria-valuemax={max}
      aria-valuemin={min}
      className={csx(styles.meter, className)}
      style={mergedStyle}
      data-variant={variant}
      data-size={size}
      {...props}
    />
  );
}