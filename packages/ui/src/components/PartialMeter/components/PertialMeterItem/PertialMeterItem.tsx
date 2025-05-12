import { FC, HTMLAttributes } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export interface PartialMeterItem extends HTMLAttributes<HTMLDivElement> {
  /**
   * The numeric value this partial item visually represents.
   * For example, a segment in a stacked meter.
   */
  value?: number
}

/** A PartialMeterItem is a low-level UI component used within a segmented or stacked meter. Each item visually represents a portion of the overall meter by indicating its value relative to a total sum. Typically used in performance dashboards, quota bars, or password strength breakdowns, these segments are styled individually and positioned side by side to reflect proportional contributions. */
export const PartialMeterItem: FC<PartialMeterItem> = ({
  style: cssStyles,
  value,
  className,
  ...props
}) => {
  const partialMeterItemStyle = { ...cssStyles, '--meter-item-value': value }

  return (
    <div className={csx(style.partialMeterItem, className)} style={partialMeterItemStyle} {...props} />
  )
}