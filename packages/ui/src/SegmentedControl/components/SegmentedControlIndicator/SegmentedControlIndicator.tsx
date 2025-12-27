import { FC, HTMLAttributes } from 'react';
import style from './style.module.css';
import { useSegmentedControlContext } from '../../contexts';
import { csx } from '@vega-ui/utils';

export type SegmentedControlIndicatorProps = HTMLAttributes<HTMLDivElement>

/**
 * SegmentedControlIndicator
 *
 * A visual indicator that highlights the currently selected segment
 * within a `SegmentedControl`.
 *
 * The indicator is typically rendered as a movable "thumb" or background
 * element that animates between segments
 */
export const SegmentedControlIndicator: FC<SegmentedControlIndicatorProps> = ({ className, ...props }) => {
  const { size, disabled, variant } = useSegmentedControlContext()
  
  return (
    <div
      data-disabled={disabled}
      data-variant={variant}
      data-size={size}
      className={csx(style.indicator, className)}
      {...props}
    />
  )
}