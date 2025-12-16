'use client';

import { FC, HTMLAttributes, PropsWithChildren, Ref } from 'react';
import { AvatarGroupProvider } from './contexts';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { AvatarGroupSize, AvatarGroupVariant } from './types.ts';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Optional custom CSS class for the avatar group container.
   * Allows styling overrides or scoped custom styles.
   */
  className?: string

  /**
   * Ref forwarded to the root `div` element of the avatar group.
   * Useful for direct DOM access (e.g., measuring width or attaching listeners).
   */
  ref?: Ref<HTMLDivElement>

  /**
   * Size of all avatar items within the group.
   * Ensures consistent sizing across all items.
   */
  size?: AvatarGroupSize

  /**
   * Variant for all avatars in the group.
   * Applies a unified visual style (e.g., `primary`, `secondary`).
   */
  variant?: AvatarGroupVariant
}

/** An Avatar Group is a UI component that displays multiple avatars in a compact, overlapping, or grid-like arrangement, commonly used to represent a group of users, such as team members or participants in a conversation.  */
export const AvatarGroup: FC<PropsWithChildren<AvatarGroupProps>> = ({
  className,
  size = 'md',
  variant = 'primary',
  children,
  ...props
}) => {
  return (
    <AvatarGroupProvider size={size} variant={variant}>
      <div className={csx(style.container, className)} {...props}>
        {children}
      </div>
    </AvatarGroupProvider>
  )
}