import { FC, HTMLAttributes } from 'react';

import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { VisuallyHidden } from '../VisuallyHidden';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Optional class name applied to the outer progress wrapper.
   */
  className?: string

  /**
   * Visual size of the progress bar.
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Visual style of the progress bar.
   * Typically mapped to theme color variants.
   */
  variant?: 'primary' | 'secondary'

  /**
   * Class name for the track (the unfilled portion of the bar).
   */
  progressTrackClassName?: string

  /**
   * Optional unique ID progress bar.
   */
  progressId?: string

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

  /**
   * Whether the progress bar should stretch to fill the container width.
   */
  fullWidth?: boolean
}

/** Progress is a UI component that visually represents the completion status of a task or operation, typically as a horizontal bar that fills from 0% to 100%, indicating how much of the process is done and how much remains. */
export const Progress: FC<ProgressProps> = ({
  className,
  progressTrackClassName,
  size = 'md',
  variant = 'primary',
  id,
  progressId,
  min = 0,
  max = 100,
  value,
  valueText,
  fullWidth,
  ...props
}) => {
  return (
    <div id={progressId} data-fullwidth={fullWidth} className={csx(style.progress, className)} data-variant={variant} data-size={size} {...props}>
      <div className={csx(style.progressTrack, progressTrackClassName)} style={value != undefined ? { width: `${(value / max) * 100}%` } : undefined} />
      <VisuallyHidden asChild>
        <progress max={max} value={value} aria-valuetext={valueText} aria-valuemin={min} id={id} />
      </VisuallyHidden>
    </div>
  );
}