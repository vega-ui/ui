import { FC } from 'react';
import { Icon, IconProps } from '../../../Icon';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export type CheckboxCheckedIconProps = IconProps

/**
 * `CheckboxCheckedIcon` shows its children while the `Checkbox` is checked, with the transition of the checkbox. Pass the check mark as its children.
 */
export const CheckboxCheckedIcon: FC<CheckboxCheckedIconProps> = ({ className, children, ...props }) => {
  return (
    <Icon
      aria-hidden
      className={csx(style.icon, className)}
      {...props}
    >
      {children}
    </Icon>
  )
}