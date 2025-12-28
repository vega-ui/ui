import { FC, HTMLAttributes } from 'react';
import { csx } from '@vega-ui/utils';
import styles from './style.module.css'
import { useMeterStackContext } from '../../contexts';

export interface MeterStackSegmentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The numeric value this partial item visually represents.
   * For example, a segment in a stacked meter.
   */
  value?: number
}

/** A MeterStackSegment is a low-level UI component used within a segmented or stacked meter. Each item visually represents a portion of the overall meter by indicating its value relative to a total sum. Typically used in performance dashboards, quota bars, or password strength breakdowns, these segments are styled individually and positioned side by side to reflect proportional contributions. */
export const MeterStackSegment: FC<MeterStackSegmentProps> = ({
  style,
  value,
  className,
  ...props
}) => {
  const { min, max } = useMeterStackContext()
  const mergedStyle = { ...style, '--meter-stack-segment-value': value }
  
  return (
    <div
      role='meter'
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      className={csx(styles.segment, className)}
      style={mergedStyle}
      {...props}
    />
  )
}