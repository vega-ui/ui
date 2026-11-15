import { FC, HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'
import { AvatarSize, AvatarVariant } from './types';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Ref forwarded to the root `span` element of the avatar.
   * Enables access to the DOM node, e.g., for focus or measurements.
   */
  ref?: Ref<HTMLSpanElement>

  /**
   * Defines the size of the avatar.
   * Affects both the container and any nested content (image, initials, etc.).
   */
  size?: AvatarSize

  /**
   * Visual variant of the avatar.
   * Can be used to differentiate between roles, types, or contexts.
   *
   * - 'primary': Default visual style
   * - 'secondary': Alternate or less prominent style
   */
  variant?: AvatarVariant
}

/** An Avatar is a UI component that displays a user's profile image, initials, or an icon, commonly used in social profiles, chat applications, and dashboards to represent a person or entity. */
export const Avatar: FC<AvatarProps> = ({
  className,
  size = 'md',
  variant = 'primary',
  ref,
  children,
  ...props
}) => {
  return (
    <span
      ref={ref}
      data-size={size}
      data-variant={variant}
      className={csx(style.avatar, className)}
      {...props}
    >
      {children}
    </span>
  )
}