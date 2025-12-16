import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'
import { PopoverTrigger, PopoverTriggerProps } from '../../../Popover';

export type AvatarGroupPopoverTriggerProps = PopoverTriggerProps

/**
 * AvatarGroupPopoverTrigger is an interactive trigger element used to
 * toggle the AvatarGroup popover.
 *
 * It wraps the PopoverTrigger primitive and applies AvatarGroup-specific
 * styling, serving as the clickable control that opens or closes the
 * associated popover content.
 *
 * The component forwards all PopoverTrigger props and renders its
 * children as the trigger content (for example, an avatar stack
 * or a state icon).
 *
 * This component does not manage popover state directly and relies
 * on the Popover context for behavior.
 */
export const AvatarGroupPopoverTrigger: FC<AvatarGroupPopoverTriggerProps> = ({
  ref,
  className,
  children,
  ...props
}) => {
  return (
    <PopoverTrigger className={csx(style.trigger, className)} type='button' ref={ref} {...props}>
      {children}
    </PopoverTrigger>
  )
}