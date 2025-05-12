import { CSSProperties, FC, HTMLAttributes } from 'react';

import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { VisuallyHidden } from '../VisuallyHidden';
import { getMeterState } from './utils';

export interface MeterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Optional class name applied to the outer meter wrapper.
   */
  className?: string

  /**
   * Visual size of the meter component.
   * Typically maps to predefined size tokens in a design system.
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Visual variant of the meter (e.g., for styling themes).
   */
  variant?: 'primary' | 'secondary'

  /**
   * Optional class name applied to the inner track element.
   * Used to customize the filled part of the meter.
   */
  meterTrackClassName?: string

  /**
   * Unique ID for the meter element.
   * Useful for associating with a <label>.
   */
  meterId?: string

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
  meterTrackClassName,
  size = 'md',
  variant = 'primary',
  id,
  meterId,
  min = 0,
  max = 1,
  value,
  valueText,
  fullWidth,
  optimum,
  low,
  high,
  style: cssStyles,
  ...props
}) => {
  const state = getMeterState({ value, optimum, low, high, min, max })
  const meterStyle = { ...cssStyles, '--meter-value': value, '--meter-max': max } as CSSProperties

  return (
    <div id={meterId} data-state={state} data-fullwidth={fullWidth} className={csx(style.meter, className)} style={meterStyle} data-variant={variant} data-size={size} {...props}>
      <div className={csx(style.meterTrack, meterTrackClassName)} />
      <VisuallyHidden asChild>
        <meter optimum={optimum} low={low} high={high} min={min} max={max} value={value} aria-valuetext={valueText} id={id} />
      </VisuallyHidden>
    </div>
  );
}