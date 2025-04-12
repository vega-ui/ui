import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';

export interface BadgeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode | ReactNode[]
  className?: string
  variant?: 'success' | 'error' | 'warning' | 'info'
  appearance?: 'fill' | 'outline' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Badge: FC<BadgeProps> = ({
  variant = 'success',
  className,
  children,
  size = 'md',
  appearance = 'ghost',
  ref,
  ...props
}) => {
  return (
    <div ref={ref} data-size={size} data-variant={variant} data-appearance={appearance} className={csx(style.badge, className)} {...props}>
      {children}
    </div>
  )
}