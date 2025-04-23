import { FC, PropsWithChildren, Ref } from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'

export interface AvatarProps {
  /**
   * Optional custom CSS class to apply to the avatar container.
   * Useful for extending or overriding default styles.
   */
  className?: string

  /**
   * Ref forwarded to the root `div` element of the avatar.
   * Enables access to the DOM node, e.g., for focus or measurements.
   */
  ref?: Ref<HTMLDivElement>

  /**
   * Defines the size of the avatar.
   * Affects both the container and any nested content (image, initials, etc.).
   */
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

  /**
   * Visual variant of the avatar.
   * Can be used to differentiate between roles, types, or contexts.
   *
   * - 'primary': Default visual style
   * - 'secondary': Alternate or less prominent style
   */
  variant?: 'primary' | 'secondary'
}

/** An Avatar is a UI component that displays a user's profile image, initials, or an icon, commonly used in social profiles, chat applications, and dashboards to represent a person or entity. */
export const Avatar: FC<PropsWithChildren<AvatarProps>> = ({
  className,
  size = 'md',
  variant = 'primary',
  ref,
  children,
  ...props
}) => {
  return (
    <div ref={ref} data-name='avatar' data-size={size} data-variant={variant} className={csx(style.avatar, className)} {...props}>
      {children}
    </div>
  )
}