'use client';

import { FC, PropsWithChildren, ReactElement, useState } from 'react';
import { Popover } from '../../../Popover';
import { AvatarGroupLimitedPopoverTrigger } from '../AvatarGroupLimitedPopoverTrigger';
import { AvatarGroupItemProps } from '../AvatarGroupItem';
import style from './style.module.css'
import { useAvatarGroupContext } from '../../hooks';

export interface AvatarGroupLimitPopoverProps {
  children?: ReactElement<AvatarGroupItemProps> | ReactElement<AvatarGroupItemProps>[]
}

export const AvatarGroupLimitedPopover: FC<PropsWithChildren<AvatarGroupLimitPopoverProps>> = ({ children }) => {
  const { hiddenCount, size } = useAvatarGroupContext()
  const [open, setOpen] = useState(false)

  return (
    <Popover
      triggerSlot={(ref, props) => (
        <AvatarGroupLimitedPopoverTrigger size={size} open={open} ref={ref} {...props}>{hiddenCount}</AvatarGroupLimitedPopoverTrigger>
      )}
      className={style.container}
      onOpenChange={setOpen}
      open={open}
    >
      {children}
    </Popover>
  )
}