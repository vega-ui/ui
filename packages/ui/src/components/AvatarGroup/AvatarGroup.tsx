'use client';

import { Children, FC, PropsWithChildren, ReactElement, Ref } from 'react';
import { csx } from '@adara-cs/utils';
import { AvatarGroupProvider } from './providers';
import { AvatarGroupCount, AvatarGroupItemProps, AvatarGroupLimitedPopover } from './components';
import style from './style.module.css'

export interface AvatarGroupProps {
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
   * Inherits the sizing from `AvatarGroupItemProps['size']`.
   * Ensures consistent sizing across all items.
   */
  size?: AvatarGroupItemProps['size']

  /**
   * Variant for all avatars in the group.
   * Applies a unified visual style (e.g., `primary`, `secondary`).
   */
  variant?: AvatarGroupItemProps['variant']

  /**
   * Avatar items to render in the group.
   * Should consist of `<AvatarGroupItem />` components only.
   * Accepts a single element or an array of elements.
   */
  children?: ReactElement<AvatarGroupItemProps> | ReactElement<AvatarGroupItemProps>[]

  /**
   * Maximum number of visible avatars before overflowing into a popover.
   * If set, excess avatars will be hidden behind a "+X" count.
   */
  limit?: number

  /**
   * Enables the display of a popover when there are hidden avatars.
   * Useful for showing all members in a tooltip or dropdown.
   */
  withPopover?: boolean

  /**
   * Custom slot to replace the default popover content.
   * Used when `withPopover` is true and a custom layout is needed.
   */
  popoverSlot?: ReactElement | ReactElement[]

  /**
   * Custom slot to replace the default "+X" hidden count indicator.
   * Useful for localization, icons, or alternate styles.
   */
  hiddenCountSlot?: ReactElement | ReactElement[]
}

/** An Avatar Group is a UI component that displays multiple avatars in a compact, overlapping, or grid-like arrangement, commonly used to represent a group of users, such as team members or participants in a conversation.  */
export const AvatarGroup: FC<PropsWithChildren<AvatarGroupProps>> = ({
  className,
  size = 'md',
  variant = 'primary',
  ref,
  children,
  limit,
  withPopover = false,
  popoverSlot,
  hiddenCountSlot,
  ...props
}) => {
  const childrenCount = Children.count(children)
  const hiddenCount = childrenCount - (limit ?? childrenCount)

  return (
    <AvatarGroupProvider hiddenCount={hiddenCount} avatarClass={style.avatar} size={size} variant={variant}>
      <div className={style.container}>
        <div ref={ref} className={csx(style.group, className)} {...props}>
          {Children.toArray(children).slice(0, limit)}
        </div>
        {hiddenCount > 0 && limit !== 0 && (
          withPopover
            ? popoverSlot ?? (
                <AvatarGroupLimitedPopover>
                  {Children.toArray(children).slice(limit, childrenCount) as ReactElement<AvatarGroupItemProps>[]}
                </AvatarGroupLimitedPopover>
              )
            : hiddenCountSlot ?? <AvatarGroupCount>{hiddenCount}</AvatarGroupCount>
        )}
      </div>
    </AvatarGroupProvider>
  )
}