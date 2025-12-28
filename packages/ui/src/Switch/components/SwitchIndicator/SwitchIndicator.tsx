import { FC, HTMLAttributes } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type SwitchIndicatorProps = HTMLAttributes<HTMLDivElement>

/**
 * A visual indicator element for the `Switch` component that represents
 * the movable thumb inside the switch track.
 */
export const SwitchIndicator: FC<SwitchIndicatorProps> = ({ className, ...props }) => {
  return (
    <div className={csx(style.indicator, className)} {...props} />
  )
}