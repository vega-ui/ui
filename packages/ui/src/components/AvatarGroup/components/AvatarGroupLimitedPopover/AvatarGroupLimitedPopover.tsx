'use client';

import { FC, PropsWithChildren, ReactElement, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../../Popover';
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
      onOpenChange={setOpen}
      open={open}
    >
      <PopoverTrigger asChild>
        <AvatarGroupLimitedPopoverTrigger size={size} open={open}>{hiddenCount}</AvatarGroupLimitedPopoverTrigger>
      </PopoverTrigger>
      <PopoverContent className={style.container}>
        {children}
      </PopoverContent>
    </Popover>
  )
}