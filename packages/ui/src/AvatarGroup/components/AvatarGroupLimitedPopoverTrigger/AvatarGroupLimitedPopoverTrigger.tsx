'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { AvatarGroupCount } from '../AvatarGroupCount';
import { Icon } from '../../../Icon';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'
import { sizeMapper } from './helpers';
import { ChevronDown } from '@vega-ui/icons';
import { AvatarSize } from '../../../Avatar';

export interface AvatarGroupLimitedPopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>
  open?: boolean
  children?: string | number
  size?: AvatarSize
}

export const AvatarGroupLimitedPopoverTrigger: FC<AvatarGroupLimitedPopoverTriggerProps> = ({
  ref,
  className,
  open,
  children,
  size = 'md',
  ...props
}) => {
  return (
    <button className={csx(style.trigger, className)} type='button' ref={ref} {...props}>
      <AvatarGroupCount>{children}</AvatarGroupCount>
      <Icon className={style.stateIcon} data-open={open} size={sizeMapper(size)}><ChevronDown /></Icon>
    </button>
  )
}