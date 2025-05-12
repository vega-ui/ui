import { FC, HTMLAttributes } from 'react';

import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { VisuallyHidden } from '../VisuallyHidden';

export interface PartialMeterProps extends HTMLAttributes<HTMLDivElement> {
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
}

/** PartialMeter is a composite UI component used to display a meter segmented into parts, where each part represents a portion of the total. */
export const PartialMeter: FC<PartialMeterProps> = ({
  className,
  size = 'md',
  children,
  id,
  meterId,
  min = 0,
  max = 1,
  value,
  valueText,
  fullWidth,
  style: cssStyles,
  ...props
}) => {
  const meterStyle = { ...cssStyles, '--meter-value': value, '--meter-max': max };

  return (
    <div id={meterId} data-fullwidth={fullWidth} className={csx(style.meter, className)} style={meterStyle} data-size={size} {...props}>
      <VisuallyHidden asChild>
        <meter min={min} max={max} value={value} aria-valuetext={valueText} id={id} />
      </VisuallyHidden>
      {children}
    </div>
  );
}