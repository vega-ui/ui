import { FC, HTMLAttributes } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type CheckboxIndicatorProps = HTMLAttributes<HTMLDivElement>

/**
 * `CheckboxIndicator` is a structural subcomponent of `Checkbox` that
 * acts as a container for visual state indicators, such as the checked
 * and indeterminate icons.
 *
 * It does not contain any logic or state by itself and serves purely
 * as a presentational wrapper. The visibility, transitions, and layout
 * of its children are controlled by surrounding Checkbox styles and
 * state propagation.
 */
export const CheckboxIndicator: FC<CheckboxIndicatorProps> = ({ className, children, ...props }) => {
  return (
    <div className={csx(style.indicator, className)} {...props}>
      {children}
    </div>
  )
}