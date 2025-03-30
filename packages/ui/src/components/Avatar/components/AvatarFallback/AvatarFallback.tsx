import { FC, PropsWithChildren } from 'react';
import { Text, TextProps } from '../../../Text';
import { csx } from '@adara-cs/utils';
import style from './style.module.css';

export const AvatarFallback: FC<PropsWithChildren<TextProps>> = ({ children, className, ...props }) => {
  return (
    <Text className={csx(style.fallback, className)} fontWeight={500} {...props}>{children}</Text>
  )
}