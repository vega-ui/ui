import { FC } from 'react';
import { Icon, IconProps } from '../../../Icon';
import { MinusIcon } from '@vega-ui/icons';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export type CheckboxIndeterminateIconProps = IconProps

/**
 * `CheckboxIndeterminateIcon` is a presentational subcomponent of `Checkbox`
 * responsible for rendering the visual indicator of the indeterminate
 * (mixed) state.
 *
 * It composes the base `Icon` primitive and renders a minus symbol by
 * default, while allowing the icon content to be overridden.
 *
 * This component is purely decorative and does not manage any checkbox
 * state itself. Its visibility and transitions are controlled by the
 * surrounding Checkbox styling and state propagation.
 */
export const CheckboxIndeterminateIcon: FC<CheckboxIndeterminateIconProps> = ({ className, children, ...props }) => {
  return (
    <Icon
      aria-hidden
      className={csx(style.icon, className)}
      {...props}
    >
      {children ?? <MinusIcon strokeWidth={4}/>}
    </Icon>
  )
}