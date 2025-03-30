import { FC, PropsWithChildren, Ref } from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'

export interface AvatarProps {
  className?: string
  ref?: Ref<HTMLDivElement>
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant?: 'primary' | 'secondary'
}

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