'use client';

import { FC, PropsWithChildren, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { useAvatarGroupContext } from '../../hooks';
import { sizeMapper } from './utils';
import { Text, TextProps } from '../../../Text';
import style from './style.module.css';

export interface AvatarGroupCountProps extends TextProps {
  ref?: Ref<HTMLSpanElement>
  className?: string
  children?: string | number
}

export const AvatarGroupCount: FC<PropsWithChildren<AvatarGroupCountProps>> = ({
  className,
  children,
  ...props
}) => {
  const { size = 'md', variant } = useAvatarGroupContext()

  return (
    <Text {...props} data-variant={variant} className={csx(style.count, className)} size={sizeMapper(size)} fontWeight={500}>+{children}</Text>
  )
}