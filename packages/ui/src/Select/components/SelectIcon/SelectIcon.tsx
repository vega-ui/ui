import { FC } from 'react';
import style from './style.module.css';
import { Icon, IconProps } from '../../../Icon';
import { csx } from '@vega-ui/utils';
import { sizeMapper } from './helpers';
import { ChevronDown } from '@vega-ui/icons';
import { useSelectContext } from '../../contexts';

export type SelectIconProps = IconProps

/**
 * Icon displayed inside the Select trigger.
 *
 * Renders a dropdown indicator (chevron by default) that reflects
 * the Select state and size:
 * - Automatically adapts icon size based on Select size
 * - Exposes `data-open` attribute for styling open/closed states
 * - Allows replacing the default icon via `children`
 *
 * Typically used inside `SelectCombobox` as a visual affordance
 * that the control is expandable.
 */
export const SelectIcon: FC<SelectIconProps> = ({ children, className, ...props }) => {
  const { size, open } = useSelectContext()
  
  return (
    <Icon
      className={csx(style.icon, className)}
      data-open={open}
      size={sizeMapper(size ?? 'md')}
      {...props}
    >
      {children ?? <ChevronDown />}
    </Icon>
  )
}