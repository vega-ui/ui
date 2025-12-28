import { CSSProperties, FC, HTMLAttributes } from 'react';

import styles from './style.module.css'
import { csx } from '@vega-ui/utils';
import { ProgressSize, ProgressVariant } from './types';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual size of the progress bar.
   */
  size?: ProgressSize

  /**
   * Visual style of the progress bar.
   * Typically mapped to theme color variants.
   */
  variant?: ProgressVariant

  /**
   * Maximum value of the progress range.
   * Default is 100.
   */
  max?: number

  /**
   * Minimum value of the progress range.
   * Default is 0.
   */
  min?: number

  /**
   * Current value representing the progress completion.
   */
  value?: number

  /**
   * Visually hidden accessible label for screen readers,
   * describing the current value (e.g., "60% complete").
   */
  valueText?: string
  
  indeterminate?: boolean

  /**
   * Whether the progress bar should stretch to fill the container width.
   */
  fullWidth?: boolean
}

/** Progress is a UI component that visually represents the completion status of a task or operation, typically as a horizontal bar that fills from 0% to 100%, indicating how much of the process is done and how much remains. */
export const Progress: FC<ProgressProps> = ({
  className,
  size = 'md',
  variant = 'primary',
  min = 0,
  max = 100,
  value,
  valueText,
  fullWidth,
  indeterminate,
  style,
  ...props
}) => {
  const mergedStyle = {
    '--progress-value': value,
    '--progress-max': max,
    ...style,
  } as CSSProperties
  
  return (
    <div
      role='progressbar'
      data-indeterminate={indeterminate}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuetext={valueText}
      aria-valuenow={value}
      data-full-width={fullWidth}
      className={csx(styles.progress, className)}
      data-variant={variant}
      data-size={size}
      style={mergedStyle}
      {...props}
    />
  );
}