'use client';

import { FC, PropsWithChildren } from 'react';
import { Popover, PopoverProps } from '../../../Popover';

export type AvatarGroupPopoverProps = PopoverProps

/**
 * AvatarGroupPopover is a wrapper component used to display additional
 * avatars that do not fit within the visible AvatarGroup stack.
 *
 * This component does not impose any layout or presentation logic
 * itself; it simply coordinates popover behavior and renders its
 * children within the Popover context.
 *
 * Typical usage includes pairing AvatarGroupPopover with
 * AvatarGroupPopoverTrigger and AvatarGroupPopoverContent to provide
 * an accessible and discoverable way to reveal hidden avatars.
 */
export const AvatarGroupPopover: FC<PropsWithChildren<AvatarGroupPopoverProps>> = (props) => {
  return <Popover {...props} />
}