import { FC, PropsWithChildren } from 'react';
import { Text, TextProps } from '../../../Text';
import { csx } from '@adara-cs/utils';
import style from './style.module.css';

export type AvatarFallbackProps = Exclude<TextProps, 'size'>

/**
 * The AvatarFallback component provides a backup visual (such as initials) when an image
 * in the Avatar component fails to load or is not provided. It ensures graceful degradation
 * and consistent avatar rendering.
 * */
export const AvatarFallback: FC<PropsWithChildren<AvatarFallbackProps>> = ({ children, className, ...props }) => {
  return (
    <Text className={csx(style.fallback, className)} fontWeight={500} {...props}>{children}</Text>
  )
}