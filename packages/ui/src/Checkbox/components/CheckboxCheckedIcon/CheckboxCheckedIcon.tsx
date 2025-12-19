import { FC } from 'react';
import { Icon, IconProps } from '../../../Icon';
import { CheckIcon } from '@vega-ui/icons';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export type CheckboxCheckedIconProps = IconProps

/**
 * `CheckboxCheckedIcon` is a presentational subcomponent of `Checkbox`
 * responsible for rendering the visual indicator of the checked state.
 *
 * It composes the base `Icon` primitive and renders a checkmark icon
 * by default, while allowing the icon content to be overridden.
 *
 * This component is purely decorative, participates in the Checkbox
 * visual system, and relies on surrounding Checkbox state and styling
 * to control its visibility and transitions.
 */
export const CheckboxCheckedIcon: FC<CheckboxCheckedIconProps> = ({ className, children, ...props }) => {
  return (
    <Icon
      aria-hidden
      className={csx(style.icon, className)}
      {...props}
    >
      {children ?? <CheckIcon strokeWidth={4} />}
    </Icon>
  )
}