import { FC } from 'react';
import { Icon, IconProps } from '../../../Icon';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export type CheckboxIndeterminateIconProps = IconProps

/**
 * `CheckboxIndeterminateIcon` shows its children while the `Checkbox` is indeterminate, with the transition of the checkbox. Pass the minus as its children.
 */
export const CheckboxIndeterminateIcon: FC<CheckboxIndeterminateIconProps> = ({ className, children, ...props }) => {
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