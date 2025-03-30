'use client';

import { Children, FC, PropsWithChildren, ReactElement, Ref } from 'react';
import { csx } from '@adara-cs/utils';
import { AvatarGroupProvider } from './providers';
import { AvatarGroupCount, AvatarGroupItemProps, AvatarGroupLimitedPopover } from './components';
import style from './style.module.css'

export interface AvatarGroupProps {
  className?: string
  ref?: Ref<HTMLDivElement>
  size?: AvatarGroupItemProps['size']
  variant?: AvatarGroupItemProps['variant']
  children?: ReactElement<AvatarGroupItemProps> | ReactElement<AvatarGroupItemProps>[]
  limit?: number
  withPopover?: boolean
  popoverSlot?: ReactElement | ReactElement[]
  hiddenCountSlot?: ReactElement | ReactElement[]
}

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