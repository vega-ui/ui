import { FC, HTMLAttributes } from 'react';

import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { MeterStackSize } from './types';
import { MeterStackProvider } from './contexts';

export interface MeterStackProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual size of the meter component.
   * Typically maps to predefined size tokens in a design system.
   */
  size?: MeterStackSize

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
   * Whether the meter should expand to fill the width with its container.
   */
  fullWidth?: boolean
}

/** MeterStack is a composite UI component used to display a meter segmented into parts, where each part represents a portion of the total. */
export const MeterStack: FC<MeterStackProps> = ({
  className,
  size = 'md',
  children,
  value,
  max = 1,
  min = 0,
  fullWidth,
  style: cssStyles,
  ...props
}) => {
  const meterStyle = { ...cssStyles, '--meter-stack-value': value, '--meter-stack-max': max };

  return (
    <MeterStackProvider min={min} max={max}>
      <div
        data-full-width={fullWidth}
        className={csx(style.meter, className)}
        style={meterStyle}
        data-size={size}
        {...props}
      >
        {children}
      </div>
    </MeterStackProvider>
  );
}