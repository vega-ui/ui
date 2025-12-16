import { FC } from 'react';
import { sizeMapper } from './helpers';
import { Icon, IconProps } from '../../../Icon';
import { useAvatarGroupContext } from '../../contexts';
import { ChevronDown } from '@vega-ui/icons';
import { usePopoverContext } from '../../../Popover';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { AvatarGroupVariant } from '../../types.ts';

export interface AvatarGroupPopoverTriggerIconProps extends IconProps {
  /**
   * Visual variant of the AvatarGroup.
   * Allows the trigger icon to adapt its style to match the AvatarGroup.
   */
  variant?: AvatarGroupVariant
}

/**
 * AvatarGroupPopoverTriggerIcon renders a state indicator icon for the
 * AvatarGroup popover trigger.
 *
 * The icon reflects the open or closed state of the associated Popover
 * and updates its appearance accordingly.
 *
 * The icon size is derived from the current AvatarGroup size to ensure
 * visual consistency across the component. By default, a ChevronDown
 * icon is displayed, but it can be overridden by providing custom
 * children.
 */
export const AvatarGroupPopoverTriggerIcon: FC<AvatarGroupPopoverTriggerIconProps> = ({ children, className, ...props }) => {
  const { size = 'md', variant = 'primary' } = useAvatarGroupContext()
  const { open } = usePopoverContext()
  
  return (
    <Icon
      className={csx(style.icon, className)}
      data-variant={variant}
      data-open={open}
      size={sizeMapper(size)}
      {...props}
    >
      {children ?? <ChevronDown/>}
    </Icon>
  )
}