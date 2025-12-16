import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import { PopoverContent, PopoverContentProps } from '../../../Popover';
import style from './style.module.css'

export type AvatarGroupPopoverContentProps = PopoverContentProps

/**
 * AvatarGroupPopoverContent renders the content area of the AvatarGroup popover.
 *
 * It wraps the PopoverContent primitive and applies AvatarGroup-specific
 * styling, providing a container for expanded or additional avatar-related
 * information displayed when the popover is open.
 */
export const AvatarGroupPopoverContent: FC<AvatarGroupPopoverContentProps> = ({ className, ...props }) => {
  return <PopoverContent className={csx(style.content, className)} {...props} />
}