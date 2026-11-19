'use client';

import { FC, HTMLAttributes, Ref } from 'react';
import { AvatarStackProvider } from './contexts';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { AvatarStackSize, AvatarStackVariant } from './types';

export interface AvatarStackProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref forwarded to the root `div` element of the avatar stack.
   * Useful for direct DOM access (e.g., measuring width or attaching listeners).
   */
  ref?: Ref<HTMLDivElement>

  /**
   * Size of all avatar items within the stack.
   * Ensures consistent sizing across all items.
   */
  size?: AvatarStackSize

  /**
   * Variant for all avatars in the stack.
   * Applies a unified visual style (e.g., `primary`, `secondary`).
   */
  variant?: AvatarStackVariant
}

/** AvatarStack displays multiple avatars in a compact, overlapping arrangement, commonly used to represent a group of users, such as team members or participants in a conversation.  */
export const AvatarStack: FC<AvatarStackProps> = ({
  className,
  size = 'md',
  variant = 'primary',
  children,
  ...props
}) => {
  return (
    <AvatarStackProvider size={size} variant={variant}>
      <div className={csx(style.stack, className)} {...props}>
        {children}
      </div>
    </AvatarStackProvider>
  )
}